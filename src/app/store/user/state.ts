import { User } from 'src/app/models/user';

export interface UserState {
    fetching: boolean;
    users: User[];
}
