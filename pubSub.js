let pubSub = {
  events: {},
  on: function(eventName, fn) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(fn)
  },
  off: function(eventName, fn) {
    if(this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(el => {
        el != fn
      })
    }
  },
  emit: function(eventName, data){
    if(this.events[eventName]) {
      this.events[eventName].forEach(fn => {
        fn(data)
      });
    }
  },
}
