<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img
          :src="slide.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['skuImageList'],

  data() {
    return {
      currentIndex: 0
    }
  },

  methods: {
    changeCurrentIndex(index) {
      // console.log(index)
      // 修改响应式数据
      this.currentIndex = index
      // 通知兄弟组件：当前索引值为多少
      this.$bus.$emit('getIndex', this.currentIndex)
    }
  },

  watch: {
    // 监听数据skuImageList，只能保证数据完成，但是不能保证v-for循环结束
    skuImageList(newValue, oldValue) {
      // 通过this.$nextTick方法监听dom结构是否渲染完成
      // 在修改数据之后立即执行这个方法，获取更新后的dom
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // 设置同时显示图片数量
          slidesPerView: 3,
          // 点击按钮一次切换多少张图片(多少为一组)
          slidesPerGroup: 3
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
