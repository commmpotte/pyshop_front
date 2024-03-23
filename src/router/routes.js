const routes = [{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
        path: '/',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
      }, {
        path: 'users',
        component: () => import('pages/MembersList.vue'),
      },
      {
        path: 'users/:id',
        component: () => import('pages/UserDashboard.vue'),
      },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
