import * as React from "react";
// import {useState} from "react";
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
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddNewAuthority() {
    // Local state (initial declaration)
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [isOpen, setIsOpen] = useState(false);

    const addNewAuthority = () => {
        const uidd = uid();
        set(ref(db, `authorities/${uidd}`), {
            email: formik.values.email,
            name: formik.values.name,
            uidd: uidd,
            date: Date()
        })
            .then(() => {
                formik.values.isOpen = true;
                // setIsOpen(true);
                setTimeout(() => {
                    formik.values.isOpen = false;
                }, 3000);
            });

        formik.values.name = "";
        formik.values.email = "";
        console.log("Form was submitted")
        
    };

    const formik = useFormik({
        initialValues: {
            name:"",
            email:"",
            isOpen:false,
        },
        validationSchema:Yup.object({
            name: Yup.string()
            .required('Required'),
            email: Yup.string()
            .required('Required')
            .email("Please enter a valid email address")

        }),
        onSubmit: () => {addNewAuthority()}
    });
    
    // Function for adding a new authority to the database
    return (
        <form onSubmit={formik.handleSubmit}>
        <div className="container-bg">
            {/*Used for adding meta data to a page in React.js*/}
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
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.name ? <p>{formik.errors.name}</p>: null}
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
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.email ? <p>{formik.errors.email}</p>: null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                  

                                <Button
                                    // disabled={formik.values.isEmpty}
                                
                                    color="primary"
                                    className="float-end"
                                    type="submit">
                                    Submit
                                </Button> 
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            
            </Container>
            <Toast isOpen={formik.values.isOpen} className={"bg-success text-white"}>
                <ToastBody>
                    Successfully added a new authority.
                </ToastBody>
            </Toast>
        </div>
        </form>
    );
}

export default AddNewAuthority;
