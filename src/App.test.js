import { render, screen } from '@testing-library/react';
import App from './App';

<<<<<<< Updated upstream
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
=======
it('renders CustomNavbar', () => {
  render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<CustomNavbar />}/>
        </Routes>
      </BrowserRouter>);
  const linkElement = screen.queryByTestId('custom-navbar');
>>>>>>> Stashed changes
  expect(linkElement).toBeInTheDocument();
});
