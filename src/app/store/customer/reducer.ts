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
        default:
            return state;
    }
}
