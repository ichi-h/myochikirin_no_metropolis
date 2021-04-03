export default {
  data() {
    return {
      appRef: undefined
    }
  },
  methods: {
    setRef: function(ref) {
      this.appRef = ref
    },
    getRef: function() {
      return this.appRef
    }
  }
}