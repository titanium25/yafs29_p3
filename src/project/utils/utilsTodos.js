import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/todos/';

const getAllTodos = () => {
    return axios.get(url)
}

const getTodo = async (id) => {
    let response = await axios.get(url);
    let allData = response.data;
    return allData.filter(x => x.userId === id);
}

export default {getAllTodos, getTodo}