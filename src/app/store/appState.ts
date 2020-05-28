import { CustomerState } from './customer/state';
import { PostState } from './posts/state';
import { ProjectState } from './project/state';
import { TagState } from './Tag/state';
import { UserState } from './user/state';

export class AppState {
    posts: PostState;
    users: UserState;
    customers: CustomerState;
    projects: ProjectState;
    tags: TagState;
}
