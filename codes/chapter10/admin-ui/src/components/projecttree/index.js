import Projecttree from './src/ProjectTree.vue';

/* istanbul ignore next */
Projecttree.install = function(Vue) {
    Vue.component(Projecttree.name, Projecttree);
};

export default Projecttree;
