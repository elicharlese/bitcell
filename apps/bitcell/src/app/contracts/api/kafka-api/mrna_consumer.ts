import { Kafka } from 'kafkajs';
import * as fs from 'fs';
import * as path from 'path';

const kafka = new Kafka({
    clientId: 'mrna-consumer',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'mrna-group' });

async function main() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'mrna-topic', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { operation, payload } = JSON.parse(message.value.toString());
                if (operation === 'storeMrna') {
                    await storeMrnaSequence(payload);
                } else if (operation === 'updateMrna') {
                    await updateMrnaSequence(payload);
                }
            }
        });
    } catch (err) {
        console.error('Error in consumer: ', err);
    }
}

async function storeMrnaSequence(payload: any) {
    try {
        const mrnaData = {
            id: payload.id,
            sequence: payload.sequence
        };

        // Save the mRNA data to a JSON file (or any other storage)
        const backupPath = path.join(process.cwd(), 'mrna_backup');
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath);
        }

        const backupFile = path.join(backupPath, `mrna_${payload.id}.json`);
        fs.writeFileSync(backupFile, JSON.stringify(mrnaData));
        console.log('Stored mRNA sequence:', backupFile);
    } catch (err) {
        console.error('Error in storing mRNA sequence: ', err);
    }
}

async function updateMrnaSequence(payload: any) {
    try {
        const backupPath = path.join(process.cwd(), 'mrna_backup');
        const backupFile = path.join(backupPath, `mrna_${payload.id}.json`);
        if (fs.existsSync(backupFile)) {
            const mrnaData = JSON.parse(fs.readFileSync(backupFile).toString());
            mrnaData.sequence = payload.new_sequence;
            fs.writeFileSync(backupFile, JSON.stringify(mrnaData));
            console.log('Updated mRNA sequence:', backupFile);
        } else {
            console.error(`mRNA sequence with id ${payload.id} not found`);
        }
    } catch (err) {
        console.error('Error in updating mRNA sequence: ', err);
    }
}

main().catch(err => console.error('Error in main: ', err));