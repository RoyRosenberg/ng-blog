export class PostSearchFilter {
    userId: number;
    customerId: number;
    fromDate: Date;
    toDate: Date;
    tags: number[];
}
export class PostFilter extends PostSearchFilter {
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
