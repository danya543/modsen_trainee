import { OtherWorks } from '@components/OtherWorks/OtherWorks';
import { SearchHeader } from '@components/SearchHeader/SearchHeader';
import { Topics } from '@components/Topics/Topics';

export const MainPage = () => {
  return (
    <main>
      <SearchHeader />
      <Topics />
      <OtherWorks />
    </main>
  );
};
