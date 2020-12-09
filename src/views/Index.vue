<template>
  <div class="main-page">
    <div class="header-container">
      <top-bar :menu-list="menuList"></top-bar>
    </div>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
export default {
  name: 'Index',
  components: {
    TopBar
  },
  data() {
    return {
      menuList: [
        {
          name: 'Spend',
          path: '/spend'
        },
        {
          name: 'Fund',
          path: '/fund'
        },
        {
          name: 'Skill',
          path: '/skill'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
  height: 100%;
  .main-container {
    height: calc(100vh - 60px);
    width: 100%;
  }
}
</style>
