
import { SearchResults } from '~/entities/Arts';

import { BASE_API_URL } from './constants';



export async function fetchSearch({ query }: { query: string; }): Promise<SearchResults> {
    const response = await fetch(
        `${BASE_API_URL}/artworks/search?q=${query}`
    );

    if (response.status == 200) {
        const data = (await response.json()) as SearchResults;

        return data;
    }

    throw new Error(
        `Request failed: ${response.status} (${response.statusText})`
    );
}
