import {
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import ReportsTable from "../components/ReportsTable";
import CustomNavbar from "../components/Navbar";
import {Helmet} from "react-helmet";
import * as React from "@types/react";

function Reports() {

    return (
        <div className="container-bg">
            <Helmet>
                <meta charSet="utf-8" />
                <title>List of reports - NCSC</title>
                <meta name="description" content="List of reports in the NCSC Application" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <h1>List of all reports</h1>
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

export default Reports;
