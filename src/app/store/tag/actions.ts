import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/models/tag';

export const LoadTags = createAction('[Tag] Get Tags');
export const LoadTagsSuccess = createAction('[Tag] Get Tags Success', props<{ tags: Tag[] }>());
export const LoadTagsFailed = createAction('[Tag] Get Tags Failed');
export const CreateOrUpdateTag = createAction('[Tag] Create Or Update', props<{ tag: Tag }>());
export const CreateOrUpdateTagSuccess = createAction('[Tag] Create Or Update Success', props<{ tag: Tag }>());
export const CreateOrUpdateTagFailed = createAction('[Tag] Create Or Update Failed');
export const SetSelectedTag = createAction('[Tag] Set Selected', props<{ tagId: number }>());
export const DeleteTag = createAction('[Tag] Delete', props<{ tagId: number }>());
export const DeleteTagSuccess = createAction('[Tag] Delete Success', props<{ tagId: number }>());
export const DeleteTagFailed = createAction('[Tag] Delete Failed');
