export const loadImage = (src: string, setIsLoading: () => void) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(setIsLoading());
        img.onerror = (error) => reject(new Error(`${error}`));
    });

};