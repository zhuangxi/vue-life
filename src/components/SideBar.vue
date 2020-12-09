<template>
  <div class="side-bar">
    <ul class="side-menu">
      <li class="side-menu-item" v-for="(item, index) in menuList" :key="index" @click="handlerClick(item, index)">
        <span :class="['side-menu-item-name', active == index ? 'active' : '']">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    menuList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    handlerClick(item, index) {
      this.active = index
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  padding: 0;
  margin: 0;
  .side-menu-item {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    list-style: none;
    padding-left: 30px;
    text-align: left;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .side-menu-item-name:hover {
    color: #30b57e;
  }
  .active {
    color: #30b57e;
  }
}
</style>
