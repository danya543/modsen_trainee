import '@testing-library/jest-dom';

import { SessionStorageKey } from '@components/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import { Bookmark } from '@utils/Bookmark';
import { SessionStorageManager } from '@utils/SessionStorageManager';

jest.mock('@utils/SessionStorageManager', () => {
  return {
    SessionStorageManager: jest.fn().mockImplementation(() => ({
      getItem: jest.fn(),
      setItem: jest.fn(),
    })),
  };
});

jest.mock('@components/constants', () => ({
  Images: {
    Book: 'mocked_book_icon.svg',
    Booked: 'mocked_booked_icon.svg',
  },
  SessionStorageKey: {
    book: '@museum/booked-arts',
  },
}));

describe('Bookmark component', () => {
  const id = 'test-id';
  const mockSetItem = jest.fn();
  const mockGetItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (SessionStorageManager as jest.Mock).mockImplementation(() => ({
      getItem: mockGetItem,
      setItem: mockSetItem,
    }));
  });

  it('renders the button with the correct initial state (not booked)', () => {
    mockGetItem.mockReturnValue([]);

    render(<Bookmark id={id} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'mocked_book_icon.svg',
    );
  });

  it('toggles bookmark state and updates session storage', () => {
    mockGetItem.mockReturnValue([id]);

    render(<Bookmark id={id} />);

    const buttonElement = screen.getByRole('button');
    const imgElement = screen.getByRole('img');

    expect(imgElement).toHaveAttribute('src', 'mocked_booked_icon.svg');

    fireEvent.click(buttonElement);
    expect(mockSetItem).toHaveBeenCalledWith(
      SessionStorageKey.book,
      expect.not.arrayContaining([id]),
    );

    expect(imgElement).toHaveAttribute('src', 'mocked_book_icon.svg');

    fireEvent.click(buttonElement);
    expect(mockSetItem).toHaveBeenCalledWith(
      SessionStorageKey.book,
      expect.arrayContaining([id]),
    );

    expect(imgElement).toHaveAttribute('src', 'mocked_booked_icon.svg');
  });

  it('removes item from session storage when bookmarked is removed', () => {
    mockGetItem.mockReturnValue([id]);
    render(<Bookmark id={id} />);

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);
    expect(mockSetItem).toHaveBeenCalledWith(
      SessionStorageKey.book,
      expect.not.arrayContaining([id]),
    );
  });

  it('adds item to session storage when bookmarked is added', () => {
    mockGetItem.mockReturnValue([]);

    render(<Bookmark id={id} />);

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockSetItem).toHaveBeenCalledWith(
      SessionStorageKey.book,
      expect.arrayContaining([id]),
    );
  });
});
