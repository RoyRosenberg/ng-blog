export class PostFilter {
    userName: string;
    customer: string;
    fromDate: Date;
    toDate: Date;
    tags: number[];
    postsPerPage: number;
    pageIndexToFetch: number;
}

export class PagingResponse<T> {
    items: T[];
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    totalItemCount: number;
}

export class PagingInfo {
    itemsPerPage: number;
    currentPage: number;
}
