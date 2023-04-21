AFRAME.registerComponent("face-sync", {
  // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema
  // https://aframe.io/docs/1.4.0/core/component.html#schema
  
  schema: {
    controlledElement: { type: "selector", default: null },
    currentFace: { type: "int", default: 0 }
  },
  dependencies: ['current-face'],

  init: function () {
    this.faces = this.el.sceneEl.querySelectorAll("[face]");
    this.elToClone = this.el.querySelector("[face-sync-object]");
    this.mainElement = this.el;

    this.controlledElements = [];

    for (face of this.faces) {
      let elClone = this.elToClone.cloneNode(true);
      face.appendChild(elClone);
      elClone.setAttribute("current-face","currentFace: "+face.face);
      this.controlledElements.push(elClone);
    }

  },

  update: function (t, dt) { this.el.currentFace = this.data.currentFace; },

  tick: function (t, dt) {
    for (el of this.controlledElements) {
      el.object3D.position.copy(this.el.object3D.position);
      el.object3D.rotation.copy(this.el.object3D.rotation)
      el.object3D.visible = (el.currentFace == this.el.currentFace);
    }
  },
});
