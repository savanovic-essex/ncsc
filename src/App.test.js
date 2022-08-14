import { render, screen } from '@testing-library/react';
import App from './App';

it('renders CustomNavbar', () => {
  render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<CustomNavbar />}/>
        </Routes>
      </BrowserRouter>);
  const linkElement = screen.queryByTestId('custom-navbar');
  expect(linkElement).toBeInTheDocument();
});
