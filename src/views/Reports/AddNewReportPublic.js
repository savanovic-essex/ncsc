import * as React from "react";
import {useState} from "react";
import {
    Button,
    Card, CardBody,
    Col, Container, FormFeedback, FormGroup, Input, Label, Row, Toast, ToastBody,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import validator from 'validator';
import {uid} from "uid";
import {db} from "../../firebase";
import { set, ref } from "firebase/database";

function AddNewReportPublic() {
    // Local state (initial declaration)
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");

    // Local state used as a helper for presenting validation text
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);

    // Helper function to check whether the fields are empty
    const isDisabled = () => {
        if (title.length < 3 ||
            fullName.length < 3 ||
            email.length < 3 ||
            phoneNumber.length < 3 ||
            description.length < 10 ||
            !isTitleValid ||
            !isNameValid ||
            !isEmailValid ||
            !isPhoneValid ||
            !isDescriptionValid) {
            return true
        }
    }

    // Function for submitting a report
    const submitReport = () => {
        const uidd = uid();
        set(ref(db, `reports/${uidd}`), {
            description: description,
            phoneNumber: phoneNumber,
            email: email,
            fullName: fullName,
            title: title,
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
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setDescription("");
    };

    return (
        <div className="container-bg">
            {/*Used for adding meta data to a page in React.js*/}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Add new report - NCSC</title>
                <meta name="description" content="Add new report to the NCSC Application (public access)" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <h2>Add new report</h2>
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
                                                data-testid="title-test"
                                                id="title"
                                                name="title"
                                                placeholder="Bug in post office software"
                                                type="text"
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                    setTimeout(() => {
                                                        setIsTitleValid(validator.isLength(e.target.value, {min: 5, max: 30}));
                                                    }, 100);
                                                }}
                                                invalid={!isTitleValid}
                                            />
                                            <FormFeedback>
                                                Report's title has to have a minimum length of 5 and a maximum length of 30 characters.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="fullName">
                                                Full name
                                            </Label>
                                            <Input
                                                data-testid="fullName-test"
                                                id="fullName"
                                                name="fullName"
                                                placeholder="John Doe"
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => {
                                                    setFullName(e.target.value);
                                                    setTimeout(() => {
                                                        setIsNameValid(validator.isAlpha(e.target.value, 'en-GB', {ignore: ' -'}));
                                                    }, 100);
                                                }}
                                                invalid={!isNameValid}
                                            />
                                            <FormFeedback>
                                                Your name must include only alphabetic characters.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email">
                                                Email
                                            </Label>
                                            <Input
                                                data-testid="email-test"
                                                id="email"
                                                name="email"
                                                placeholder="john@doe.com"
                                                type="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setTimeout(() => {
                                                        setIsEmailValid(validator.isEmail(e.target.value));
                                                    }, 100);
                                                }}
                                                invalid={!isEmailValid}
                                            />
                                            <FormFeedback>
                                                Please enter a valid email.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="phoneNumber">
                                                Phone number
                                            </Label>
                                            <Input
                                                data-testid="phoneNumber-test"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                placeholder="+134243423"
                                                type="text"
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value);
                                                    setTimeout(() => {
                                                        setIsPhoneValid(validator.isMobilePhone(e.target.value, "any", {strictMode:true}));
                                                    }, 100);
                                                }}
                                                invalid={!isPhoneValid}
                                            />
                                            <FormFeedback>
                                                Please enter a valid mobile phone number.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="description">
                                        Description
                                    </Label>
                                    <Input
                                        data-testid="description-test"
                                        id="description"
                                        name="text"
                                        type="textarea"
                                        placeholder="Describe the problem/bug..."
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                            setTimeout(() => {
                                                setIsDescriptionValid(validator.isLength(e.target.value, {min: 15, max: 250}));
                                            }, 100);
                                        }}
                                        invalid={!isDescriptionValid}
                                    />
                                    <FormFeedback>
                                        Report's description has to have a minimum length of 15 and a maximum length of 250 characters.
                                    </FormFeedback>
                                </FormGroup>
                                <Button
                                    disabled={isDisabled()}
                                    onClick={submitReport}
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
                    Successfully added a new report.
                </ToastBody>
            </Toast>
        </div>
    );
}

export default AddNewReportPublic;
