import { mapState, mapActions } from 'vuex'
import { TASKS } from '../../../constants'
import TaskItem from '../../components/TaskItem/TaskItem.vue'
import ModalWindow from '../../components/ModalWindow/ModalWindow.vue'

export default {
  name: 'Users',
  components: {
    TaskItem,
    ModalWindow
  },
  data () {
    return {
      showModal: false
    }
  },
  created () {
    this[TASKS]()
  },
  computed: {
    ...mapState({
      tasks: state => state.taskMod.tasks,
      isFetching: state => state.taskMod.isFetching,
      error: state => state.taskMod.error
    })
  },
  methods: {
    ...mapActions([TASKS])
  }
}
