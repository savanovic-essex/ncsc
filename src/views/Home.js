import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Card,
    CardText, CardTitle, Col, Container,
    Navbar,
    NavbarBrand, Row,
} from "reactstrap";

function Home() {
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
