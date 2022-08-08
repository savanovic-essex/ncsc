import {
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import ReportsTable from "../components/ReportsTable";
import CustomNavbar from "../components/Navbar";

function ITUpdates() {

    return (
        <div className="container-bg">
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
                                <ReportsTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ITUpdates;