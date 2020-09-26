import axios from 'axios'

const instance = axios.create({
    baseURL: `https://itpartner.herokuapp.com/`
});

export default instance;

// https://itpartner.herokuapp.com/