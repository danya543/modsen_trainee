import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { Logo, LogoThemes } from '~/components/Logo/Logo';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Logo component', () => {
    it('renders the default logo when theme is not specified', () => {
        render(<Logo theme={LogoThemes.Light} />);

        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', expect.stringContaining('logo'));
    });

    it('renders the black logo when theme is "black"', () => {
        render(<Logo theme={LogoThemes.Black} />);

        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', expect.stringContaining('black_logo'));
    });

    it('navigates to home when logo is clicked', () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockImplementation(() => navigate);

        render(<Logo theme={LogoThemes.Light} />);

        fireEvent.click(screen.getByRole('img'));
        expect(navigate).toHaveBeenCalledWith('/');
    });
});
