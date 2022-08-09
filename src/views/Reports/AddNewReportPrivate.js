import * as React from "react";
import {useState, useEffect} from "react";
import {
    Button,
    Card, CardBody, CardTitle,
    Col, Container, FormGroup, Input, Label, Row,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import {uid} from "uid";
import {auth, db} from "../../firebase";
import {set, ref, onValue} from "firebase/database";

function AddNewReportPrivate() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorities, setAuthorities] = useState([]);
    const [authority, setAuthority] = useState("");
    const [details, setDetails] = useState([{uidd: uid(), detailName: "", detailValue: ""}]);

    const addDetail = () => {
        setDetails([...details, {uidd: uid(), detailName: "", detailValue: ""}]);
    };

    const handleDetailRemove = (index) => {
        const list = [...details];
        list.splice(index, 1);
        setDetails(list);
    };

    const handleDetailChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...details];
        list[index][name] = value;
        setDetails(list);
    };

    useEffect(() => {
        onValue(ref(db, `/authorities`), (snapshot) => {
            setAuthorities([]);
            const data = snapshot.val();
            if (data !== null) {
                setAuthorities(Object.values(data))
            }
        });
    }, [])

    const isEmpty = () => {
        const found = details.some(detail => detail['detailName'] === '' || detail['detailValue'] === '')
        if ((title.length < 3 || !authority || description.length < 10) || found) {
            return true
        }
    }

    const submitReport = () => {
        const uidd = uid();
        set(ref(db, `reports/${uidd}`), {
            uidd: uidd,
            title: title,
            description: description,
            source: "Internal",
            date: Date(),
            email: null,
            phoneNumber: null,
            fullName: null,
            cyberSpecialistID: auth.currentUser.uid,
            authority: authority,
            status: 'TODO',
            details: details
        });

        setTitle("");
        setAuthority("");
        setDescription("");
        setDetails([{uidd: uid(), detailName: "", detailValue: ""}])
    };

    return (
        <div className="container-bg">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Add new report - NCSC</title>
                <meta name="description" content="Add new report to the NCSC Application (private access)" />
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
                                                id="title"
                                                name="title"
                                                placeholder="Bug in post office software"
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="authority">
                                                Authority
                                            </Label>
                                            <Input
                                                id="authority"
                                                name="authority"
                                                placeholder="John Doe"
                                                type="select"
                                                value={authority}
                                                onChange={(e) => setAuthority(e.target.value)}
                                            >
                                                <option value={""}>
                                                    -
                                                </option>
                                                {
                                                    authorities.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.uidd}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="description">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        name="text"
                                        type="textarea"
                                        placeholder="Describe the problem/bug..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </FormGroup>
                                <CardTitle>Details</CardTitle>
                                <CardBody className={"bg-light border mb-3"}>
                                    {
                                        details.map((detail, index) => (
                                            <Row key={index}>
                                                <Col md={5}>
                                                    <FormGroup>
                                                        <Label for="detailName">
                                                            Detail Name
                                                        </Label>
                                                        <Input
                                                            required
                                                            id="detailName"
                                                            name="detailName"
                                                            type="text"
                                                            value={detail.detailName}
                                                            onChange={(e) => handleDetailChange(e, index)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={5}>
                                                    <FormGroup>
                                                        <Label for="detailValue">
                                                            Detail Value
                                                        </Label>
                                                        <Input
                                                            required
                                                            id="detailValue"
                                                            name="detailValue"
                                                            type="text"
                                                            value={detail.detailValue}
                                                            onChange={(e) => handleDetailChange(e, index)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={2}>
                                                    <FormGroup>
                                                        <Label>.</Label>
                                                        <Input type={"button"}
                                                               className={"btn btn-outline btn-danger"}
                                                               value={"Remove"}
                                                               disabled={details.length === 1}
                                                               onClick={() => handleDetailRemove(index)}>
                                                            Remove
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                    <Row>
                                        <Col className={"d-grid gap-2"}>
                                            <Button outline
                                                    disabled={details[details.length - 1].detailName.length < 3 || details[details.length - 1].detailValue.length < 3}
                                                    color={"success"}
                                                    onClick={addDetail}>
                                                Add new detail
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <Button
                                    disabled={isEmpty()}
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
        </div>
    );
}

export default AddNewReportPrivate;
