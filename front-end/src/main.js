import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import * as VueRouter from 'vue-router'
import NotFoundPage from './pages/NotFoundPage.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANY1Ui6RMPMbqGxAxBR9DgGqXl6MMg2Ek",
  authDomain: "vue-site-21a9e.firebaseapp.com",
  projectId: "vue-site-21a9e",
  storageBucket: "vue-site-21a9e.appspot.com",
  messagingSenderId: "617618744428",
  appId: "1:617618744428:web:2e81a9de0b2ff47c3fa449"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '/cart',
    component: ShoppingCartPage,
  },{
    path: '/products',
    component: ProductsPage,
  },{
    path: '/products/:productId',
    component: ProductDetailPage,
  },{
    path : '/',
    redirect : '/products',
  },{
    path : '/:pathMatch(.*)*',
    component : NotFoundPage,
}]
}))
.mount('#app')
