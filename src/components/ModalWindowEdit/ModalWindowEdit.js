import { mapState, mapActions } from 'vuex'
import { UPDATE_TASK } from '../../../constants'

export default {
  name: 'ModalWindowEdit',
  props: {
    current: Object
  },
  created () {
    if (this.current.startTime[1].toString().length === 1) {
      this.startMinutes = '0' + this.current.startTime[1]
    } else {
      this.startMinutes = this.current.startTime[1]
    }
    if (this.current.endTime[1].toString().length === 1) {
      this.endMinutes = '0' + this.current.endTime[1]
    } else {
      this.endMinutes = this.current.endTime[1]
    }
  },
  data () {
    return {
      countBox: 1,
      subtasks: this.current.subtasks,
      startTime: [],
      endTime: [],
      isEdited: false,
      updatedSubTasks: {},
      request: {},
      startHour: '',
      startMinutes: '',
      endHour: '',
      endMinutes: '',
      tempSubtasksArray: [],
      selectedStartHour: '',
      selectedEndHour: '',
      selectedStartMinutes: '',
      selectedEndMinutes: ''
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
    id () {
      const temp = this.countBox
      this.countBox++
      return temp
    },
    edit () {
      this.isEdited = true
      const a = document.getElementsByClassName('disabled')
      for (let i = 0; i < a.length; i++) {
        a[i].removeAttribute('disabled')
      }
    },
    update () {
      if (this.isEdited === true) {
        this.startTime.push(this.$refs.startHoursTime.value)
        this.startTime.push(this.$refs.startMinutesTime.value)
        this.endTime.push(this.$refs.endHoursTime.value)
        this.endTime.push(this.$refs.endMinutesTime.value)

        if (((this.$refs.startHoursTime.value === this.$refs.endHoursTime.value && this.$refs.endMinutesTime.value > this.$refs.startMinutesTime.value) ||
          this.$refs.startHoursTime.value !== this.$refs.endHoursTime.value) &&
          parseInt(this.$refs.startHoursTime.value) < parseInt(this.$refs.endHoursTime.value)) {
          const subtasksElements = document.getElementsByClassName('subtasksInput')
          for (let i = 0; i < subtasksElements.length; i++) {
            if (subtasksElements[i].value !== '') {
              this.tempSubtasksArray.push(subtasksElements[i].value)
            }
          }

          this.request.startTime = this.startTime
          this.request.endTime = this.endTime
          this.updatedSubTasks.subtasks = this.tempSubtasksArray
          this.request.subtasks = this.updatedSubTasks.subtasks
          this.request.id = this.current._id
          this[UPDATE_TASK](this.request)
          this.$emit('close')
        } else {
          this.startTime = []
          this.endTime = []
          alert('Enter correct data')
        }
      } else {
        this.$emit('close')
      }
    },
    add () {
      const a = document.getElementById('response')
      const input = document.createElement('input')

      input.setAttribute('type', 'text')
      input.setAttribute('placeholder', 'Enter subtask')
      input.setAttribute('id', 'id' + this.countBox)
      input.setAttribute('class', 'subtasksInput')

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
    ...mapActions([UPDATE_TASK])
  }
}
