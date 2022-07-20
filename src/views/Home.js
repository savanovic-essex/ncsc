import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody} from "reactstrap";

function Home() {
    return (
        <div className="App">
            <div className="App-header">
                <Card style={{marginRight: 10}}>
                    <CardBody>
                        <p>kdlsfjkdjflkdsjfdsfjldsf</p>
                    </CardBody>
                </Card>
                <Card style={{marginLeft: 10}}>
                    <CardBody>
                        <p>kdlsfjkdjflkdsjfdsfjldsf</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Home;
