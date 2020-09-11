Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
      default: ['80% cotton', '20% polyester', 'Gender-neutral'],
    },
  },
  template: `<ul>
  <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>`,
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

      <p v-if="inStock" :class=" { outOfStock: inventory <= 0} ">
        In Stock
      </p>
      <p v-else>Out of Stock</p>

      <p v-if="premium">Thank you for being a premium customer. Enjoy your free shipping!</p>
      <p>Shipping: {{ shipping }} </p>
      <p v-if="onSale" style="font-style: italic">On Sale!</p>
      <p class="sale-message">{{ saleMessage }}</p>

      <p v-show="favorite">
        <span role="img" aria-label="Green Heart">💚</span>
      </p>

      <product-details :details="details"></product-details>

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

      <h3>Available Sizes:</h3>
      <ul>
        <li v-for="size in sizes" :key="size">{{ size }}</li>
      </ul>

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
    };
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart');
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    decrementCart() {
      this.$emit('remove-from-cart');
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
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: 0,
  },
  methods: {
    updateCart() {
      this.cart += 1;
    },
    removeFromCart() {
      this.cart -= 1;
    },
  },
});
