import * as React from "react";
import {useState, useEffect} from "react";
import {
    Button,
    Card, CardBody, CardTitle,
    Col, Container, FormGroup, Input, Label, Row, Toast, ToastBody,
} from "reactstrap";
import CustomNavbar from "../../components/Navbar";
import {Helmet} from "react-helmet";
import {uid} from "uid";
import {db} from "../../firebase";
import {ref, onValue, update} from "firebase/database";
import { useParams } from 'react-router-dom';
import moment from "moment";

function ReportView() {
    // Local state (initial declaration)
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorities, setAuthorities] = useState([]);
    const [authority, setAuthority] = useState("");
    const [status, setStatus] = useState("");
    const [details, setDetails] = useState([{uidd: uid(), detailName: "", detailValue: ""}]);
    const [report, setReport] = useState({});
    const { uidd } = useParams();

    // Function for adding a new detail in the details list
    const addDetail = () => {
        setDetails([...details, {uidd: uid(), detailName: "", detailValue: ""}]);
    };

    // Handler for removing a detail from the details list
    const handleDetailRemove = (index) => {
        const list = [...details];
        list.splice(index, 1);
        setDetails(list);
    };

    // Handler for editing single detail, i.e. changing text
    const handleDetailChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...details];
        list[index][name] = value;
        setDetails(list);
    };

    // Triggered on load
    useEffect(() => {
        // Load all authorities from the database
        onValue(ref(db, `/authorities`), (snapshot) => {
            setAuthorities([]);
            const data = snapshot.val();
            if (data !== null) {
                setAuthorities(Object.values(data))
            }
        });

        // Load a report from the database
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

    // Helper function to check whether the fields are empty
    const isEmpty = () => {
        const found = details && details.some(detail => detail['detailName'] === '' || detail['detailValue'] === '')
        if ((title.length < 3 || !authority || description.length < 10) && found) {
            return true
        }
    }

    // Function for updating a report
    const updateReport = () => {
        update(ref(db, `reports/${uidd}`), {
            title: title,
            description: description,
            authority: authority || null,
            status: status || 'TODO',
            details: details
        })
            .then(() => {
                setIsOpen(true);
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
            });
    };

    return (
        <div className="container-bg">
            {/*Used for adding meta data to a page in React.js*/}
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
                                            <Label for="title" /* Building text field containing report
                                            title and possibility to modify it*/
                                            >
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
                                            <Label for="authority" /* Building text field containing authority
                                            name selected or inserted when report was submitted and possibility
                                            to modify it*/
                                            >
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
                                                    authorities && authorities.map((item, index) => {
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
                                            <Label for="cyberSpecialistID" /* Building text field containing
                                            cyber specialist ID*/
                                            >
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
                                            <Label for="date" /* Building text field containing
                                            time stamp of when the report was submitted*/
                                            >
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
                                            <Label for="source" /* Building text field containing
                                            information regarding the source of the report if public or internal to NCSC*/
                                            >
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
                                            <Label for="status" /* Building text field containing
                                            drop down of the current status of the report and being able to amend it*/
                                            >
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
                                    <Label for="description" /* Building text field containing description of the 
                                            report inserted when submitted and possibility to modify it*/
                                    >
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
                                                        <Label for="detailName" /* Building text field containing
                                                        detail name and possibility to modify it*/
                                                        >
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
                                                        <Label for="detailValue" /* Building text field containing
                                                        detail value and possibility to modify it*/
                                                        >
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
                                                        <Input type={"button"} //button to remove detail
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
                                            <Button outline // button to add new detail
                                                    disabled={details && (details[details.length - 1].detailName.length < 3 || details[details.length - 1].detailValue.length < 3)}
                                                    color={"success"}
                                                    onClick={addDetail}>
                                                Add new detail
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <Button //  button to submit changes done to the current report
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
            <Toast isOpen={isOpen} className={"bg-success text-white"}>
                <ToastBody // pop up message confirming successful update of the report
                >
                    Successfully updated the report.
                </ToastBody>
            </Toast>
        </div>
    );
}

export default ReportView;
