import { UserArtResponse } from '@entities/Arts';

import { BASE_API_URL } from './constants';

export async function fetchPoster(
  id: string | undefined,
): Promise<UserArtResponse> {
  const response = await fetch(`${BASE_API_URL}/artworks/${id}`);

  if (response.status == 200) {
    const data = (await response.json()) as UserArtResponse;

    return data;
  }

  throw new Error(
    `Request failed: ${response.status} (${response.statusText})`,
  );
}
