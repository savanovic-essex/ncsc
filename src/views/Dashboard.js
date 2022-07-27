import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Card, CardBody, CardLink, CardText, CardTitle,
    Col, Container,
    Navbar,
    NavbarBrand, NavbarText, Row,
} from "reactstrap";
import {useEffect} from "react";
import {auth} from "../firebase";
import { signOut } from "firebase/auth";
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
        <div className="container-bg">
            <Navbar
                color="secondary"
                dark
                fixed={"top"}
            >
                <NavbarBrand href="/">
                    NCSC
                </NavbarBrand>
                <NavbarText>
                    <Button onClick={logOut} color={"light"} outline>Log out</Button>
                </NavbarText>
            </Navbar>
            <Container>
                <Row style={{paddingTop: '20%'}}>
                    <Col md={{size: 4}}>
                        <Card className={"text-center my-2"}>
                            <CardBody>
                                <h1 className="bi bi-flag" />
                                <CardTitle tag="h5">
                                    Reports
                                </CardTitle>
                                <CardText>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </CardText>
                                <CardLink href={"#"} color="primary" className={"btn btn-outline-primary"}>
                                    <i className="bi bi-plus-circle"></i> Add report
                                </CardLink>
                                <CardLink href={"/login"} color="primary" className={"btn btn-primary"}>
                                    <i className="bi bi-card-list"></i> List of all reports
                                </CardLink>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={{size: 4}}>
                        <Card className={"text-center my-2"}>
                            <CardBody>
                                <h1 className="bi bi-bank" />
                                <CardTitle tag="h5">
                                    Authorities
                                </CardTitle>
                                <CardText>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </CardText>
                                <CardLink href={"#"} color="primary" className={"btn btn-outline-primary"}>
                                    <i className="bi bi-plus-circle"></i> Add authority
                                </CardLink>
                                <CardLink href={"/login"} color="primary" className={"btn btn-primary"}>
                                    <i className="bi bi-card-list"></i> List of all authorities
                                </CardLink>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={{size: 4}}>
                        <Card className={"text-center my-2"}>
                            <CardBody>
                                <h1 className={"bi bi-newspaper"} />
                                <CardTitle tag="h5">
                                    IT Updates
                                </CardTitle>
                                <CardText>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </CardText>
                                <CardLink href={"#"} color="primary" className={"btn btn-outline-primary"}>
                                    <i className="bi bi-plus-circle"></i> Add IT update
                                </CardLink>
                                <CardLink href={"/login"} color="primary" className={"btn btn-primary"}>
                                    <i className="bi bi-card-list"></i> List of all IT updates
                                </CardLink>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
