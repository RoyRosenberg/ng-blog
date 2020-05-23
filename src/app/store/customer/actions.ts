import { Action } from '@ngrx/store';
import { Customer } from 'src/app/shared/models/Customer';

export enum CustomerActionTypes {
    GetCustomers = '[Customer] Get Customers',
    GetCustomersSuccess = '[Customer] Get Customers Success',
    GetCustomersFailed = '[Customer] Get Customers Failed',
}

export class LoadCustomers implements Action {
    readonly type = CustomerActionTypes.GetCustomers;
}

export class LoadCustomersSuccess implements Action {
    readonly type = CustomerActionTypes.GetCustomersSuccess;

    constructor(public payload: Customer[]) { }
}

export class LoadCustomersFailed implements Action {
    readonly type = CustomerActionTypes.GetCustomersFailed;
}


export type CustomersActions = LoadCustomers
    | LoadCustomersSuccess
    | LoadCustomersFailed;
