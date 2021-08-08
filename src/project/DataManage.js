import {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserData from "./UserData";
import AddUser from "./AddUser";

function DataManage(props) {

    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [posts, setPosts] = useState([])
    const [searchArr, setSearchArr] = useState([])
    const [search, setSearch] = useState('')
    const [swap, setSwap] = useState(false)
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleClose = () => setShow(false);

    useEffect(
        () => {
            setUsers(props.users);
            setTasks(props.tasks);
            setPosts(props.posts);

            setSearchArr(
                users.filter(x => (x.name.toLowerCase().includes(search)
                    ||
                    x.email.toLowerCase().includes(search))
                )
            )


        }, [props, search, users, tasks, posts]
    );

    const updateUser = (user) => {
        const index = users.findIndex(u => u.id === user.id);
        setUsers(users.splice(index, 1, user));
    }

    const deleteUserModal = (id) => {
        setShow(true)
        setUserName(users.find(u => u.id === id))
    }

    const deleteUser = () => {
        const index = users.findIndex(u => u.id === userName.id);
        setUsers(users.splice(index, 1));
        setShow(false)
    }

    const updateTask = (task) => {
        const index = tasks.findIndex(t => t.id === task.id);
        setTasks(tasks.splice(index, 1, task));
    }

    const addUser = (user) => {
        setUsers(users.splice(0, 0, {...user, id: users.length + 1}));
        setSwap(!swap)
    }

    const addTask = (task) => {
        setTasks(tasks.splice(0, 0, {...task, id: tasks.length + 1}));
    }

    const addPost = (post) => {
        setPosts(posts.splice(0, 0, {...post, id: posts.length + 1}));
    }

    const renderUserData = (user, index) => {
        return (
         <UserData
            key={index}
            user={user}
            userPosts={posts.filter(p => p.userId === user.id)}
            userTasks={tasks.filter(t => t.userId === user.id)}
            callbackUpdate={obj => updateUser(obj)}
            callbackDelete={id => deleteUserModal(id)}
            callbackUpdateTask={task => updateTask(task)}
            callbackNewTask={newTask => addTask(newTask)}
            callbackNewPost={newPost => addPost(newPost)}
        />
        )
    }


    return (

        <div>
            {
                swap ?
                    <AddUser swap={swap}
                             setSwap={setSwap}
                             callbackAddUser={newUser => addUser(newUser)}
                    />
                    :
                    <div>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="mb-3 w-auto"
                            aria-label="Search"
                            onChange={e => setSearch(e.target.value.toLowerCase())}
                        />
                        <Button variant="outline-secondary mb-3"
                                size="sm"
                                onClick={() => setSwap(true)}>
                            <FontAwesomeIcon icon="plus-circle"/> Add new user
                        </Button>
                        {
                            search ?
                                searchArr.map((user, index) => {
                                    return renderUserData(user, index)
                                })
                                :
                                users.map((user, index) => {
                                    return renderUserData(user, index)
                                })
                        }
                    </div>
            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you absolutely sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This action cannot be undone. This will permanently delete the <b> {userName.name} </b>,
                        from the database. </p>
                    <p>Please type <b>delete {userName.name}</b> to confirm.</p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter confirmation here"
                        onChange={e => setConfirm(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        confirm === 'delete ' + userName.name ?
                            <Button variant="primary" onClick={deleteUser}>Understood</Button>
                            :
                            <Button variant="primary" disabled>Understood</Button>
                    }
                </Modal.Footer>
            </Modal>

        </div>

    );
}

export default DataManage;
