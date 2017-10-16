<template>
  <div class="note">
    <div class="toolbar">
      <button @click="saveNote">Save</button>
      <button @click="removeNote">Remove</button>
    </div>

    <input v-model="title" class="title" type="text" placeholder="Please enter the title."/>
    <textarea v-model="body" class="body"></textarea>
    <!--<div ref="body" class="body" contenteditable></div> &lt;!&ndash; contenteditable : div를 textarea처럼 사용가능 &ndash;&gt;-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Editor',

    computed: mapState(['currentNote']), // currentNote state 를 바로 사용가능

    data () {
      return {
        key: '',
        title: '',
        body:''
      }
    },
    watch: {
      // key: data의 이름으로 함수
      currentNote () {
        this.key = this.currentNote['.key']
        this.title = this.currentNote.title
        this.body = this.currentNote.body
      }
    },
    methods: {
      saveNote() {
        let updateNote = {
          '.key': this.currentNote['.key'],
          title: this.title,
          body: this.body,
          updated_at: new Date()
        }

        this.$store.commit('updateNote', updateNote)
        this.$store.dispatch('commitCurrentNote')
      },
      removeNote() {
        this.$store.dispatch('removeCurrentNote')
      }
    }
  }
</script>

<style scoped>
  .note {
    display: flex;
    flex-flow: column;
    height: 100vh;
  }

  .note .toolbar {
    margin-bottom: 35px;
  }

  .note .toolbar button {
    border: 0;
    background-color: #dddddd;
    padding: 6px 10px;
    border-radius: 5px;
  }

  .note .title {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid #e3e3e3;
    font-size: 30px;
    outline: 0;
    padding: 15px;
    margin-bottom: 10px;
  }

  .note .body {
    border: 0;
    outline: 0;
    padding: 15px;
    height: 100%;
    overflow: auto;
  }
</style>
