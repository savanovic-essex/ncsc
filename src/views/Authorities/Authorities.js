import * as React from "react";
import {
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import ReportsTable from "../../components/ReportsTable";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";

function Authorities() {

    return (
        <div className="container-bg">
            <Helmet>
                <meta charSet="utf-8" />
                <title>List of authorities - NCSC</title>
                <meta name="description" content="List of authorities in the NCSC Application" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <h2>List of all authorities</h2>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <ReportsTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Authorities;
