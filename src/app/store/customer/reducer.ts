import { CustomerActionTypes, CustomersActions } from './actions';
import { CustomerState } from './state';

export const initState: CustomerState = {
    fetching: false,
    customers: [],
    selectedCustomerId: 0
};

export function customerReducer(state: CustomerState = initState, action: CustomersActions): CustomerState {
    switch (action.type) {
        case CustomerActionTypes.GetCustomers:
        case CustomerActionTypes.UpdateCustomer:
            return {
                ...state,
                fetching: true
            };
        case CustomerActionTypes.GetCustomersSuccess:
            return {
                ...state,
                customers: action.payload,
                fetching: false
            };
        case CustomerActionTypes.GetCustomersFailed:
            return {
                ...state,
                fetching: false
            };
        case CustomerActionTypes.SelectCustomer:
            return {
                ...state,
                fetching: false,
                selectedCustomerId: action.payload
            };
        case CustomerActionTypes.UpdateCustomerFailed:
            return {
                ...state,
                fetching: false
            };
        case CustomerActionTypes.UpdateCustomerSuccess:
            const custList = [...state.customers];
            const filtered = custList.filter(t => t.id === action.payload.id);
            const index = custList.indexOf(filtered[0]);
            custList[index] = action.payload;
            return {
                ...state,
                fetching: false,
                customers: custList
            };
        default:
            return state;
    }
}
