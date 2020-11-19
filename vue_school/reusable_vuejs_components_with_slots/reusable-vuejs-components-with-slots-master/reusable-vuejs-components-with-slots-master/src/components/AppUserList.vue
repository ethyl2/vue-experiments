
<template>
  <section>
    <slot name="title"><h2>Users</h2></slot>
    <slot
      name="userlist"
      :count="data.results.length"
      :list="data.results"
      :remove="remove"
      v-if="state === 'loaded'"
    >
     
      <div class="userlist">
        <div v-for="item in data.results" :key="item.email">
          <slot name="listitem" :user="item">
            <div>
              <img
               
                :src="item.picture.large"
                :alt="item.name.first + ' ' + item.name.last"
              />
              <div>
                <div>{{ item.name.first }}</div>
                <slot name="secondrow" :item="item">
                </slot>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </slot>
    <slot v-else-if="state === 'loading'" name="loading">
      <app-spinner />
    </slot>
    <slot v-else-if="state === 'failed'" name="error">
      Oops, something went wrong.
    </slot>
  </section>
</template>

<script>
import AppSpinner from '@/components/AppSpinner'
const states = {
  idle: "idle",
  loading: "loading",
  loaded: "loaded",
  failed: "failed"
};

export default {
  props: {
    secondrow: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    AppSpinner,
  },
  data() {
    return {
      state: "idle",
      data: undefined,
      error: undefined,
      states
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.state = "loading";
      this.error = undefined;
      this.data = undefined;
      try {
        setTimeout(async () => {
          const response = await fetch("https://randomuser.me/api/?results=10");
          const json = await response.json();
          this.state = "loaded";
          this.data = json;
          return response;
        }, 1000);
      } catch (error) {
        this.state = "failed";
        this.error = error;
        return error;
      }
    },
    remove(item) {
      this.data.results = this.data.results.filter(entry => entry.email !== item.email)
    }
  }
};
</script>

<style>
.userlist {
  margin: 10px;
  display: flex;
  flex-flow: column nowrap;
}

.userlist img {
  border-radius: 50%;
  margin-right: 1rem;
  margin-left: 1rem;
  max-width: 5rem;
  max-height: 5rem;
}

.userlist div {
  display: flex;
  width: 90%;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 0.5em;
}

.userlist li + li {
  margin-top: 10px;
}

.userlist li > div {
  display: flex;
  align-items: center;
}

.userlist li div div {
  flex: 1;
}
</style>