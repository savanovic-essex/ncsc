import * as React from "react";
import {
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import ITUpdatesTable from "../../components/ITUpdatesTable";

function ITUpdates() {

    return (
        <div className="container-bg">
            <Helmet>
                <meta charSet="utf-8" />
                <title>List of IT Updates - NCSC</title>
                <meta name="description" content="List of IT Updates in the NCSC Application" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <h2>List of all IT Updates</h2>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <ITUpdatesTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ITUpdates;
