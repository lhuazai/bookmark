<template>
	<article v-html="markdown"></article>  
</temple>

<script>
import markdown from '@/data/markdown.md'
export default {
  data() {
    return {
      markdown
    }
  }
}  
</script>
