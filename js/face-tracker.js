// Tracks the current face in the variable this.el.currentFace and this.data.currentFace
// Teleports the object

AFRAME.registerComponent("current-face", {
  schema: {
    currentFace: { type: "int", default: 0 }
  },

  init: function () {

    Object.defineProperty(this.el, "currentFace", {
      get() { return this.components["current-face"].data.currentFace },
      set(currentFace) {
        this.components["current-face"].data.currentFace = currentFace;
        return this.components["current-face"].data.currentFace = currentFace
      }
    });

  },

  update: function (t, dt) { },
});

AFRAME.registerComponent("face-teleporter", {
  dependencies: ["current-face"],


tick: function (t, dt) { 
  [this.el.currentFace, this.el.object3D.position, this.el.object3D.rotation] =
  faceTransitionFuction(this.el.currentFace, this.el.object3D.position, this.el.object3D.rotation);
}})