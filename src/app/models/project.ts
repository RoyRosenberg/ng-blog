import { Customer } from './customer';

export class Project {
    id: number;
    name: string;
    description: string;
    date: Date;
    state: ProjectStatus;
    customerId: number;
    customer: Customer;
}

export enum ProjectStatus {
    New,
    Active,
    Closed
}
