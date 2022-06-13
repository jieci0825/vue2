<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入头部组件
import Header from './components/Header'
// 引入底部组件
import Footer from './components/Footer'

export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    Footer
  },
  data() {
    return {
      msg: 'abc'
    }
  },
  mounted() {
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
