import {render, screen} from '@testing-library/react';
import CustomNavbar from '../components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../views/Dashboard";
import * as React from "react";

test('renders custom navbar in app', () => {
  render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<CustomNavbar />}/>
        </Routes>
      </BrowserRouter>);
  const navbar = screen.queryByTestId('custom-navbar');
  expect(navbar).toBeInTheDocument();
});

test('rendering private view while not logged in', () => {
    render(
        <BrowserRouter>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute isLoggedIn={false}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
    const view = screen.queryByTestId('dashboard');
    expect(view).not.toBeInTheDocument();
});

test('rendering private view while user logged in', () => {
    render(
        <BrowserRouter>
            <Routes>
                <Route
                    path="*"
                    element={
                        <PrivateRoute isLoggedIn={true}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
    const view = screen.queryByTestId('dashboard');
    expect(view).toBeInTheDocument();
});

