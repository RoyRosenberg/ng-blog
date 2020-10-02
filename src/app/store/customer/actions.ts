import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/Customer';

export const LoadCustomers = createAction('[Customer] Get Customers');
export const LoadCustomersSuccess = createAction('[Customer] Get Customers Success', props<{ customers: Customer[] }>());
export const LoadCustomersFailed = createAction('[Customer] Get Customers Failed');

export const SelectCustomer = createAction('[Customer] Select', props<{ id: number }>());

export const UpdateCustomer = createAction('[Customer] Update', props<{ customer: Customer }>());
export const UpdateCustomerSuccess = createAction('[Customer] Update Success', props<{ customer: Customer }>());
export const UpdateCustomerFailed = createAction('[Customer] Update Failed');
