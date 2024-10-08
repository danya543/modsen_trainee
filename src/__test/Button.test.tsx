import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@utils/Button';

describe('Button component', () => {
  const onClickMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with text', () => {
    render(<Button text="Click Me" onClick={onClickMock} />);

    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeVisible();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  it('renders with an icon', () => {
    render(<Button icon="icon-url.png" onClick={onClickMock} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', 'icon-url.png');
  });

  it('calls onClick function when clicked', () => {
    render(<Button text="Click Me" onClick={onClickMock} />);

    const buttonElement = screen.getByText(`Click Me`);
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when no props are passed', () => {
    const { container } = render(<Button onClick={onClickMock} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with both text and an icon', () => {
    render(
      <Button text="Click Me" icon="icon-url.png" onClick={onClickMock} />,
    );

    const imgElement = screen.getByRole('img');
    const buttonElement = imgElement.parentElement;

    expect(buttonElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'icon-url.png');
  });
});
