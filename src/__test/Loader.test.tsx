import '@testing-library/jest-dom';

import { Loader } from '@components/Loader/Loader';
import { render, screen } from '@testing-library/react';

jest.mock('@components/constants', () => ({
  Images: {
    LoaderIcon: 'mocked_loader_icon.svg',
  },
}));

describe('Loader Component', () => {
  test('renders loader image', () => {
    render(<Loader type="large" />);

    const loaderImage = screen.getByRole('img');
    expect(loaderImage).toBeInTheDocument();
    expect(loaderImage).toHaveAttribute('src', 'mocked_loader_icon.svg');
  });
});
