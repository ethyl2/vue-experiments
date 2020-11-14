const planDetails = {
    template: '#plan-template',
    props: {
        name: {
            type: String,
            default: 'The Basic'
        },
        selectedPlan : {
            type: String
        }
    },
    computed: {
        isSelected() {
            return this.name === this.selectedPlan
        }
    },
    methods: {
        select() {
            this.$emit('select-plan', this.name)
        }
    }
}

// Example of registering a component locally

const planPicker = {
    template: "#plan-picker-template",
    components: {
        planDetails
    },
    data() {
        return {
            plans: ['The Curious', 'The Fruity Fan', 'The Addict', 'The Spicy Selector', 'The Cozy Cuddler'],
            selectedPlan: null
        }
    },
    methods: {
        updatePlan(plan) {
            this.selectedPlan = plan
        }
    }
}

// Example of a global component registration.

Vue.component('app-intro', {
    template: "#app-intro-template",
    data() {
        return {
        appTitle: 'Herbal Tea Plans',
        appSubtitle: 'We travel the the world to source the very best herbal teas for you'
        }
    }
})

new Vue({
    el: '#app',
    components: {
        planPicker
    }
})