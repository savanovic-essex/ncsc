import {
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import ReportsTable from "../components/ReportsTable";
import CustomNavbar from "../components/Navbar";

function Reports() {

    return (
        <div className="container-bg">
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
