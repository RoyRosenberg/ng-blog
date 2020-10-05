import { EntityState } from '@ngrx/entity';
import { User } from 'src/app/models/user';

export interface UserState extends EntityState<User> {
    fetching: boolean;
    selectedUser: number;
}
