import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/models/tag';


export const LoadTags = createAction('[Tag] Get Tags');
export const LoadTagsSuccess = createAction('[Tag] Get Tags Success', props<{ tags: Tag[] }>());
export const LoadTagsFailed = createAction('[Tag] Get Tags Failed');
export const CreateTag = createAction('[Tag] Create', props<{ tag: Tag }>());
export const CreateTagSuccess = createAction('[Tag] Create Success', props<{ tag: Tag }>());
export const CreateTagFailed = createAction('[Tag] Create Failed');
export const UpdateTag = createAction('[Tag] Update', props<{ tag: Tag }>());
export const UpdateTagSuccess = createAction('[Tag] Update Success');
export const UpdateTagFailed = createAction('[Tag] Update Failed');
export const InitSelectedTag = createAction('[Tag] Init Selected');
export const SetSelectedTag = createAction('[Tag] Set Selected', props<{ tagId: number }>());
export const SetSelectedTagSuccess = createAction('[Tag] Set Selected Success', props<{ tag: Tag }>());
export const SetSelectedTagFailed = createAction('[Tag] Set Selected Failed');
export const DeleteTag = createAction('[Tag] Delete', props<{ tagId: number }>());
export const DeleteTagSuccess = createAction('[Tag] Delete Success', props<{ tagId: number }>());
export const DeleteTagFailed = createAction('[Tag] Delete Failed');
export const DeleteTagCancelled = createAction('[Tag] Delete Cancelled');
