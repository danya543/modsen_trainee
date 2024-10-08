import '@testing-library/jest-dom';

import { LogoThemes } from '@components/constants';
import { Footer } from '@components/Footer/Footer';
import { Logo } from '@components/Logo/Logo';
import { render, screen } from '@testing-library/react';

jest.mock('@components/Logo/Logo', () => ({
  Logo: jest.fn(() => <div>Mocked Logo</div>),
}));

jest.mock('@components/constants', () => ({
  Images: {
    ModsenLogo: 'mocked-modsen-logo.svg',
  },
  LogoThemes: {
    Black: 'black',
  },
}));

describe('Footer component', () => {
  it('renders the footer with Modsen logo', () => {
    render(<Footer />);

    expect(Logo).toHaveBeenCalledWith(
      { theme: LogoThemes.Black },
      expect.anything(),
    );
    expect(screen.getByText('Mocked Logo')).toBeInTheDocument();

    const modsenLogo = screen.getByAltText('Modsen logo');
    expect(modsenLogo).toBeInTheDocument();
    expect(modsenLogo).toHaveAttribute('src', 'mocked-modsen-logo.svg');
  });

  it('renders the footer element', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });
});
