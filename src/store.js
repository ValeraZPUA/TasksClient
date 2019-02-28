import Vue from 'vue'
import Vuex from 'vuex'
import * as constants from '../constants'
import * as userService from './api/rest/usersService'

Vue.use(Vuex)

const taskModule = {
  state: {
    tasks: [],
    isFetching: false,
    error: null
  },
  mutations: {
    [constants.TASKS_REQUEST] (state) {
      state.isFetching = true
    },
    [constants.TASKS_RESPONSE] (state, tasks) {
      state.tasks = tasks
      state.isFetching = false
      state.error = null
    },
    [constants.TASKS_ERRORS] (state, error) {
      state.error = error
      state.isFetching = false
    },
    [constants.DELETE_TASK_REQUEST] (state) {
      state.isFetching = true
    },
    [constants.DELETE_TASK_RESPONSE] (state, tasks) {
      state.tasks = tasks
      state.isFetching = false
      state.error = null
    },
    [constants.DELETE_TASK_ERRORS] (state, error) {
      state.error = error
      state.isFetching = false
    },
    [constants.NEW_TASK_REQUEST] (state) {
      state.isFetching = true
    },
    [constants.NEW_TASK_RESPONSE] (state, tasks) {
      state.tasks = tasks
      state.isFetching = false
      state.error = null
    },
    [constants.NEW_TASK_ERRORS] (state, error) {
      state.error = error
      state.isFetching = false
    },
    [constants.UPDATE_TASK_REQUEST] (state) {
      state.isFetching = true
    },
    [constants.UPDATE_TASK_RESPONSE] (state, tasks) {
      state.tasks = tasks
      state.isFetching = false
      state.error = null
    },
    [constants.UPDATE_TASK_ERRORS] (state, error) {
      state.error = error
      state.isFetching = false
    }
  },
  actions: {
    async [constants.TASKS] ({ commit }) {
      commit(constants.TASKS_REQUEST)
      try {
        const { data } = await userService.getAllTasks()
        commit(constants.TASKS_RESPONSE, data)
      } catch (e) {
        commit(constants.TASKS_ERRORS, e)
      }
    },
    async [constants.DELETE_TASK] ({ commit }, id) {
      commit(constants.DELETE_TASK_REQUEST)
      try {
        const { data } = await userService.deleteTask(id)
        commit(constants.DELETE_TASK_RESPONSE, data)
      } catch (e) {
        commit(constants.DELETE_TASK_ERRORS, e)
      }
    },
    async [constants.NEW_TASK] ({ commit }, formData) {
      commit(constants.NEW_TASK_REQUEST)
      try {
        const { data } = await userService.createTask(formData)
        commit(constants.NEW_TASK_RESPONSE, data)
      } catch (e) {
        commit(constants.NEW_TASK_ERRORS, e)
      }
    },
    async [constants.UPDATE_TASK] ({ commit }, formData) {
      commit(constants.UPDATE_TASK_REQUEST)
      try {
        const { data } = await userService.updateTask(formData)
        commit(constants.UPDATE_TASK_RESPONSE, data)
      } catch (e) {
        commit(constants.UPDATE_TASK_ERRORS, e)
      }
    }
  }
}

export default new Vuex.Store({
  modules: {
    taskMod: taskModule
  }
})
