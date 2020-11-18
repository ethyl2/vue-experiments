<template>
  <div class="page">
    <AppLayout>
      <template #header>
        <h1>Fun with Slots</h1>
      </template>
    <AppButton @click="handleClick">Press Me</AppButton>
    <AppButton @click="handleClick"><AppIcon />Like Me</AppButton>
    <AppButton @click="handleClick">Buy Me</AppButton>
    <p v-if="message">{{ message }}</p>

    <select v-model="selected">
      <option 
        v-for="option in options" 
        :value="option.value" 
        :key="option.value">
        {{option.label}}
      </option>
    </select>


    <AppUserList>
      <template #userlist="{list}">
        <AppUserCardsList :list="list">
          <template #[selected]="{text}">
            <h2>{{text}}</h2>
          </template>
        </AppUserCardsList>
      </template>
    </AppUserList>

    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/components/AppLayout"
import AppUserList from "@/components/AppUserList";
import AppUserCardsList from "@/components/AppUserCardsList";
import AppButton from "@/components/AppButton"
import AppIcon from "@/components/AppIcon"
export default {
  components: {
    AppUserList,
    AppUserCardsList,
    AppButton,
    AppIcon,
    AppLayout
  },
  data() {
    return {
      selected: 'first',
      options: [
        { value: 'first',  label: 'first name'},
        { value: 'last',  label: 'last name'},
        { value: 'full',  label: 'fullname'},
        { value: 'fullWithTitle',  label: 'fullname with title'},
      ],
      message: ''
    }
  },
  methods: {
    handleClick() {
      this.message = 'Thank you!'
    }
  }
};
</script>

<style>
.page {
  padding: 2rem;
}

.page > * + * {
  margin-top: 2rem;
}
</style>