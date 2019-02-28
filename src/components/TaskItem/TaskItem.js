import ModalWindowEdit from '../ModalWindowEdit/ModalWindowEdit.vue'
import ModalWindowDel from '../ModalWindowDel/ModalWindowDel.vue'

export default {
  name: 'TaskItem',
  components: {
    ModalWindowEdit,
    ModalWindowDel
  },
  props: {
    current: Object
  },
  created () {
    if (this.current.startTime[1].toString().length === 1) {
      this.current.startTime[1] = '0' + this.current.startTime[1]
    }
    if (this.current.endTime[1].toString().length === 1) {
      this.current.endTime[1] = '0' + this.current.endTime[1]
    }
  },
  data () {
    return {
      showModal: false,
      showModalDel: false,
      startMinutes: '',
      endMinutes: ''
    }
  },
  computed: {
  },
  methods: {
  }
}
