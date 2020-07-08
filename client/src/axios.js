import axios from 'axios';

var serverUrl = 'http://localhost:4000/api'    //process.env.REACT_APP_BASE_URL;


const userData = JSON.parse(localStorage.getItem('userData'));

const token = userData ? userData.token : ''
console.log(token);

export default axios.create({
    baseURL: serverUrl,
    headers: {
        'Authorization': 'Bearer ' + token
    }
});
