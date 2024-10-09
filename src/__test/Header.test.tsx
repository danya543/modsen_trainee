import '@testing-library/jest-dom';

import { Header } from '@components/Header/Header';
import { useBurgerMenu } from '@hooks/useBurgerMenu';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@components/Burger/Burger', () => ({
  Burger: ({ handleToggle }: { handleToggle: () => void }) => (
    <button onClick={handleToggle}>Mocked Burger</button>
  ),
}));
jest.mock('@components/BurgerMenu/BurgerMenu', () => ({
  BurgerMenu: ({ isOpen }: { isOpen: boolean }) => (
    <div>{isOpen ? 'Mocked BurgerMenu Open' : 'Mocked BurgerMenu Closed'}</div>
  ),
}));
jest.mock('@components/Logo/Logo', () => ({
  Logo: () => <div>Mocked Logo</div>,
}));
jest.mock('@components/Nav/Nav', () => ({
  Nav: () => <nav>Mocked Nav</nav>,
}));
jest.mock('@api/constants', () => ({
  BASE_API_URL: 'https://mocked.api.url',
  IMAGE_API_URL: 'https://mocked.image.api.url',
  ArtsPerPage: {
    Topics: 5,
    Search: 10,
    Others: 12,
  },
}));
jest.mock('@hooks/useBurgerMenu', () => ({
  useBurgerMenu: jest.fn(),
}));

describe('Header component', () => {
  const mockToggleMenu = jest.fn();
  const mockCloseMenu = jest.fn();

  beforeEach(() => {
    (useBurgerMenu as jest.Mock).mockReturnValue({
      isOpen: false,
      closeMenu: mockCloseMenu,
      toggleMenu: mockToggleMenu,
      menuIcon: 'mock-icon',
    });
  });

  it('renders the Burger, BurgerMenu, Logo, and Nav components', () => {
    render(<Header />);

    expect(screen.getByText('Mocked Burger')).toBeInTheDocument();
    expect(screen.getByText('Mocked BurgerMenu Closed')).toBeInTheDocument();
    expect(screen.getByText('Mocked Logo')).toBeInTheDocument();
    expect(screen.getByText('Mocked Nav')).toBeInTheDocument();
  });

  it('toggles the Burger menu when Burger clicked', () => {
    render(<Header />);

    const burgerButton = screen.getByText('Mocked Burger');
    fireEvent.click(burgerButton);

    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });

  it('renders BurgerMenu when isOpen true', () => {
    (useBurgerMenu as jest.Mock).mockReturnValue({
      isOpen: true,
      closeMenu: mockCloseMenu,
      toggleMenu: mockToggleMenu,
      menuIcon: 'mock-icon',
    });

    render(<Header />);

    expect(screen.getByText('Mocked BurgerMenu Open')).toBeInTheDocument();
  });
});
