import { UserArtsResponse } from '~/entities/Arts';

import { BASE_API_URL } from './constants';



export async function fetchArts(limit: number, page: number): Promise<UserArtsResponse> {

    const response = await fetch(`${BASE_API_URL}/artworks?page=${page}&limit=${limit}`);

    if (response.status == 200) {
        const data = (await response.json()) as UserArtsResponse;

        return data;
    }

    throw new Error(
        `Request failed: ${response.status} (${response.statusText})`
    );
}
