export class Project {
    id: number;
    name: string;
    description: string;
    date: Date;
    state: ProjectStatus;
}

export enum ProjectStatus {
    New,
    Active,
    Closed
}
