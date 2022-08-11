import * as React from "react";
import {useState} from "react";
import {
    Button,
    Card, CardBody,
    Col, Container, FormGroup, Input, Label, Row, Toast, ToastBody,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import {uid} from "uid";
import {db} from "../../firebase";
import { set, ref } from "firebase/database";

function AddNewITUpdate() {
    // Local state (initial declaration)
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [yearOfPublication, setYearOfPublication] = useState("");
    const [version, setVersion] = useState("");
    const [company, setCompany] = useState("");
    const [features, setFeatures] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Helper function to check whether the fields are empty
    const isEmpty = () => {
        if (title.length < 3 ||
            type.length < 3 ||
            yearOfPublication.length < 3 ||
            version.length < 3 ||
            company.length < 3 ||
            features.length < 3) {
            return true
        }
    }

    // Function for adding a new IT update to the database
    const addNewITUpdate = () => {
        const uidd = uid();
        set(ref(db, `itupdates/${uidd}`), {
            title: title,
            type: type,
            yearOfPublication: yearOfPublication,
            version: version,
            company: company,
            features: features,
            uidd: uidd,
            date: Date()
        })
            .then(() => {
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        });

        setTitle("");
        setType("");
        setYearOfPublication("");
        setVersion("");
        setCompany("");
        setFeatures("");
    };

    return (
        <div className="container-bg">
            {/*Used for adding meta data to a page in React.js*/}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Add new IT Update - NCSC</title>
                <meta name="description" content="Add new IT Update to the NCSC Application" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <h2>Add new IT Update</h2>
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
                                            <Label for="title">
                                                Title
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="New IT Update"
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="type">
                                                Type
                                            </Label>
                                            <Input
                                                id="type"
                                                name="type"
                                                placeholder="Update type"
                                                type="text"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="yearOfPublication">
                                                Year Of Publication
                                            </Label>
                                            <Input
                                                id="yearOfPublication"
                                                name="yearOfPublication"
                                                placeholder="e.g. 2022"
                                                type="text"
                                                value={yearOfPublication}
                                                onChange={(e) => setYearOfPublication(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="version">
                                                Version
                                            </Label>
                                            <Input
                                                id="version"
                                                name="version"
                                                placeholder="e.g. 1.2.30"
                                                type="text"
                                                value={version}
                                                onChange={(e) => setVersion(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="company">
                                                Company
                                            </Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                placeholder="e.g. Post Office"
                                                type="text"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="features">
                                                Features
                                            </Label>
                                            <Input
                                                id="features"
                                                name="features"
                                                placeholder="Some new functionality..."
                                                type="text"
                                                value={features}
                                                onChange={(e) => setFeatures(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button
                                    disabled={isEmpty()}
                                    onClick={addNewITUpdate}
                                    color="primary"
                                    className="float-end">
                                    Submit
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Toast isOpen={isOpen} className={"bg-success text-white"}>
                <ToastBody>
                    Successfully added a new IT update.
                </ToastBody>
            </Toast>
        </div>
    );
}

export default AddNewITUpdate;
