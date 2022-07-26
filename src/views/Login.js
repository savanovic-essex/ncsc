import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, CardBody,
    Col, Container,
    Navbar,
    NavbarBrand, Row,
} from "reactstrap";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    signInWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "../firebase.js";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/dashboard");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user;
                navigate("/dashboard");
                console.log(JSON.stringify(res, null, 2));
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    return (
        <div>
            <Navbar
                color="secondary"
                dark
                fixed={"top"}
            >
                <NavbarBrand href="/">
                    NCSC
                </NavbarBrand>
            </Navbar>
            <Container fluid className="container-bg">
                <Row style={{paddingTop: '15%'}}>
                    <Col md={{size: 4, offset: 4}}>
                        <Card
                            body
                            className="my-2"
                        >
                            <CardBody>
                                <h3>Log In</h3>
                                <div className="mb-3">
                                    <label>Email address</label>
                                    <input
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        value={email}
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        value={password}
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary" onClick={logIn}>
                                        Submit
                                    </button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
