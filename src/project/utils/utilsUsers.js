import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/users/';

const getAllUsers = () => {
    return axios.get(url)
}

const getUser = (id) => {
    return axios.get(url + id)
}

const addUser = (user) => {
    return axios.post(url, user)
}


export default {getAllUsers, getUser, addUser}