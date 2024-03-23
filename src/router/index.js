import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes.js'

export default function () {
  const createHistory = process.env.SERVER ?
    createMemoryHistory :
    (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0
    }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return router
}
