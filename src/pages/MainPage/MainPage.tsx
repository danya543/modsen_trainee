import { postersTypes } from '@components/constants';
import { SearchHeader } from '@components/SearchHeader/SearchHeader';
import { Topics } from '@components/Topics/Topics';

export const MainPage = () => {
  return (
    <main>
      <SearchHeader />
      <Topics type={postersTypes.Topics} />
      <Topics type={postersTypes.Others} />
    </main>
  );
};
