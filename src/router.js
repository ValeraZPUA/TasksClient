import Vue from 'vue'
import Router from 'vue-router'
import TasksPage from './views/TasksPage/TasksPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'taskspage',
      component: TasksPage
    }
  ]
})
