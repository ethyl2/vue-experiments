<template>
  <div class="userlist">
    <div v-for="item in list" :key="item.email">
      <slot name="listitem" :user="item">
        <div class="card">
          <img
            class="responsive"
            :src="item.picture.large"
            :alt="item.name.first + ' ' + item.name.last"
          />
          <div class="card-body">
            
            <slot name="first" :text="item.name.first"></slot>

            <slot name="last" :text="item.name.last"></slot>

            <slot name="full" :text="`${item.name.first} ${item.name.last}`"></slot>

            <slot name="fullWithTitle" :text="`${item.name.title} ${item.name.first} ${item.name.last} `"></slot>

            <slot name="secondrow" :item="item"> {{ item.email }} | {{ item.phone }}</slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    default: () => {}
  }
};
</script>

<style scoped>
.userlist {
  /* display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr; */
  display: flex;
  flex-flow: column nowrap;
}

.responsive {
  width: 100%;
}

.card {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
}

.card-body {
  padding: 1rem;
}
</style>