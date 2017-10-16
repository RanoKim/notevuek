<template>
  <div>
    <div class="toolbar">
      <button @click="newNote">New Note</button>
    </div>
    <div class="notes">
      <note v-for="note in notes" :key="note['.key']" :note="note"
            :class="{ active: currentNote['.key'] == note['.key'] }"
            @click.native="selectNote(note['.key'])"></note>
      <!--<note></note>-->
      <!--<note class="active"></note>-->
      <!--<note></note>-->
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Note from '@/components/Note'

  export default {
    name: 'List',

    computed: {
      ...mapGetters(['notes']),
      ...mapState(['currentNote'])

//      notes: function () {
//        return this.$store.getters.notes
//      }
//      currentNote: function () {
//        return this.$store.state.currentNote
//      }
    },

    components: {
      Note
    },

    created () {
      this.$store.dispatch('setNotesReference')
        .then(() => {
          let key = this.$route.query.key
          if (key) {
            this.selectNote(key)
          }
        })
    },

    methods: {
      newNote () {
        this.$store.commit('updateNote', {})
      },
      selectNote (key) {
        this.$store.commit('selectNote', key)
        this.$router.push({ push: '/', query: { key: key } })
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    text-align: right;
    margin-bottom: 30px;
  }

  .toolbar button {
    background-color: #dddddd;
    padding: 6px 10px;
    border: 0;
    border-radius: 5px;
  }
</style>
