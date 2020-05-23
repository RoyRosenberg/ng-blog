import { User } from 'src/app/shared/models/user';

export interface UserState {
    fetching: boolean;
    users: User[];
}
