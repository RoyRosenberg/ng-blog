import { Action } from '@ngrx/store';
import { Customer } from 'src/app/models/Customer';

export enum CustomerActionTypes {
    GetCustomers = '[Customer] Get Customers',
    GetCustomersSuccess = '[Customer] Get Customers Success',
    GetCustomersFailed = '[Customer] Get Customers Failed',
    SelectCustomer = '[Customer] Select',

    UpdateCustomer = '[Customer] Update',
    UpdateCustomerSuccess = '[Customer] Update Success',
    UpdateCustomerFailed = '[Customer] Update Failed',
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

export class SelectCustomer implements Action {
    readonly type = CustomerActionTypes.SelectCustomer;
    constructor(public payload: number) { }
}

export class UpdateCustomer implements Action {
    readonly type = CustomerActionTypes.UpdateCustomer;
    constructor(public payload: Customer) { }
}

export class UpdateCustomerSuccess implements Action {
    readonly type = CustomerActionTypes.UpdateCustomerSuccess;
    constructor(public payload: Customer) { }
}

export class UpdateCustomerFailed implements Action {
    readonly type = CustomerActionTypes.UpdateCustomerFailed;
}

export type CustomersActions = LoadCustomers
    | LoadCustomersSuccess | LoadCustomersFailed
    | SelectCustomer
    | UpdateCustomer | UpdateCustomerSuccess | UpdateCustomerFailed;
