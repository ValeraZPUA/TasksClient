import { mapActions, mapState } from 'vuex'
import { DELETE_TASK } from '../../../constants'

export default {
  name: 'ModalWindowDel',
  props: {
    current: Object
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      users: state => state.taskMod.users,
      isFetching: state => state.taskMod.isFetching,
      error: state => state.taskMod.error
    })
  },
  methods: {
    deleteTask () {
      this[DELETE_TASK](this.current._id)
    },
    ...mapActions([DELETE_TASK])
  }
}
