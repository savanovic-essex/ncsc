import * as React from "react";
import {
    Button,
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import AuthoritiesTable from "../../components/AuthoritiesTable";
import {useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import {onValue, ref} from "firebase/database";
import {useNavigate} from "react-router-dom";

function Authorities() {
    // Navigate function based on the useNavigate() hook
    const navigate = useNavigate();
    // Local state (initial declaration)
    const [authorities, setAuthorities] = useState([]);

    // Triggered on load
    useEffect(() => {
        // Check whether a user is logged in or not
        auth.onAuthStateChanged((user) => {
            if (user) {
                // Fetch all authorities from the database
                onValue(ref(db, `/authorities`), (snapshot) => {
                    setAuthorities([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        setAuthorities(Object.values(data))
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
            {/*Used for adding meta data to a page in React.js*/}
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
                                <Row>
                                    <Col>
                                        <h2>List of all authorities</h2>
                                    </Col>
                                    <Col>
                                    {/* building button redirecting to add new authorities page*/}
                                        <Button className={"float-end"}
                                                color={"primary"}
                                                onClick={() => navigate("/addnewauthority")}
                                                outline>
                                            <i className="bi bi-plus-circle"></i> Add authority
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
                                <AuthoritiesTable data={authorities || []}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Authorities;
