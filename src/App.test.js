import { render, screen } from '@testing-library/react';
// import App from './App';
import CustomNavbar from './components/Navbar';

test('renders learn react link', () => {
  render(<CustomNavbar />);
  const linkElement = screen.queryByTestId('test');
  expect(linkElement).toBeInTheDocument();
});
