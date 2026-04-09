<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Main Contents -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style>
* {
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
}
</style>

<style scoped>
main {
  padding: 20px;
}
</style>
