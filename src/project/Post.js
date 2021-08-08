import {Form, ListGroup, Toast, Button} from "react-bootstrap";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Post(props) {
    const [show, setShow] = useState(true);
    const [swap, setSwap] = useState(false);
    const [post, setPost] = useState({userId: props.userId});
    const [errors, setErrors] = useState({})

    const newErrors = {}
    // title errors
    if (!post.title || post.title === '') newErrors.title = 'cannot be blank!'
    else if (post.title.length > 30) newErrors.title = 'title is too long!'
    // body errors
    if (!post.body || post.body === '') newErrors.body = 'cannot be blank!'
    else if (post.body.length > 5000) newErrors.title = 'post body is too long!'

    const handleSubmit = () => {
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            props.callbackNewPost(post)
            setSwap(false)
        }
    }

    const toggle = () => {
        setShow(false)
        props.setShowPosts(false)
    }

    return (
        <div>
            <Toast show={show} onClose={() => toggle()} style={{width: '18rem'}}>
                <Toast.Header>
                    <strong className="me-auto">Posts</strong>
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
                                          onChange={e => setPost(
                                              {...post, title: e.target.value}
                                          )}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.title}
                            </Form.Control.Feedback>
                            <br/>
                            <Form.Label>Body: </Form.Label>
                            <Form.Control as="textarea"
                                          rows={3}
                                          size="sm"
                                          isInvalid={!!errors.body}
                                          onChange={e => setPost(
                                              {...post, body: e.target.value}
                                          )}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.body}
                            </Form.Control.Feedback><br/>
                            <Button variant="outline-secondary"
                                    size="sm"
                                    onClick={() => setSwap(false)}>Cancel</Button>{' '}
                            <Button variant="outline-primary"
                                    size="sm"
                                    onClick={handleSubmit}>Add</Button>{' '}
                        </Toast.Body>
                        :
                        <Toast.Body>
                            <ListGroup variant="flush">
                                {
                                    props.posts.map((post, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <p className="h6">{post.title}</p>
                                                <p><em>{post.body}</em></p>
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

export default Post;
