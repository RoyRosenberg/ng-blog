import { Action } from '@ngrx/store';
import { Tag } from 'src/app/shared/models/tag';


export enum TagActionTypes {
    GetTags = '[Tag] Get Tags',
    GetTagsSuccess = '[Tag] Get Tags Success',
    GetTagsFailed = '[Tag] Get Tags Failed',
}

export class LoadTags implements Action {
    readonly type = TagActionTypes.GetTags;
    constructor() { }
}

export class LoadTagsSuccess implements Action {
    readonly type = TagActionTypes.GetTagsSuccess;

    constructor(public payload: Tag[]) { }
}

export class LoadTagsFailed implements Action {
    readonly type = TagActionTypes.GetTagsFailed;
}


export type TagsActions = LoadTags
    | LoadTagsSuccess
    | LoadTagsFailed;
