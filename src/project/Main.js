import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faAddressCard,
    faArrowCircleDown,
    faPencilAlt,
    faPlusCircle,
    faThumbsDown,
    faThumbsUp,
    faTimesCircle,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import utilsUsers from "./utils/utilsUsers";
import utilsPosts from "./utils/utilsPosts";
import utilsTodos from "./utils/utilsTodos";
import DataManage from "./DataManage";

function Main() {

    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        let responsePosts = await utilsPosts.getAllPosts()
        setPosts(responsePosts.data)

        let responseTasks = await utilsTodos.getAllTodos()
        setTasks(responseTasks.data)

        let responseUsers = await utilsUsers.getAllUsers()
        setUsers(responseUsers.data)
    }, [])


    return (
        <Container className="mt-4">

            <DataManage
                users={users}
                tasks={tasks}
                posts={posts}
            />

        </Container>
    );
}


library.add(
    faAddressCard,
    faTrash,
    faPencilAlt,
    faArrowCircleDown,
    faThumbsUp,
    faThumbsDown,
    faTimesCircle,
    faPlusCircle
)

export default Main;
