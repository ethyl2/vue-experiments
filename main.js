var eventBus = new Vue();

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `<ul>
  <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>`,
});

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <legend>Add Your Review</legend>
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
    </p>
    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>Would you recommend this product?</p>
    <div class="radio-selection">
        <input type="radio" id="yes" value="yes" name="recommend" v-model="recommend">
        <label for="yes">Yes</label>
    </div>
    <div class="radio-selection">
        <input type="radio" id="no" value="no" name="recommend" v-model="recommend"  >
        <label for="no">No</label>
    </div>
    
    <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review" placeholder="what do you think?"></textarea>
    </p>
    
    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
        </select>
    </p>
      
    <p>
        <input type="submit" value="Submit">  
    </p>    

  </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
      recommend: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        eventBus.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push('Name required');
        if (!this.review) this.errors.push('Review required');
        if (!this.rating) this.errors.push('Rating required');
        if (!this.recommend)
          this.errors.push("Please pick whether you'd recommend this product");
      }
    },
  },
});

Vue.component('top-tabs', {
  props: {
    details: {
      type: Array,
      required: true,
    },
    premium: {
      type: Boolean,
    },
    shipping: {
      type: String || Number,
    },
  },
  template: `
    <div class='top-tabs'>
        <span class="tab"
            :class="{ activeTab: selectedTab === tab}" 
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab"> 
            {{ tab }}
        </span> 
        
        <product-details v-show="selectedTab === 'Details'" :details="details"></product-details>
        
        <div v-show="selectedTab === 'Shipping'">
            <p><span class='key'>Shipping:</span> {{ shipping }} </p>
            <p v-if="premium" class="premium-message">Thank you for being a premium customer. Enjoy your free shipping!</p>
        </div>
    </div> 
    `,
  data() {
    return {
      tabs: ['Details', 'Shipping'],
      selectedTab: 'Details',
    };
  },
});

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
          <div>  
            <span class="tab"
                :class="{ activeTab: selectedTab === tab}" 
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="selectedTab = tab"> 
                {{ tab }}
            </span>

            <product-review v-show="selectedTab === 'Add a Review'"></product-review>

            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">No reviews yet.</p>
        
                <ul class="reviews-box">
                    <li v-for="(review, index) in reviews" class='review-box' :key="index">
                        <div class="user">
                            <div class="img-container">
                                <img src="images/smallHead.png" alt="avator" />
                            </div>
                            <h3>{{ review.name }}</h3>
                        </div>
                        <p><span class='key'>Would recommend?</span> {{ review.recommend }}</p>
                        <p><span class='key'>Rating:</span> {{ review.rating }}</p>
                        <p>{{ review.review}}</p>

                    </li>
                </ul>
            </div>
          </div>
      `,
  data() {
    return {
      tabs: ['Reviews', 'Add a Review'],
      selectedTab: 'Reviews',
    };
  },
});

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
    },
  },
  template: `<div class="product">
    <div class="product-image">
      <a :href="link" target="_blank">
        <img :src="image" />
      </a>
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <h3>{{ description }}</h3>
      <p v-show="favorite">
        <span role="img" aria-label="Green Heart">💚</span>
      </p>
      <p v-if="onSale" style="font-style: italic">On Sale!</p>
      <p class="sale-message">{{ saleMessage }}</p>

      <p v-if="inStock" :class=" { outOfStock: inventory <= 0} ">
        In Stock
      </p>
      <p v-else>Out of Stock</p>

      <top-tabs :details="details" :premium="premium" :shipping="shipping"></top-tabs>

      

      <div class='options'>
        <div>
            <h3>Available Colors:</h3>
            <div
                v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantHex}"
            >
                <p @mouseover="updateProduct(index)" class="variant-color">
                {{ variant.variantColor }}
                </p>
            </div>
        </div>

        <div>
            <h3>Available Sizes:</h3>
            <ul>
                <li v-for="size in sizes" :key="size">{{ size }}</li>
            </ul>
        </div>
    </div>

      <div class="cart-buttons">
        <button
          v-on:click="addToCart"
          :disabled="!inStock"
          :class=" { disabledButton: !inStock} "
        >
          Add to Cart
        </button>
        <button
          @click="decrementCart"
          :disabled="cart < 1"
          :class=" { disabledButton: cart < 1} "
        >
          Remove from Cart
        </button>
      </div>
    </div>

    <product-tabs :reviews="reviews"></product-tabs>
    
  </div>`,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      description:
        'Colorful, with a definite personality. Will make you smarter when you wear them.',
      link:
        'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
      inventory: 0,
      favorite: true,
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      selectedVariant: 0,
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantHex: '#21864D',
          variantImage: './images/vmSocks-green-onWhite.jpg',
          variantQuantity: 0,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantHex: '#344760',
          variantImage: './images/vmSocks-blue-onWhite.jpg',
          variantQuantity: 8,
        },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      reviews: [],
    };
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    decrementCart() {
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariant].variantId
      );
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    saleMessage() {
      if (this.onSale) {
        return `Grab your ${this.brand} ${this.product} quick during this great sale!`;
      } else {
        return null;
      }
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    },
  },
  mounted() {
    eventBus.$on('review-submitted', (review) => {
      this.reviews.push(review);
    });
  },
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item !== id);
    },
  },
});
