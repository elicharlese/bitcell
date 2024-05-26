// reducers/lipidStoreReducer.js
const initialState = {
  chambers: [],
};

const lipidStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CHAMBERS':
      return { ...state, chambers: action.payload };
    default:
      return state;
  }
};

export default lipidStoreReducer;