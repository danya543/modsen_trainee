import { loadImage } from '@api/fetchImage';
import { Arts } from '@src/types/Arts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { titleLength } from './constants';

export const useCard = (data: Arts) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const title =
    data.title.split(' ').length > titleLength
      ? data.title
          .split(' ')
          .slice(0, titleLength - 2)
          .join(' ') + '...'
      : data.title;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        await loadImage(data.image_id);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchImage();
  }, [data.image_id]);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (
      !target.parentNode ||
      !(target.parentNode as HTMLElement).className.includes('bookmark')
    ) {
      navigate(`/art/${data.id}`);
    }
  };

  return {
    title,
    isLoading,
    isError,
    handleOpen,
  };
};
