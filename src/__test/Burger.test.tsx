import '@testing-library/jest-dom';

import { Burger } from '@components/Burger/Burger';
import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

describe('Burger component', () => {
  const handleToggleMock = jest.fn();
  const testIcon = 'test-icon.png';

  beforeEach(() => {
    handleToggleMock.mockClear();
  });

  test('renders correctly with icon', () => {
    render(<Burger icon={testIcon} handleToggle={handleToggleMock} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', testIcon);
  });

  test('calls handleToggle on click', () => {
    render(<Burger icon={testIcon} handleToggle={handleToggleMock} />);

    const container = screen.getByRole('img').parentElement;
    fireEvent.click(container as Element);

    expect(handleToggleMock).toHaveBeenCalledTimes(1);
  });
});
