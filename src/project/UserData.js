import User from './User'
import Post from "./Post";
import Tasks from "./Tasks";
import {Col, Row} from "react-bootstrap";
import {useState} from "react";

function UserData(props) {

    const [showPosts, setShowPosts] = useState(false)
    const [showTasks, setShowTasks] = useState(false)

    return (
        <div>
            <Row>
                <Col>
                    <User user={props.user}
                          key={props.user.id}
                          userTasks={props.userTasks}
                          bgcolor={showPosts || showTasks ? 'warning' : 'light'}
                          setShowPosts={setShowPosts}
                          setShowTasks={setShowTasks}
                          callbackUpdateUser={obj => props.callbackUpdate(obj)}
                          callbackDeleteUser={id => props.callbackDelete(id)}
                    />
                </Col>
                <Col>
                    {showPosts && <Post posts={props.userPosts}
                                        key={props.user.id}
                                        userId={props.user.id}
                                        setShowPosts={setShowPosts}
                                        callbackNewPost={newPost => props.callbackNewPost(newPost)}
                    />
                    }
                </Col>
                <Col>
                    {showTasks && <Tasks tasks={props.userTasks}
                                         key={props.user.id}
                                         userId={props.user.id}
                                         setShowTasks={setShowTasks}
                                         callbackUpdateTask={task => props.callbackUpdateTask(task)}
                                         callbackNewTask={newTask => props.callbackNewTask(newTask)}
                    />
                    }
                </Col>
            </Row>
        </div>
    );
}

export default UserData;