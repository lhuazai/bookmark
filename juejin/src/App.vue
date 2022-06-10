<script setup>
  import { reactive, ref, onMounted } from 'vue';
  import {urls} from '../src/assets/data.js';
  const data = reactive({
    urls
  })
  let iframe = ref(null);
  const setIframe = (item) => {
    iframe.value.contentWindow.location.replace(item.url);
  }
</script>

<template>
<div>
  <div id="content">
    <div class="title" v-for="(item, index) in data.urls" :key="index"  @click="setIframe(item)">{{index + 1}} : {{item.title}}</div>
  </div>
  <div id="wrapper">
    <iframe ref="iframe" id="iframe" src="" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
</style>
