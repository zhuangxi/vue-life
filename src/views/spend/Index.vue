<template>
  <div class="spend-container">
    <div class="left-container">
      <side-bar :menu-list="menuList"></side-bar>
    </div>
    <div class="right-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'

export default {
  name: 'Index',
  components: {
    SideBar
  },
  data() {
    return {
      menuList: [
        {
          name: '开销统计',
          path: '/spend/statistics'
        },
        {
          name: '开销分析',
          path: '/spend/analysis'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.spend-container {
  display: flex;
  height: 100%;
  width: 100%;
  .left-container {
    width: 10%;
    height: 100%;
    border-right: 1px #e7e9ec solid;
    padding: 20px;
  }
  .right-container {
    width: 89%;
    height: 100%;
  }
}
</style>
