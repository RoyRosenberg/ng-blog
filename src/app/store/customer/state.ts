import { Customer } from 'src/app/models/customer';

export interface CustomerState {
    fetching: boolean;
    customers: Customer[];
    selectedCustomerId: number;
}
