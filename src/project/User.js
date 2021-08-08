import Button from 'react-bootstrap/Button';
import {Alert, Card, Form, Toast} from "react-bootstrap";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function User(props) {

    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [street, setStreet] = useState(props.user.address.street);
    const [city, setCity] = useState(props.user.address.city);
    const [zCode, setZCode] = useState(props.user.address.zipcode);
    const [show, setShow] = useState(false);

    const updateUser = () => {
        let user = {
            id: props.user.id,
            name,
            email,
            address: {
                street,
                city,
                zipcode: zCode
            }
        }
        props.callbackUpdateUser(user)
        console.log(user)
    }

    const borderColor = (userTasks) => {
        return userTasks.some(t => t.completed === false) ? 'danger' : 'success';
    }

    return (
        <div>

            <Card border={borderColor(props.userTasks)}
                  style={{width: '18rem'}}
                  className="mb-3 border-2"
                  bg={props.bgcolor}
            >
                <Card.Header onClick={() => {
                    props.setShowPosts(true)
                    props.setShowTasks(true)
                }
                }>
                    <strong><FontAwesomeIcon icon="address-card"/> User ID: {props.user.id}</strong>
                </Card.Header>
                <Card.Body>
                    <Form.Label>Name: </Form.Label>
                    <div key={props.user.name}>
                        <Form.Control type="text" defaultValue={props.user.name} size="sm"
                                      onChange={e => setName(e.target.value)}/>
                    </div>
                    <br/>
                    <Form.Label>Email: </Form.Label>
                    <div key={props.user.email}>
                        <Form.Control type="email" defaultValue={props.user.email} size="sm"
                                      onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <br/>

                    <Alert variant="secondary" onMouseOver={() => setShow(true)}>
                        <small><FontAwesomeIcon icon="arrow-circle-down"/> Other Data</small>
                    </Alert>


                    <Toast show={show} onClose={() => setShow(false)}>
                        <Toast.Header>
                            <strong className="me-auto">Address</strong>
                        </Toast.Header>
                        <Toast.Body>
                            <Form.Label>Street: </Form.Label>
                            <div key={props.user.address.street}>
                                <Form.Control type="text" defaultValue={props.user.address.street} size="sm"
                                              onChange={e => setStreet(e.target.value)}/>
                            </div>
                            <br/>
                            <Form.Label>City: </Form.Label>
                            <div key={props.user.address.city}>
                                <Form.Control type="text" defaultValue={props.user.address.city} size="sm"
                                              onChange={e => setCity(e.target.value)}/>
                            </div>
                            <br/>
                            <Form.Label>Zip Code: </Form.Label>
                            <div key={props.user.address.zipcode}>
                                <Form.Control type="text" defaultValue={props.user.address.zipcode} size="sm"
                                              onChange={e => setZCode(e.target.value)}/>
                            </div>
                            <br/>
                        </Toast.Body>
                    </Toast>

                </Card.Body>
                <Card.Footer>
                    <Button variant="outline-primary"
                            size="sm"
                            onClick={updateUser}>
                        <FontAwesomeIcon icon="pencil-alt"/> Update
                    </Button>{' '}
                    <Button variant="outline-danger"
                            size="sm"
                            onClick={() => props.callbackDeleteUser(props.user.id)}>
                        <FontAwesomeIcon icon="trash"/> Delete
                    </Button>{' '}
                </Card.Footer>
            </Card>

        </div>


    );
}

export default User;
