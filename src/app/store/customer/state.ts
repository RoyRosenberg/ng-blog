import { Customer } from 'src/app/shared/models/customer';

export interface CustomerState {
    fetching: boolean;
    customers: Customer[];
}
