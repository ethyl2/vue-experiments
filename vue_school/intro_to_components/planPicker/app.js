Vue.component('plan-details', {
    template: '#plan-template',
    props: {
        name: {
            type: String,
            default: 'The Basic'
        }
    }
})

new Vue({
    el: '#app'
})