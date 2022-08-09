import * as React from "react";
import {
    Button,
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import ReportsTable from "../../components/ReportsTable";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import { ref, onValue } from "firebase/database";
import {useNavigate} from "react-router-dom";

function Reports() {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `/reports`), (snapshot) => {
                    setReports([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        setReports(Object.values(data))
                    }
                });
            } else if (!user) {
                navigate("/");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                <Row>
                                    <Col>
                                        <h2>List of all reports</h2>
                                    </Col>
                                    <Col>
                                        <Button className={"float-end"}
                                                color={"primary"}
                                                onClick={() => navigate("/addnewreportprivate")}
                                                outline>
                                            <i className="bi bi-plus-circle"></i> Add report
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <ReportsTable data={reports || []}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Reports;
