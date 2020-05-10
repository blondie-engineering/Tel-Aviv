import {GET_ETH_TRANSATIONS, GET_QLDB_TRANSACTIONS} from '../actions/statsActions';

const statsReducer = (state = {ethTransactions: 0, qldbTransactions: 0}, action) => {
    switch (action.type) {
        case GET_ETH_TRANSATIONS:
            return {...state, ethTransactions: action.transactions};
        case GET_QLDB_TRANSACTIONS:
            return {...state, qldbTransactions: action.transactions};
        default:
            return {...state};
    }
};

export default statsReducer;
