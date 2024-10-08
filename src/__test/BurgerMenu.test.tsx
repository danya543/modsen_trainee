import '@testing-library/jest-dom';

import { BurgerMenu } from '@components/BurgerMenu/BurgerMenu';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@components/Nav/Nav', () => ({
  Nav: jest.fn(() => <div>Mocked Nav</div>),
}));

jest.mock('@hooks/useClickOutside', () => ({
  useClickOutside: jest.fn(),
}));

describe('BurgerMenu component', () => {
  const handleCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the menu when isOpen is true', () => {
    render(<BurgerMenu isOpen={true} handleClose={handleCloseMock} />);

    expect(screen.getByText('Mocked Nav')).toBeVisible();
  });

  it('checks if element is out of viewport', () => {
    render(<BurgerMenu isOpen={true} handleClose={handleCloseMock} />);

    const menu = screen.getByText('Mocked Nav');

    jest.spyOn(menu, 'getBoundingClientRect').mockReturnValueOnce({
      top: 10000,
      bottom: 10000,
      left: 10000,
      right: 10000,
      height: 100,
      width: 100,
      x: 0,
      y: 0,
      toJSON: function () {
        throw new Error('Function not implemented.');
      },
    });

    const isOutOfView = menu.getBoundingClientRect().top > window.innerHeight;
    expect(isOutOfView).toBe(true);
  });

  it('call handleClose when clicking inside the menu', () => {
    render(<BurgerMenu isOpen={true} handleClose={handleCloseMock} />);

    fireEvent.click(screen.getByText('Mocked Nav'));
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});
