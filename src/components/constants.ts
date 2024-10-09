import { ArtsPerPage, initialPageNum, OtherWorksPage } from '@api/constants';
import BlackLogo from '@assets/black_logo.svg';
import Book from '@assets/book.svg';
import Booked from '@assets/booked.svg';
import BookmarkIcon from '@assets/bookmark.svg';
import Open from '@assets/burger.png';
import Close from '@assets/burger_cross.png';
import Cross from '@assets/cross.png';
import Home from '@assets/home.svg';
import LoaderIcon from '@assets/loader.svg';
import LightLogo from '@assets/logo.svg';
import Modsen_logo from '@assets/modsen_logo.svg';
import Next from '@assets/next.svg';
import NoImage from '@assets/no-image.png';
import Prev from '@assets/prev.svg';
import Search from '@assets/search.svg';

export const CardSize = {
  Large: 'large',
  Small: 'small',
};

export const LogoThemes = {
  Black: 'black_logo',
  Light: 'ligt_logo',
} as const;

export const SessionStorageKey = {
  book: '@museum/booked-arts',
  listId: '@museum/list-id',
};

export const Images = {
  ModsenLogo: Modsen_logo,
  LightLogo: LightLogo,
  BlackLogo: BlackLogo,
  Book: Book,
  Booked: Booked,
  Home: Home,
  Next: Next,
  Prev: Prev,
  NoImage: NoImage,
  Search: Search,
  OpenMenu: Open,
  CloseMenu: Close,
  Cross: Cross,
  LoaderIcon: LoaderIcon,
  BookmarkIcon: BookmarkIcon,
};

export const postersTypes = {
  Topics: {
    title: 'Our special gallery',
    p: 'Topics for you',
    size: CardSize.Large,
    initialPage: initialPageNum,
    perPage: ArtsPerPage.Topics,
    isSort: true,
    isPagination: true,
  },
  Others: {
    title: 'Other works for you',
    p: 'Here some more',
    size: CardSize.Small,
    initialPage: OtherWorksPage,
    perPage: ArtsPerPage.Others,
    isSort: false,
    isPagination: false,
  },
};
