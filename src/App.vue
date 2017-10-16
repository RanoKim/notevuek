<template>
  <div id="app">
    <div class="list">
      <list></list>
    </div>
    <div class="editor">
      <editor></editor>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List'
  import Editor from '@/components/Editor'

export default {
  name: 'app',
  components: {
    List,
    Editor
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }

  #app {
    width: 100vw; /* 브라우저 너비의 100% */
    height: 100vh; /* 브라우저 높이의 100% */
  }
  #app > div {
    height: 100vh; /* 브라우저 높이의 100% */
    padding: 10px;
    box-sizing: border-box; /* 사이즈는 바뀌지 않고 Padding 값만 변경된다*/
  }
  #app .list {
    float: left;
    overflow: auto;
    width: 300px;
    border-right: 1px solid #e3e3e3;
  }
  #app > .editor {
    padding-left: 10px;
    overflow-wrap: break-word;
  }
</style>
