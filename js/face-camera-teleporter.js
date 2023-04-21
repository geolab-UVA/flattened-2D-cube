/*
        Faces of the cube
        ```
        *********  *********  *********  *********
        *********  TOP(2)     *********  *********
        LEFT(3)    FRONT(0)   RIGHT(1)   BACK(5)
        *********  BOTTOM(4)  *********  *********
        *********  *********  *********  *********
        ``` 
*/

AFRAME.registerComponent("face-camera-teleporter", {
  dependencies: ["current-face"],
  schema: {
    camera: { type: "selector", default: ":scope > .camera" },
    faceArranger: {type: "selector", default: "a-entity[face-arranger]"}
  },

  init: function () { 

    
    if (this.el.getAttribute("debug")) {
      console.log("1", this.name,"on", this.el);
      console.log("faceArranger:", this.data.faceArranger )
    }
    this.tlf=newThrottledLogFunction(500);

  },

  update: function (olddata) { },

  teleport: function (t, dt) {
    [this.el.currentFace, this.el.object3D.position, this.el.object3D.rotation]
      =
      faceTransitionFuction(this.el.currentFace,this.el.object3D.position, this.el.object3D.rotation);
    this.data.faceArranger.currentCenterFace=this.el.currentFace;
  },

  tick: function (t, dt) {
    this.teleport(t, dt);
    this.tlf([this.el.currentFace,this.el.object3D.position]);
  }

});
