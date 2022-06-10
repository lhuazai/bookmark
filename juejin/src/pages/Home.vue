<template>
  <div>
    <div id="content">
      <input
        :value="searchVal"
        @input="fnSearch"
      >
      <div
        v-for="(item, index) in list"
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
import {urls} from '@/data/data.js';
export default {
  props: {},
  setup() {
    let iframe = ref(null);
    let title = ref(null);
    const data = reactive({
      searchVal: '',
      list: urls,
    })
    onMounted(() => {
      iframe.value = document.querySelector('#iframe');
      title.value = document.querySelector('#title');
    });

    const setIframe = (item) => {
      iframe.value.contentWindow.location.replace(item.url);
    }
    const fnSearch = (e) => {
      console.log(e.target.value);
      data.searchVal = e.target.value;
      data.list = urls.filter(item => item.title.includes(data.searchVal));
      console.log(data.list);
    }
    return {
      ...data,
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
