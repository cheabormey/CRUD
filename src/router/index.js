import { createRouter, createWebHistory } from 'vue-router';
import Home from '../form/Home.vue';
import Edit from '../form/Edit.vue';
import UserCreate from '../components/UserCreate.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
  },
  {
    path: '/usercreate',
    name: 'usercreate',
    component: UserCreate,
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
