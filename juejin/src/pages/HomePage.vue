/*
 * @Author: shihuaLiu 
 * @Date: 2022-06-13 09:30:42 
 * @Last Modified by: shihuaLiu
 * @Last Modified time: 2022-06-13 13:45:59
 */
<template>
  <div>
    <div id="content">
      <div>
        <input v-model="data.searchVal"/>
        <button @click="fnSearch">搜索</button>
      </div>
      
      <div
        v-for="(item, index) in data.list"
        :key="index"
        class="title"
        @click="setIframe(item)"
      >
        {{ index + 1 }} : {{ item.title }}
      </div>
    </div>
    <div id="wrapper">
      <iframe
        id="iframe"
        ref="iframe"
        src=""
        width="100%"
        height="100%"
        frameborder="0"
      />
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue';
import { urls } from '@/data/data.js';
export default {
  props: {},
  setup() {
    let iframe = ref(null);
    const data = reactive({
      searchVal: '',
      list: urls.reverse(),
    })
    onMounted(() => {
      iframe.value = document.querySelector('#iframe');
    });

    const setIframe = (item) => {
      iframe.value.contentWindow.location.replace(item.url);
    }
    const fnSearch = () => {
      data.list = urls.filter(item => {
        return item.title.indexOf(data.searchVal) > -1;
      });
    }
    return {
      data,
      setIframe,
      fnSearch
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
  width: 18%;
  height: 100vh;
  background-color: #f5f5f5;
  position: absolute;
  left: 0;
  top: 0;
  overflow: auto;
  text-align: left;
  padding: 8px;
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
