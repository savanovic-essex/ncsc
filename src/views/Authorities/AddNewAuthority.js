import * as React from "react";
import {useState} from "react";
import {
    Button,
    Card, CardBody,
    Col, Container, FormGroup, Input, Label, Row,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import {uid} from "uid";
import {db} from "../../firebase";
import { set, ref } from "firebase/database";

function AddNewAuthority() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const isEmpty = () => {
        if (name.length < 3 || email.length < 3) {
            return true
        }
    }

    const addNewAuthority = () => {
        const uidd = uid();
        set(ref(db, `authorities/${uidd}`), {
            email: email,
            name: name,
            uidd: uidd,
            date: Date()
        });

        setName("");
        setEmail("");
    };

    return (
        <div className="container-bg">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Add new authority - NCSC</title>
                <meta name="description" content="Add new authority to the NCSC Application (public access)" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <h2>Add new authority</h2>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="name">
                                                Authority name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Post Office"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                placeholder="authority@mail.com"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button
                                    disabled={isEmpty()}
                                    onClick={addNewAuthority}
                                    color="primary"
                                    className="float-end">
                                    Submit
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddNewAuthority;
