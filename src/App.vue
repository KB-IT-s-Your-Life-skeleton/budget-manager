<template>
  <div class="AppLayout">
    <Header />

    <div class="AppBody">
      <Sidebar />

      <main class="MainContent">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<style>
* {
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
}
</style>

<style scoped>
.AppLayout {
  min-height: 100vh;
  background-color: #f5f7fb;
  color: #222222;
}

.AppBody {
  display: flex;
  min-height: calc(100vh - 64px);
}

.MainContent {
  flex: 1;
  padding: 24px;
  overflow-x: hidden;
}
</style>
