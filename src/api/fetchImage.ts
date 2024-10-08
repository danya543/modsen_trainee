import { IMAGE_API_URL } from './constants';

export const loadImage = (image_id: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `${IMAGE_API_URL}/${image_id}/full/843,/0/default.jpg`;
    img.onload = () => resolve(() => {});
    img.onerror = () => reject();
  });
};
