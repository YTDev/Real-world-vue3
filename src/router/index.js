import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress  from 'nprogress'
import 'nprogress/nprogress.css';

import GStore from '@/store'


// const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route=>({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true }
      },
    ]
  },
  /*==============Solution 1:
  ===============*/
  // {
  //   path: '/event/:id',
  //   redirect: () =>{ 
  //     return {name: 'EventDetails' }  
  //   },
  //   children: [
  //     {
  //       path: 'register',
  //       redirect: () => ( {name: 'EventRegister'} )
  //     },
  //     {
  //       path: 'edit',
  //       redirect: () => ( {name: 'EventEdit'} )
  //     }
  //   ]
  // },

  /*==============Solution 2:
  ===============*/
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to)=>{
      return {
        path: '/events/' + to.params.afterEvent
      }
    },
  },
  {
    path: '/about-us',
    name: 'About',
    component: About
  },
  {
    path: '/about',
    redirect: { name: 'About' }
  },
  {
    //match all routes that don't match an existing route
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// Global before guards
router.beforeEach((to, from) =>{
  NProgress.start();
  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page!';
    
    setTimeout(() => {
      GStore.flashMessage = "";
    }, 3000);
    if( from.href ){
      return false;
    }
    else{
      return {path : '/'}
    }

  }


})
// Global After Hooks
router.afterEach(() =>{
  NProgress.done();
})

export default router
