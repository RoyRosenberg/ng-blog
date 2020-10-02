import { ActionItem } from './action-item';
import { Project } from './project';
import { User } from './user';

export class Post {
    id: number;
    title: string;
    summary: string;
    date: Date;
    from: string;
    to: string;
    userId: number;
    projectId: number;
    offline: boolean;
    additionalHours: number;
    user: User;
    project: Project;
    actionItems: ActionItem[];
    tags: number[];
}
