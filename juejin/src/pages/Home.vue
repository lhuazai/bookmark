<template>
<div>
  <div id="content">
    <div class="title" v-for="(item, index) in urls" :key="index"  @click="setIframe(item)">{{index + 1}} : {{item.title}}</div>
  </div>
  <div id="wrapper">
    <iframe ref="iframe" id="iframe" src="" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</div>

</template>
<script>
import { reactive, ref, onMounted } from 'vue';
import {urls} from '@/data/data.js';
export default {
  name: "Home",
  props: {},
  setup(props) {
    let iframe = ref(null);
    let title = ref(null);
    const data = reactive({
      list: [
        {name: '掘金', url: 'https://juejin.im/'},
        {name: 'sf', url: 'https://juejin.im/'},
      ]
    })
    onMounted(() => {
      console.log(data.list);
      iframe.value = document.querySelector('#iframe');
      title.value = document.querySelector('#title');
    });

    const setIframe = (item) => {
      iframe.value.contentWindow.location.replace(item.url);
    }
    return {
      urls,
      setIframe
    };
  }
};
</script>

<style scoped>
#box {
  width: 100%;
  height: 100vh;
  position: relative;
}
#content {
  width: 20%;
  height: 100vh;
  background-color: #f5f5f5;
  position: absolute;
  left: 0;
  top: 0;
  overflow: auto;
  text-align: left;
  padding-left: 8px;
}
#wrapper {
  width: 80%;
  height: 100vh;
  background-color: #fff;
  position: absolute;
  left: 20%;
  top: 0;
  overflow: auto;
}
.title {
  font-size: 16px;
  line-height: 30px;
  color: #409EFF;
  cursor: pointer;
}
.title:hover {
  color: #2c3e50;
}
</style>
