import {Button, Form, ListGroup, Toast} from "react-bootstrap";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Tasks(props) {
    const [show, setShow] = useState(true);
    const [swap, setSwap] = useState(false);
    const [task, setTask] = useState({userId: props.userId, completed: false});

    const [errors, setErrors] = useState({})

    const newErrors = {}
    // name errors
    if (!task.title || task.title === '') newErrors.title = 'cannot be blank!'
    else if (task.title.length > 30) newErrors.title = 'task name is too long!'

    const handleSubmit = () => {
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            props.callbackNewTask(task)
            setSwap(false)
        }
    }


    const toggle = () => {
        setShow(false)
        props.setShowTasks(false)
    }


    return (
        <div>
            <Toast show={show} onClose={() => toggle()} style={{width: '18rem'}}>
                <Toast.Header>
                    <strong className="me-auto">Tasks</strong>
                    <Button variant="outline-secondary" size="sm" onClick={() => setSwap(true)}>
                        <FontAwesomeIcon icon="plus-circle"/> Add new
                    </Button>{' '}
                </Toast.Header>
                {
                    swap ?
                        <Toast.Body>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control type="text"
                                          size="sm"
                                          isInvalid={!!errors.title}
                                          onChange={e => setTask(
                                              {...task, title: e.target.value}
                                          )}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.title}
                            </Form.Control.Feedback>
                            <br/>
                            <Button variant="outline-secondary" size="sm"
                                    onClick={() => setSwap(false)}>Cancel</Button>{' '}
                            <Button variant="outline-primary"
                                    size="sm"
                                    onClick={handleSubmit}>Add</Button>{' '}
                        </Toast.Body>
                        :
                        <Toast.Body>
                            <ListGroup variant="flush">
                                {
                                    props.tasks.map((task, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <p className="h6">{task.title}</p>
                                                <div className="d-grid gap-2">
                                                    {
                                                        !task.completed ?
                                                            <Button variant="outline-danger"
                                                                    size="sm"
                                                                    onClick={
                                                                        () => props.callbackUpdateTask(
                                                                            {
                                                                                ...task,
                                                                                completed: true
                                                                            }
                                                                        )
                                                                    }
                                                            >
                                                                <FontAwesomeIcon icon="times-circle"/> Unfinished
                                                            </Button>
                                                            :
                                                            <Button variant="outline-success"
                                                                    size="sm"
                                                                    onClick={
                                                                        () => props.callbackUpdateTask(
                                                                            {
                                                                                ...task,
                                                                                completed: false
                                                                            }
                                                                        )
                                                                    }

                                                            >
                                                                <FontAwesomeIcon icon="thumbs-up"/> Completed
                                                            </Button>
                                                    }
                                                </div>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Toast.Body>
                }


            </Toast>
        </div>
    );
}

export default Tasks;
