import axios from 'axios'


const AlgorithmProviderHandler = axios.create({
    baseURL: 'https://localhost:7130/api/building',
})
