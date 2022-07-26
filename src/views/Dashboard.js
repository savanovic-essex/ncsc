import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Col, Container,
    Navbar,
    NavbarBrand, Row,
} from "reactstrap";
import {useEffect} from "react";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('USER: ', JSON.stringify(user, null, 2));
            } else if (!user) {
                navigate("/login");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Navbar
                color="secondary"
                dark
                fixed={"top"}
            >
                <NavbarBrand href="/">
                    NCSC
                </NavbarBrand>
            </Navbar>
            <Container fluid className="container-bg">
                <Row style={{paddingTop: '15%'}}>
                    <Col md={12}>
                        <h1>Dashboard</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
