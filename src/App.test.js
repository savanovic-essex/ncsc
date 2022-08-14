import { render, screen } from '@testing-library/react';
// import App from './App';
import CustomNavbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";

test('renders learn react link', () => {
  render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<CustomNavbar />}/>
        </Routes>
      </BrowserRouter>);
  const linkElement = screen.queryByTestId('custom-navbar');
  expect(linkElement).toBeInTheDocument();
});
