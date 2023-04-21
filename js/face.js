/*
Component to define faces. 
*/

AFRAME.registerComponent("face", {
  schema: {
    face: { type: "int", default: 0 }, // The index of a face
    main: { type: "bool", default: false } // whether this is the "reference" face 
  },
  init: function(){
    Object.defineProperty(this.el, "face",{
      get(){ return this.components["face"].data.face},
      set(face){this.components["face"].data.face=face; return this.components["face"].data.face}
    });
  },
  update: function (t, dt) { }
});
