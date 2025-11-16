const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'empathy', component: () => import('pages/EmpathyPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'my-stories', component: () => import('pages/MyStoriesPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
