import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectStatus } from 'src/app/models/project';
import * as projectStore from 'src/app/store/project';
import * as userStore from 'src/app/store/user';

import { PostState } from './state';

const getPostsFeatureState = createFeatureSelector<PostState>('posts');

export const getPostCount = createSelector(
    getPostsFeatureState,
    state => state.totalPostCount
);

export const getPostPageCount = createSelector(
    getPostsFeatureState,
    state => state.totalPages
);

export const getPostsPerPageCount = createSelector(
    getPostsFeatureState,
    state => state.postsPerPage
);

export const getFilter = createSelector(
    getPostsFeatureState,
    state => state.filter
);

export const getPosts = createSelector(
    getPostsFeatureState,
    userStore.UserSelectors.getUsers,
    projectStore.ProjectSelectors.getProjects,
    (state, users, projects) => {
        return state.posts.map(p => {
            const post = { ...p };
            // update users
            const filteredUsers = users.find(u => u.id === p.userId);
            if (filteredUsers) {
                post.user = filteredUsers;
            } else {
                post.user = { id: 0, userName: 'loading...', color: '', email: '' };
            }

            // update project
            const proj = projects.find(pr => pr.id === post.projectId);
            if (proj) {
                post.project = proj;
            } else {
                post.project = {
                    id: 0, name: '', description: '',
                    date: new Date(), state: ProjectStatus.New, customerId: 0,
                    customer: { id: 0, company: 'loading', contact: 'loading', phone: '', address: '', color: '' }
                };
            }

            return post;
        });
    }
);
export const getFetchingInProgress = createSelector(
    getPostsFeatureState,
    state => state.fetching
);
