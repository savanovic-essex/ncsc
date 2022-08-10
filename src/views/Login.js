import * as React from "react";
import {
    Card, CardBody,
    Col, Container, Row,
} from "reactstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    signInWithEmailAndPassword,
    getMultiFactorResolver,
    PhoneAuthProvider,
    PhoneMultiFactorGenerator,
    RecaptchaVerifier
} from "firebase/auth";
import 'firebase/auth';
import {auth} from "../firebase.js";
import CustomNavbar from "../components/Navbar";
import {Helmet} from "react-helmet";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    let resolver;
    let multiFactorHints;

    const logIn = async () => {
        auth.tenantId = "ncsc-zzcf6";
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                navigate("/dashboard");
                console.log(JSON.stringify(res, null, 2));
            })
            .catch(async (error) => {
                if (error.code === 'auth/multi-factor-auth-required') {
                    resolver = getMultiFactorResolver(auth, error);
                    // Show UI to let user select second factor.
                    multiFactorHints = resolver.hints;
                    const selectedHint = multiFactorHints[0];

                    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                        'size': 'invisible',
                    }, auth);
                    const phoneAuthProvider = new PhoneAuthProvider(auth);
                    const phoneInfoOptions = {
                        multiFactorHint: selectedHint,
                        session: resolver.session
                    };
                    // Send SMS verification code
                    const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)

                    let verificationCode = window.prompt('Please enter the verification ' +
                        'code that was sent to your mobile device.');
                    const cred = PhoneAuthProvider.credential(
                        verificationId, verificationCode);
                    const multiFactorAssertion =
                        PhoneMultiFactorGenerator.assertion(cred);
                    // Complete sign-in.
                    const userCredential = await resolver.resolveSignIn(multiFactorAssertion);
                    navigate("/dashboard")
                } else {
                    console.log(error)
                }
            });
    };

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Log in - NCSC</title>
                <meta name="description" content="Log in page for the NCSC Application" />
            </Helmet>
            <CustomNavbar />
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
                                    <button className="btn btn-primary my-2" onClick={logIn}>
                                        Submit
                                    </button>
                                </div>
                                <div id={'recaptcha-container'}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
