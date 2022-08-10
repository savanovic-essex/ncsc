import * as React from "react";
import {
    Button,
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import ITUpdatesTable from "../../components/ITUpdatesTable";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import {onValue, ref} from "firebase/database";

function ITUpdates() {
    const navigate = useNavigate();

    const [itupdates, setITUpdates] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `/itupdates`), (snapshot) => {
                    setITUpdates([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        setITUpdates(Object.values(data))
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
                <title>List of IT Updates - NCSC</title>
                <meta name="description" content="List of IT Updates in the NCSC Application" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <h2>List of all IT Updates</h2>
                                    </Col>
                                    <Col>
                                        <Button className={"float-end"}
                                                color={"primary"}
                                                onClick={() => navigate("/addnewitupdate")}
                                                outline>
                                            <i className="bi bi-plus-circle"></i> Add IT update
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
                                <ITUpdatesTable data={itupdates || []}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ITUpdates;
