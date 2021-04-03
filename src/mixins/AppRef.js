export default {
  data() {
    return {
      appRef: Object
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