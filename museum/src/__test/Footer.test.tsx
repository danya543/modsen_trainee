import '@testing-library/jest-dom';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { Footer } from '~/components/Footer/Footer';

jest.mock('~/components/Logo/Logo', () => ({
    Logo: ({ theme }: { theme: string }) => <div>{`Logo with theme: ${theme}`}</div>,
    LogoThemes: {
        Black: 'black_logo',
        Light: 'light_logo',
    },
}));

describe('Footer Component', () => {
    it('renders the footer with the black-themed logo and Modsen logo', () => {
        render(<Footer />);

        expect(screen.getByText(/Logo with theme: black_logo/i)).toBeInTheDocument();

        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', expect.stringContaining('modsen_logo.svg'));
    });
});
