// LipidStoreComponent.tsx
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateChambers } from './actions/lipidStoreActions';

const GET_CHAMBERS = gql`
  query {
    getChambers {
      id
      name
      substance
      capacity
      currentLevel
    }
  }
`;

const STORE_IN_CHAMBER = gql`
  mutation storeInChamber($amount: Int!, $chamberId: ID!) {
    storeInChamber(amount: $amount, chamberId: $chamberId) {
      id
      currentLevel
    }
  }
`;

const RELEASE_FROM_CHAMBER = gql`
  mutation releaseFromChamber($amount: Int!, $chamberId: ID!) {
    releaseFromChamber(amount: $amount, chamberId: $chamberId) {
      id
      currentLevel
    }
  }
`;

const LipidStoreComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_CHAMBERS, {
    onCompleted: (data) => {
      dispatch(updateChambers(data.getChambers));
    },
  });

  const [storeInChamber] = useMutation(STORE_IN_CHAMBER, {
    refetchQueries: [{ query: GET_CHAMBERS }],
  });
  const [releaseFromChamber] = useMutation(RELEASE_FROM_CHAMBER, {
    refetchQueries: [{ query: GET_CHAMBERS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStore = () => {
    storeInChamber({ variables: { amount: 20, chamberId: '1' } });
  };

  const handleRelease = () => {
    releaseFromChamber({ variables: { amount: 20, chamberId: '2' } });
  };

  return (
    <div>
      <h2>Lipid Store</h2>
      {data.getChambers.map(chamber => (
        <div key={chamber.id}>
          <h3>{chamber.name}</h3>
          <p>Substance: {chamber.substance}</p>
          <p>Current Level: {chamber.currentLevel}</p>
        </div>
      ))}
      <button onClick={handleStore}>Store 20 units to Primary Chamber</button>
      <button onClick={handleRelease}>Release 20 units from Secondary Chamber</button>
    </div>
  );
}

export default LipidStoreComponent;