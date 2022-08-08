import React from "react";
import {
    Card, CardBody, CardLink, CardText, CardTitle,
    Col, Container, Row,
} from "reactstrap";
import CustomNavbar from "../components/Navbar";
import {Helmet} from "react-helmet";

function Dashboard() {

    return (
        <div className="container-bg">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard - NCSC</title>
                <meta name="description" content="Dashboard of the NCSC Application" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row>
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
                                <CardLink href={"/reports"} color="primary" className={"btn btn-primary"}>
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
                                <CardLink href={"/authorities"} color="primary" className={"btn btn-primary"}>
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
                                <CardLink href={"/itupdates"} color="primary" className={"btn btn-primary"}>
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
