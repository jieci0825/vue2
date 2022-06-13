<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper包
import Swiper from 'swiper'
export default {
  name: 'Carsousel',

  props: ['list'],

  watch: {
    // 监听lsit数据的变化
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        // console.log('111')
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            autoplay: {
              delay: 2000
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style></style>
