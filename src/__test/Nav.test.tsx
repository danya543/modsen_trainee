import '@testing-library/jest-dom';

import { Nav } from '@components/Nav/Nav';
import { fireEvent, render, screen } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('@components/constants', () => ({
  Images: {
    Home: 'mocked-home-icon.svg',
    BookmarkIcon: 'mocked-bookmark-icon.svg',
  },
}));

describe('Nav component', () => {
  const mockNavigate = jest.fn();
  const mockUseLocation = (pathname: string) => ({
    pathname,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockUseLocation('/'));
  });

  it('renders navigation items correctly', () => {
    render(<Nav />);

    const homeNavItem = screen.getByText('Home');
    expect(homeNavItem).toBeInTheDocument();
    expect(screen.getByAltText('Home icon')).toHaveAttribute(
      'src',
      'mocked-home-icon.svg',
    );

    const favoritesNavItem = screen.getByText('Your favorites');
    expect(favoritesNavItem).toBeInTheDocument();
    expect(screen.getByAltText('Favorites icon')).toHaveAttribute(
      'src',
      'mocked-bookmark-icon.svg',
    );
  });

  it('calls navigate with the correct path when navigation items are clicked', () => {
    render(<Nav />);

    fireEvent.click(screen.getByText('Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(screen.getByText('Your favorites'));
    expect(mockNavigate).toHaveBeenCalledWith('/favorites');
  });
});
