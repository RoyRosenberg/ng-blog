import { EntityState } from '@ngrx/entity';
import { Customer } from 'src/app/models/customer';

export interface CustomerState extends EntityState<Customer> {
    fetching: boolean;
    selectedCustomerId: number;
}
