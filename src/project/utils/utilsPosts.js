import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/posts/';

const getAllPosts= () => {
    return axios.get(url)
}

const getPost = async (id) => {
    let response = await axios.get(url);
    let allData = response.data;
    return allData.filter(x => x.userId === id)
}

export default {getAllPosts, getPost}