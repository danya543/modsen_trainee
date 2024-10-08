import '@testing-library/jest-dom';

import { Autocomplete } from '@components/Autocomplete/Autocomplete';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockData = [
  { id: 1, title: 'Art 1', thumbnail: { alt_text: 'string1' } },
  { id: 2, title: 'Art 2', thumbnail: { alt_text: 'string2' } },
];

describe('Autocomplete component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    render(<Autocomplete data={[]} isOpen={true} isLoading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders list of items when data is available', () => {
    render(<Autocomplete data={mockData} isOpen={true} isLoading={false} />);

    expect(screen.getByText('Art 1')).toBeInTheDocument();
    expect(screen.getByText('Art 2')).toBeInTheDocument();
  });

  it('renders "Nothing found" when there are no results', () => {
    render(<Autocomplete data={[]} isOpen={true} isLoading={false} />);

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('calls navigate with correct ID when an item is clicked', () => {
    render(<Autocomplete data={mockData} isOpen={true} isLoading={false} />);

    fireEvent.click(screen.getByText('Art 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/art/1');

    fireEvent.click(screen.getByText('Art 2'));
    expect(mockNavigate).toHaveBeenCalledWith('/art/2');
  });
});
