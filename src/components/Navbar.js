import React, {useEffect, useState} from "react";
import {Button, Navbar, NavbarBrand, NavbarText} from "reactstrap";
import {auth} from "../firebase";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const CustomNavbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('USER: ', JSON.stringify(user, null, 2));
                setIsLoggedIn(true)
            } else if (!user) {
                setIsLoggedIn(false);
                //navigate("/");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <Navbar
            color="secondary"
            dark
            sticky={"top"}
        >
            <NavbarBrand href="/">
                NCSC
            </NavbarBrand>
            <NavbarText>
                {
                    isLoggedIn && <Button onClick={logOut} color={"light"} outline>Log out</Button>
                }
            </NavbarText>
        </Navbar>
    )
}

export default CustomNavbar;
