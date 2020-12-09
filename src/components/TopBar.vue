<template>
  <div class="top-bar">
    <div class="title-box">
      <span class="title">溪のBlog</span>
    </div>
    <div class="menu-box" v-if="menuList.length > 0">
      <span :class="['menu-item', active == index ? 'active' : '']" v-for="(item, index) in menuList" :key="index" @click="menuClick(index)">
        <router-link :to="{ path: item.path }" class="menu-item-a">{{ item.name }}</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
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
    menuClick(index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px #e7e9ec solid;
  .title-box {
    padding-left: 40px;
    text-align: left;
    width: 60%;
    font-size: 26px;
    font-weight: 600;
    .title {
      cursor: pointer;
    }
  }
  .menu-box {
    width: 20%;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: 500;
    .menu-item {
      padding: 4px;
      cursor: pointer;
      border-bottom: 2px #fff solid;
      .menu-item-a {
        color: #000;
        text-decoration: none;
      }
    }
    .menu-item:hover {
      border-bottom: 2px #30b57e solid;
    }
    .active {
      border-bottom: 2px #30b57e solid;
    }
  }
}
</style>
