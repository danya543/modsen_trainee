import { UserArtResponse } from '@src/types/Arts';

import { fetchPoster } from './fetchPoster';

export async function fetchPosters(ids: string[]): Promise<UserArtResponse[]> {
  const promises = ids.map(id => fetchPoster(id));

  // Ожидаем завершения всех запросов
  const postsData = await Promise.all(promises);

  return postsData;
}
