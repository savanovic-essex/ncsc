import {
    Button,
    Card,
    CardText, CardTitle, Col, Container, Row,
} from "reactstrap";

import CustomNavbar from "../components/Navbar";
import {useEffect} from "react";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('USER: ', JSON.stringify(user, null, 2));
                navigate("/dashboard");
            } else if (!user) {
                navigate("/");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <CustomNavbar />
            <Container fluid className="container-bg">
                <Row style={{paddingTop: '15%'}}>
                    <Col md={{size: 4, offset: 2}}>
                        <Card
                            body
                            className="text-center my-2"
                        >
                            <CardTitle tag="h5">
                                Submit a report
                            </CardTitle>
                            <CardText>
                                Readily available to public
                            </CardText>
                            <Button color="primary">
                                Submit a report
                            </Button>
                        </Card>
                    </Col>
                    <Col md={{size: 4}}>
                        <Card
                            body
                            className="text-center my-2"
                        >
                            <CardTitle tag="h5">
                                Log in
                            </CardTitle>
                            <CardText>
                                Log in as a cyber specialist
                            </CardText>
                            <a href={"/login"} color="primary" className={"btn btn-primary"}>
                                Log in
                            </a>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
