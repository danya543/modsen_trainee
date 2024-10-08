import '@testing-library/jest-dom';

import { useArtPage } from '@hooks/useArtPage';
import { ArtPage } from '@pages/ArtPage/ArtPage';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('@hooks/useArtPage', () => ({
  useArtPage: jest.fn(),
}));

jest.mock('@utils/Bookmark', () => ({
  Bookmark: jest.fn(() => <div>Mock Bookmark</div>),
}));

jest.mock('@components/Loader/Loader', () => ({
  Loader: jest.fn(() => <div>Mock Loader</div>),
}));

jest.mock('@api/constants', () => ({
  BASE_API_URL: 'https://mocked.api.url',
  IMAGE_API_URL: 'https://mocked.image.api.url',
}));

jest.mock('@components/constants', () => ({
  Images: {
    NoImage: 'mocked_no_image.svg',
  },
  CardSize: {
    Small: 'small',
    Large: 'large',
  },
}));

jest.mock('@components/SkeletonLoaders/ArtPage/ArtPage', () => ({
  ArtPageSkeletonLoader: jest.fn(() => <div>Mock ArtPageSkeletonLoader</div>),
}));

describe('ArtPage component', () => {
  const mockData = {
    image_id: '12345',
    title: 'Art Title',
    artist_title: 'Artist Name',
    date_start: '2021',
    place_of_origin: 'France',
    dimensions: '20x30 cm',
    credit_line: 'Credit Line Text',
    publishing_verification_level: 'Verified',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('renders skeleton loader when there is no data', () => {
    (useArtPage as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<ArtPage />);

    expect(screen.getByText('Mock ArtPageSkeletonLoader')).toBeInTheDocument();
  });

  it('renders loader when data is loading', () => {
    (useArtPage as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: true,
      isError: false,
    });

    render(<ArtPage />);

    expect(screen.getByText('Mock Loader')).toBeInTheDocument();
  });

  it('renders error image when there is an error', () => {
    (useArtPage as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: true,
    });

    render(<ArtPage />);

    const errorImage = screen.getByRole('img');
    expect(errorImage).toHaveAttribute('src', 'mocked_no_image.svg');
  });

  it('renders art details when data is loaded', () => {
    (useArtPage as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<ArtPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Art Title',
    );
    expect(screen.getByText('Artist Name')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('20x30 cm')).toBeInTheDocument();
    expect(screen.getByText('Credit Line Text')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('renders the Bookmark component with the correct id', () => {
    (useArtPage as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<ArtPage />);

    expect(screen.getByText('Mock Bookmark')).toBeInTheDocument();
  });
});
