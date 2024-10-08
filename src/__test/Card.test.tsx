import '@testing-library/jest-dom';

import { Card } from '@components/Card/Card';
import { Images } from '@components/constants';
import { useCard } from '@hooks/useCard';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@hooks/useCard', () => ({
  useCard: jest.fn(),
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

jest.mock('@utils/Bookmark', () => ({
  Bookmark: jest.fn(() => <div>Bookmark Component</div>),
}));

jest.mock('@components/Loader/Loader', () => ({
  Loader: jest.fn(() => <div>loading</div>),
}));

describe('Card component', () => {
  const mockData = {
    id: 1,
    title: 'Test Art',
    artist_title: 'Test Artist',
    is_public_domain: true,
    image_id: 'image_id_1',
    api_link: 'string',
    artist_id: 123,
    description: 'string',
    credit_line: 'string',
    date_start: 12,
    place_of_origin: 'string',
    dimensions: 'string',
    publication_history: 'string',
    exhibition_history: 'string',
    publishing_verification_level: 'string',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loader when isLoading is true', () => {
    (useCard as jest.Mock).mockReturnValue({
      title: mockData.title,
      isLoading: true,
      isError: false,
      handleOpen: jest.fn(),
    });

    render(<Card data={mockData} id="card-1" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error image when isError is true', () => {
    (useCard as jest.Mock).mockReturnValue({
      title: mockData.title,
      isLoading: false,
      isError: true,
      handleOpen: jest.fn(),
    });

    render(<Card data={mockData} id="card-1" />);

    expect(screen.getByRole('img')).toHaveAttribute('src', Images.NoImage);
  });

  it('renders art image and info when isLoading and isError are false', () => {
    (useCard as jest.Mock).mockReturnValue({
      title: mockData.title,
      isLoading: false,
      isError: false,
      handleOpen: jest.fn(),
    });

    render(<Card data={mockData} id="card-1" />);

    expect(screen.getByRole('img', { name: /art work/i })).toHaveAttribute(
      'src',
      `https://mocked.image.api.url/${mockData.image_id}/full/843,/0/default.jpg`,
    );

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.artist_title)).toBeInTheDocument();
    expect(screen.getByText(/public/i)).toBeInTheDocument();
  });

  it('calls handleOpen when card is clicked', () => {
    const handleOpenMock = jest.fn();
    (useCard as jest.Mock).mockReturnValue({
      title: mockData.title,
      isLoading: false,
      isError: false,
      handleOpen: handleOpenMock,
    });

    render(<Card data={mockData} id="card-1" />);

    fireEvent.click(screen.getByRole('img'));

    expect(handleOpenMock).toHaveBeenCalledTimes(1);
  });
});
