import { createRouter, createWebHistory } from 'vue-router'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import ListFilesPage from '@/pages/ListFilesPage.vue'
import SharedFilesPage from '@/pages/SharedFilesPage.vue'
import AuthPage from '@/pages/AuthPage.vue'
import EditFilePage from '@/pages/EditFilePage.vue'
import RightsPage from '@/pages/RightsPage.vue'
import UploadFilesPage from '@/pages/UploadFilesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/registration'
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage
    },
    {
      path: '/files',
      name: 'files',
      component: ListFilesPage
    },
    {
      path: '/shared-files',
      name: 'shared-files',
      component: SharedFilesPage
    },
    {
      path: '/edit-file',
      name: 'edit-file',
      component: EditFilePage
    },
    {
      path: '/rights',
      name: 'rights',
      component: RightsPage
    },
    {
      path: '/upload-files',
      name: 'upload-files',
      component: UploadFilesPage
    },
  ]
})

export default router
