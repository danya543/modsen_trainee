export interface Arts {
    api_link: string;
    artist_id: number;
    artist_title: string;
    description: string;
    id: number;
    image_id: string;
    credit_line: string;
    is_public_domain: boolean;
    title: string;
    date_start: number;
    place_of_origin: string;
    dimensions: string;
    publication_history: string;
    exhibition_history: string;
    publishing_verification_level: string;
}
export interface Pagination {
    current_page: number;
    limit: number;
    offset: number;
    total: number;
    total_pages: number;
}

export interface UserArtsResponse {
    pagination: Pagination;
    data: Arts[];
}
export interface UserArtResponse {
    data: Arts;
}
