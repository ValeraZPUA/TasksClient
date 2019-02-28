import { mapState, mapActions } from 'vuex'
import { NEW_TASK } from '../../../constants'

export default {
  name: 'ModalWindow',
  props: {
    current: Object
  },
  data () {
    return {
      countBox: 1,
      startTime: [],
      endTime: [],
      subTasks: [],
      task: '',
      request: {},
      selectedStartHour: '',
      selectedEndHour: ''
    }
  },
  computed: {
    ...mapState({
      tasks: state => state.taskMod.tasks,
      isFetching: state => state.taskMod.isFetching,
      error: state => state.taskMod.error
    })
  },
  methods: {
    add () {
      const a = document.getElementById('response')
      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('placeholder', 'Enter subtask')
      input.setAttribute('id', 'id' + this.countBox)
      input.setAttribute('class', 'txtfld')
      a.appendChild(input)
      this.countBox++
    },
    del () {
      if (this.countBox > 1) {
        this.countBox--
        const a = document.getElementById('response')
        const input = document.getElementById('id' + this.countBox)
        a.removeChild(input)
      }
    },
    create () {
      this.task = this.$refs.task.value
      this.startTime.push(this.$refs.startHoursTime.value)
      this.startTime.push(this.$refs.startMinutesTime.value)
      this.endTime.push(this.$refs.endHoursTime.value)
      this.endTime.push(this.$refs.endMinutesTime.value)
      /**
       * check on empty fields
       * and
       * check on start and end minutes in same hour
       */
      if ((this.task !== '' && this.$refs.startHoursTime.value !== '' && this.$refs.startMinutesTime.value !== '' && this.$refs.endHoursTime.value !== '' && this.$refs.endMinutesTime.value !== '') &&
        ((this.$refs.startHoursTime.value === this.$refs.endHoursTime.value && this.$refs.endMinutesTime.value > this.$refs.startMinutesTime.value) ||
          this.$refs.startHoursTime.value !== this.$refs.endHoursTime.value)) {
        const sub = document.getElementsByClassName('txtfld')
        for (let i = 0; i < sub.length; i++) {
          if (sub[i].value !== '') {
            this.subTasks.push(sub[i].value)
          }
        }
        this.request.startTime = this.startTime
        this.request.endTime = this.endTime
        this.request.task = this.task
        this.request.subtasks = this.subTasks
        this[NEW_TASK](this.request)
        this.$emit('close')
      } else {
        this.startTime = []
        this.endTime = []
        this.task = []
        this.subTasks = []
        alert('Enter task or correct time')
      }
    },
    handleStartHour () {
      this.selectedStartHour = parseInt(this.$refs.startHoursTime.value)

      const hoursArray = document.getElementsByClassName('endHour')

      for (let i = 0; i < hoursArray.length; i++) {
        const element = document.getElementById('endHour' + i)
        element.removeAttribute('hidden')
      }

      for (let i = 0; i < hoursArray.length; i++) {
        const element = document.getElementById('endHour' + i)
        if (element.value < this.selectedStartHour) {
          element.setAttribute('hidden', 'hidden')
        }
      }
    },
    handleEndHour () {
      this.selectedEndHour = parseInt(this.$refs.endHoursTime.value)

      const hoursArray = document.getElementsByClassName('startHour')

      for (let i = 0; i < hoursArray.length - 1; i++) {
        const element = document.getElementById('startHour' + i)
        element.removeAttribute('hidden')
      }

      for (let i = 0; i < hoursArray.length; i++) {
        const element = document.getElementById('startHour' + i)
        if (element.value > this.selectedEndHour) {
          element.setAttribute('hidden', 'hidden')
        }
      }
    },
    ...mapActions([NEW_TASK])
  }
}
