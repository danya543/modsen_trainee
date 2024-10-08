import { loadImage } from '@api/fetchImage';
import { fetchPoster } from '@api/fetchPoster';
import { Arts } from '@src/types/Arts';
import { useEffect, useState } from 'react';

export const useArtPage = (id: string | undefined) => {
  const [data, setData] = useState<Arts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetchPoster(id);
        const posterData = response.data;
        setData(posterData);

        if (posterData?.image_id) {
          await loadImage(posterData.image_id);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, isLoading, isError };
};
