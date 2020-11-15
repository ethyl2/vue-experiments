const planOption = {
    template: '#plan-option-template',
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

const planDescription = {
    template: `<p class="plan-description">{{ description }}</p>`,
    props: {
        description: {
            type: String,
            default: 'A collection of tasty teas'
        }
    }
}

// Example of registering a component locally

const planPicker = {
    template: "#plan-picker-template",
    components: {
        planOption,
        planDescription
    },
    data() {
        return {
            // plans: ['The Curious', 'The Fruity Fan', 'The Addict', 'The Spicy Selector', 'The Cozy Cuddler'],
            plans: [ { name: 'The Curious', description: 'Unusual teas from unique markets' }, 
                    { name: 'The Fruity Fan', description: 'Variety of teas with distinctive fruity flavors'}, 
                    { name: 'The Addict', description: 'Includes multiple bags of a large selection'}, 
                    { name: 'The Spicy Selector', description: 'Cinnamon, cloves and other aromatics are highlighted in these teas'},
                    { name: 'The Cozy Cuddler', description: 'Comforting, calming and soothing.'}
                ],
            selectedPlan: null
        }
    },
    computed: {
        selectedPlanDescription() {
            if (this.selectedPlan) {
                const filteredPlans = this.plans.filter(plan => plan.name === this.selectedPlan)
                return filteredPlans[0].description
            }
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