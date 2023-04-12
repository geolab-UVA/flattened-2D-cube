AFRAME.registerComponent("face-sync", {
  // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema
  // https://aframe.io/docs/1.4.0/core/component.html#schema
  schema: {
    controlledElement: { type: "selector", default: null },
    currentFace: {type: "string", default:"face_0" }
  },

  init: function () {
    this.faces=this.el.sceneEl.querySelectorAll(".face");
    this.currentFace=this.data.currentFace;
    this.elements=[];
    for (face of faces){
      let elClone=this.el.cloneNode(true);
      elClone.removeAttribute("face-sync")
      elClone.id=elClone.id+"--"+face.id;
      elClone.currentFace=face.id;
      face.appendChild(elClone);
      this.elements.push(elClone);
    }
  

    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
    
  },

  tick: function (t, dt) {
    let x=this.el.object3D.position.x;
    let y=this.el.object3D.position.y;
    let z=this.el.object3D.position.z;
    let Rx=this.el.object3D.rotation.x;
    let Ry=this.el.object3D.rotation.y;
    let Rz=this.el.object3D.rotation.z;
    for (el of this.elements){
       el.object3D.position.x=x;
       el.object3D.position.y=y;
       el.object3D.position.z=z;
       el.object3D.rotation.x=Rx;
       el.object3D.rotation.y=Ry;
       el.object3D.rotation.z=Rz;
       if (this.currentFace==el.currentFace){
        el.object3D.visible=true;
       } else {el.object3D.visible=false;}
    }
  },

  
  syncPosition: function (t,dt){
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
