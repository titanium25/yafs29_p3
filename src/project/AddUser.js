import {Button, Form, Toast} from "react-bootstrap";
import {useState} from "react";


function AddUser(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zCode, setZCode] = useState('');
    const [errors, setErrors] = useState({})

    const newErrors = {}
    // name errors
    if (!name || name === '') newErrors.name = 'cannot be blank!'
    else if (name.length > 30) newErrors.name = 'name is too long!'
    // email errors
    if (!email || email === '') newErrors.email = 'cannot be blank!'
    else if (email.length > 30) newErrors.email = 'email is too long!'
    // street errors
    if (!street || street === '') newErrors.street = 'cannot be blank!'
    else if (street.length > 30) newErrors.street = 'street name is too long!'
    // city errors
    if (!city || city === '') newErrors.city = 'cannot be blank!'
    else if (city.length > 20) newErrors.city = 'city is too long!'
    // zipcode errors
    if (!zCode || zCode === '') newErrors.zCode = 'cannot be blank!'
    else if (parseInt(zCode) <= 10000) newErrors.zCode = 'Zip code invalid!'


    const handleSubmit = () => {
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            let user = {
                name,
                email,
                address: {
                    street,
                    city,
                    zipcode: zCode
                }
            }
            props.callbackAddUser(user)
        }
    }

    return (

        <div>


            <Toast onClose={() => {
                props.setSwap(!props.swap)
            }} style={{width: '18rem'}}>
                <Toast.Header>
                    <strong className="me-auto">Add new user</strong>
                </Toast.Header>
                <Toast.Body>
                    <Form.Group>
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text"
                                      size="sm"
                                      isInvalid={!!errors.name}
                                      onChange={e => setName(e.target.value)}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.name}
                        </Form.Control.Feedback>
                        <br/>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email"
                                      size="sm"
                                      isInvalid={!!errors.email}
                                      onChange={e => setEmail(e.target.value)}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.email}
                        </Form.Control.Feedback>
                        <br/>
                        <Form.Label>Street: </Form.Label>
                        <Form.Control type="text"
                                      size="sm"
                                      isInvalid={!!errors.street}
                                      onChange={e => setStreet(e.target.value)}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.street}
                        </Form.Control.Feedback>
                        <br/>
                        <Form.Label>City: </Form.Label>
                        <Form.Control type="text"
                                      size="sm"
                                      isInvalid={!!errors.city}
                                      onChange={e => setCity(e.target.value)}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.city}
                        </Form.Control.Feedback>
                        <br/>
                        <Form.Label>Zip Code: </Form.Label>
                        <Form.Control type="number"
                                      size="sm"
                                      isInvalid={!!errors.zCode}
                                      onChange={e => setZCode(e.target.value)}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.zCode}
                        </Form.Control.Feedback>
                        <br/>
                        <Button variant="outline-secondary" size="sm"
                                onClick={() => props.setSwap(false)}>Cancel</Button>{' '}
                        <Button variant="outline-primary"
                                size="sm"
                                onClick={handleSubmit}>Add</Button>
                    </Form.Group>
                </Toast.Body>
            </Toast>

        </div>


    )
}

export default AddUser;