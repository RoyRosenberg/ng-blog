import { Action } from '@ngrx/store';
import { Tag } from 'src/app/shared/models/tag';


export enum TagActionTypes {
    GetTags = '[Tag] Get Tags',
    GetTagsSuccess = '[Tag] Get Tags Success',
    GetTagsFailed = '[Tag] Get Tags Failed',

    CreateTag = '[Tag] Create',
    CreateTagSuccess = '[Tag] Create Success',
    CreateTagFailed = '[Tag] Create Failed',
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

export class CreateTag implements Action {
    readonly type = TagActionTypes.CreateTag;
    constructor(public payload: Tag) { }
}

export class CreateTagSuccess implements Action {
    readonly type = TagActionTypes.CreateTagSuccess;
    constructor(public payload: Tag) { }
}

export class CreateTagFailed implements Action {
    readonly type = TagActionTypes.CreateTagFailed;
}


export type TagsActions = LoadTags
    | LoadTagsSuccess | LoadTagsFailed
    | CreateTag | CreateTagSuccess | CreateTagFailed ;
