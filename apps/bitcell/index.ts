import { Kafka } from 'kafkajs';
import { Gateway, Wallets } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

const kafka = new Kafka({
    clientId: 'bitcell-consumer',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'bitcell-group' });

async function main() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'bitcell-topic', fromBeginning: true });
        await consumer.subscribe({ topic: 'nucleus-ledger-backup', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { operation, payload } = JSON.parse(message.value.toString());
                if (operation === 'storeData') {
                    await storeDataToBitCell(payload);
                } else if (topic === 'nucleus-ledger-backup') {
                    await backupLedgerData(message.value.toString());
                }
            }
        });
    } catch (err) {
        console.error('Error in consumer: ', err);
    }
}

async function storeDataToBitCell(payload: any) {
    try {
        const ccpPath = path.resolve(__dirname, 'connection-profile.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('BitCell');

        await contract.submitTransaction('add_data_node', payload.node_id, payload.name, payload.data);
        await contract.submitTransaction('store_to_vacuole', payload.unit_id, payload.amount);
        await contract.submitTransaction('store_substance_to_chamber', payload.chamber_id, payload.sub_amount);

        console.log('Data stored successfully to BitCell');
        await gateway.disconnect();
    } catch (err) {
        console.error('Error in storing data to BitCell: ', err);
    }
}

async function backupLedgerData(ledgerData: string) {
    try {
        const backupPath = path.join(process.cwd(), 'ledger_backup');
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath);
        }

        const backupFile = path.join(backupPath, `backup_${Date.now()}.json`);
        fs.writeFileSync(backupFile, ledgerData);
        console.log('Ledger data backed up successfully:', backupFile);
    } catch (err) {
        console.error('Error in backing up ledger data: ', err);
    }
}

main().catch(err => console.error('Error in main: ', err));