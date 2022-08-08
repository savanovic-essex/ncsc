import {Navigate} from 'react-router-dom';

export default function PrivateRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" />
    }

    // authorized so return child components
    return children;
}

