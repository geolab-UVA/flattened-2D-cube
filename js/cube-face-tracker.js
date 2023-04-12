AFRAME.registerComponent("cube-face-tracker", {  
  // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema
  // https://aframe.io/docs/1.4.0/core/component.html#schema
  schema: {
    currentFace: { type: "int", default: 0 },
  },

init: function () {
    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
    
  },
  
  tick: function (t, dt) {
    let position = this.el.object3D.position;
    let rotation = this.el.object3D.rotation;

  // Teleport function
    switch (true) {
      case position.z<-5:
        position.x+=-position.x;
        position.z=position.z+10;
        break;      
    }

    // DEBUG
    // this.throttledDebug(["x = " + x, "z = " + z, "currentFace = " + this.currentFace]);
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
