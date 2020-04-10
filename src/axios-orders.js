import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-4efb5.firebaseio.com/'
});

export default instance;