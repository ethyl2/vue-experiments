<template>
  <div class="layout">
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer">made with slots</slot>
    </footer>
  </div>
</template>


<style scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.layout header,
.layout footer {
  background: #13d3c9;
  color: white;
  padding: 1rem;
  flex: 0 0 auto;
}

.layout main {
  flex: 1 1 auto;
}
</style>