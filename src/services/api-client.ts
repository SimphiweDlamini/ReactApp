import axois,{CanceledError} from 'axios';

export default axois.create({
    baseURL:'https://jsonplaceholder.typicode.com'
})

export {CanceledError};