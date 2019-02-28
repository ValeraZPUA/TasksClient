import { restURL } from '../baseURL'
import axios from 'axios'

export const getAllTasks = () => axios.get(restURL + '/task')

export const deleteTask = (id) => axios.delete(restURL + '/task/' + id)

export const createTask = (formData) => axios.post(restURL + '/task', formData)

export const updateTask = (formData) => axios.put(restURL + '/task/' + formData.id, formData)
