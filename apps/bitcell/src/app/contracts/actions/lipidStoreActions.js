// actions/lipidStoreActions.js
import { gql } from 'apollo-boost';
import { client } from '../apolloClient'; // Assume you've set up Apollo Client

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

export const fetchChambers = () => async (dispatch) => {
  const response = await client.query({ query: GET_CHAMBERS });
  dispatch({ type: 'FETCH_CHAMBERS', payload: response.data.getChambers });
};

export const storeInChamber = (amount, chamberId) => async (dispatch) => {
  // GraphQL mutation logic here...
  dispatch(fetchChambers()); // Re-fetch chambers or update state directly
};

export const releaseFromChamber = (amount, chamberId) => async (dispatch) => {
  // GraphQL mutation logic here...
  dispatch(fetchChambers()); // Re-fetch chambers or update state directly
};