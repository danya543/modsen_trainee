import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { Sort } from '~/components/Sort/Sort'

describe('Sort component', () => {
    const handleToggleMock = jest.fn();

    beforeEach(() => {
        handleToggleMock.mockClear();
    });

    test('renders correctly with default props', () => {
        render(<Sort isIncrese={true} handleToggle={handleToggleMock} />);

        const buttonAtoZ = screen.getByText('A-z');
        const buttonZtoA = screen.getByText('Z-a');

        expect(buttonAtoZ).toBeInTheDocument();
        expect(buttonZtoA).toBeInTheDocument();
    });

    test('toggles sort order on button click', () => {
        render(<Sort isIncrese={false} handleToggle={handleToggleMock} />);

        const buttonAtoZ = screen.getByText('A-z');
        const buttonZtoA = screen.getByText('Z-a');

        fireEvent.click(buttonAtoZ);
        expect(handleToggleMock).toHaveBeenCalledTimes(1);

        fireEvent.click(buttonZtoA);
        expect(handleToggleMock).toHaveBeenCalledTimes(2);
    });
});
