import { CustomerState } from './customer/state';
import { PostState } from './posts/state';
import { UserState } from './user/state';

export class AppState {
    posts: PostState;
    users: UserState;
    customers: CustomerState;
}
