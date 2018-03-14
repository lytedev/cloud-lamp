import Vue from 'vue';
import App from './App.vue';
import router from './router';
import CloudLampStore from './CloudLampStore';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
	store: CloudLampStore(),
	router,
	render: (h) => h(App),
}).$mount('#app');
