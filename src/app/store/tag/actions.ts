import { Action } from '@ngrx/store';
import { Tag } from 'src/app/models/tag';


export enum TagActionTypes {
    GetTags = '[Tag] Get Tags',
    GetTagsSuccess = '[Tag] Get Tags Success',
    GetTagsFailed = '[Tag] Get Tags Failed',

    CreateTag = '[Tag] Create',
    CreateTagSuccess = '[Tag] Create Success',
    CreateTagFailed = '[Tag] Create Failed',

    UpdateTag = '[Tag] Update',
    UpdateTagSuccess = '[Tag] Update Success',
    UpdateTagFailed = '[Tag] Update Failed',

    InitSelectedTag = '[Tag] Init Selected',
    SetSelectedTag = '[Tag] Set Selected',
    SetSelectedTagSuccess = '[Tag] Set Selected Success',
    SetSelectedTagFailed = '[Tag] Set Selected Failed',

    DeleteTag = '[Tag] Delete',
    DeleteTagSuccess = '[Tag] Delete Success',
    DeleteTagFailed = '[Tag] Delete Failed',
    DeleteTagCancelled = '[Tag] Delete Cancelled',
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

export class UpdateTag implements Action {
    readonly type = TagActionTypes.UpdateTag;
    constructor(public payload: Tag) { }
}

export class UpdateTagSuccess implements Action {
    readonly type = TagActionTypes.UpdateTagSuccess;
}

export class UpdateTagFailed implements Action {
    readonly type = TagActionTypes.UpdateTagFailed;
}

export class InitSelectedTag implements Action {
    readonly type = TagActionTypes.InitSelectedTag;
}

export class SetSelectedTag implements Action {
    readonly type = TagActionTypes.SetSelectedTag;
    constructor(public payload: number) { }
}

export class SetSelectedTagSuccess implements Action {
    readonly type = TagActionTypes.SetSelectedTagSuccess;
    constructor(public payload: Tag) { }
}

export class SetSelectedTagFailed implements Action {
    readonly type = TagActionTypes.SetSelectedTagFailed;
}

export class DeleteTag implements Action {
    readonly type = TagActionTypes.DeleteTag;
    constructor(public payload: number) { }
}

export class DeleteTagSuccess implements Action {
    readonly type = TagActionTypes.DeleteTagSuccess;
    constructor(public payload: number) { }
}

export class DeleteTagFailed implements Action {
    readonly type = TagActionTypes.DeleteTagFailed;
}

export class DeleteTagCancelled implements Action {
    readonly type = TagActionTypes.DeleteTagCancelled;
}


export type TagsActions = LoadTags
    | LoadTagsSuccess | LoadTagsFailed
    | CreateTag | CreateTagSuccess | CreateTagFailed
    | UpdateTag | UpdateTagSuccess | UpdateTagFailed
    | InitSelectedTag | SetSelectedTag | SetSelectedTagSuccess | SetSelectedTagFailed
    | DeleteTag | DeleteTagSuccess | DeleteTagFailed | DeleteTagCancelled;
