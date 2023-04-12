AFRAME.registerComponent("controlled-position-sync", {
  // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema
  // https://aframe.io/docs/1.4.0/core/component.html#schema
  schema: {
    controlledElement: { type: "selector", default: null },
  },

  init: function () {
    this.controlledElement = this.data.controlledElement;
    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
    
  },

  tick: function (t, dt) {
    this.syncPosition(t,dt);
    // DEBUG
    // this.throttledDebug([controlledPosition]);
  },

  
  syncPosition: function (t,dt){
    let position = this.el.object3D.position;
    let rotation = this.el.object3D.rotation;
    let controlledPosition=this.controlledElement.object3D.position;
    controlledPosition.x=position.x;
    controlledPosition.y=position.y;
    controlledPosition.z=position.z;
  },


  /**
   * This is a debugging function
   * It is NOT executed automatically
   * All it does is console.log each element of the array given to it as input
   * If `what` is not an array just console.log `what`
   * @param {Array<any>} what - what to print to the console log
   * @returns {undefined}
   */
  debug: function (what) {
    if (!Array.isArray(what)) {
      console.log(what);
    } else {
      for (msg of what) {
        console.log(msg);
      }
    }
  },
});
