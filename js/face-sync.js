AFRAME.registerComponent("face-sync", {
  // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema
  // https://aframe.io/docs/1.4.0/core/component.html#schema
  schema: {
    controlledElement: { type: "selector", default: null },
    currentFace: {type: "int", default: 0 }
  },

  init: function () {
    this.faces=this.el.sceneEl.querySelectorAll("[face]");
    this.elToClone=this.el.querySelector("[face-sync-target]");
    this.mainElement=this.el;

    this.controlledElements=[];

    for (face of faces){
      let elClone=this.elToClone.cloneNode(true);
      face.appendChild(elClone);
      this.controlledElements.push(elClone);
      elClone.currentFace=face.face;
    }
  

    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
    
  },

  update: function(t,dt){this.el.currentFace=this.data.currentFace;},

  tick: function (t, dt) {
    this.syncPositionVisibility(t,dt);
   
  },

  
  syncPositionVisibility: function (t,dt){
    let x=this.el.object3D.position.x;
    let y=this.el.object3D.position.y;
    let z=this.el.object3D.position.z;
    let Rx=this.el.object3D.rotation.x;
    let Ry=this.el.object3D.rotation.y;
    let Rz=this.el.object3D.rotation.z;

    for (el of this.controlledElements){
       el.object3D.position.x=x;
       el.object3D.position.y=y;
       el.object3D.position.z=z;
       el.object3D.rotation.x=Rx;
       el.object3D.rotation.y=Ry;
       el.object3D.rotation.z=Rz;
       if (this.el.currentFace==el.currentFace){
        el.object3D.visible=true;
       } else {el.object3D.visible=false;}
    }
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
