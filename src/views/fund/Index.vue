<template>
  <div class="fund-container">
    <div class="left-container">
      <side-bar :menu-list="menuList"></side-bar>
    </div>
    <div class="right-container">
      测试
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
          label: '基金统计',
          path: '/fund/statistics'
        },
        {
          label: '基金分析',
          path: '/fund/analysis'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.fund-container {
  display: flex;
  height: 100%;
  width: 100%;
  .left-container {
    width: 15%;
    height: 100%;
    border-right: 1px #e7e9ec solid;
    padding: 20px;
  }
}
</style>
