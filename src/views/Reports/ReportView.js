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
import {ref, onValue, update} from "firebase/database";
import { useParams } from 'react-router-dom';
import moment from "moment";

function ReportView() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorities, setAuthorities] = useState([]);
    const [authority, setAuthority] = useState("");
    const [status, setStatus] = useState("");
    const [details, setDetails] = useState([{uidd: uid(), detailName: "", detailValue: ""}]);
    const [report, setReport] = useState({});
    const { uidd } = useParams();

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

        onValue(ref(db, `/reports/${uidd}`), (snapshot) => {
            setReport({});
            const data = snapshot.val();
            setReport(data);
            setTitle(data.title);
            setDescription(data.description);
            if (data.details) {
                setDetails(data.details);
            }
            setAuthority(data.authority);
            setStatus(data.status);
        });
    }, [])

    const isEmpty = () => {
        const found = details && details.some(detail => detail['detailName'] === '' || detail['detailValue'] === '')
        if ((title.length < 3 || !authority || description.length < 10) && found) {
            return true
        }
    }

    const updateReport = () => {
        update(ref(db, `reports/${uidd}`), {
            title: title,
            description: description,
            authority: authority || null,
            status: status || 'TODO',
            details: details
        });
    };

    return (
        <div className="container-bg">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title} - NCSC</title>
                <meta name="description" content="Add new report to the NCSC Application (private access)" />
            </Helmet>
            <CustomNavbar />
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col>
                        <Card className={"my-2"}>
                            <CardBody>
                                <h2>{report.title}</h2>
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
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="cyberSpecialistID">
                                                Cyber Specialist ID
                                            </Label>
                                            <Input
                                                id="cyberSpecialistID"
                                                name="cyberSpecialistID"
                                                type="text"
                                                value={report.cyberSpecialistID}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="date">
                                                Created at
                                            </Label>
                                            <Input
                                                id="date"
                                                name="date"
                                                type="text"
                                                value={moment(report.date).format('MMMM Do YYYY, h:mm:ss A')}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="source">
                                                Source
                                            </Label>
                                            <Input
                                                id="source"
                                                name="source"
                                                type="text"
                                                value={report.source}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="status">
                                                Status
                                            </Label>
                                            <Input
                                                id="status"
                                                name="status"
                                                type="select"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value={"TODO"}>
                                                    To do
                                                </option>
                                                <option value={"INPROGRESS"}>
                                                    In progress
                                                </option>
                                                <option value={"COMPLETED"}>
                                                    Completed
                                                </option>
                                                <option value={"DECLINED"}>
                                                    Declined
                                                </option>
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
                                        details && details.map((detail, index) => (
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
                                                               onClick={() => handleDetailRemove(index)}
                                                        >
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                    <Row>
                                        <Col className={"d-grid gap-2"}>
                                            <Button outline
                                                    disabled={details && (details[details.length - 1].detailName.length < 3 || details[details.length - 1].detailValue.length < 3)}
                                                    color={"success"}
                                                    onClick={addDetail}>
                                                Add new detail
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <Button
                                    disabled={isEmpty()}
                                    onClick={updateReport}
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

export default ReportView;
