AFRAME.registerComponent("view-clip", {
  schema: {
    rig: { type: "selector", default: "#rig" },
    camera: { type: "selector", default: "#camera" },
    from: { type: "int", default: 0 } // Counterclockwise starting from east
  },

  init: function () {
    //  Enable clipping
    this.el.sceneEl.renderer.localClippingEnabled = true

    this._cameraPos = new THREE.Vector3; // Vector for camera position
    this._B = new THREE.Vector3; // Vectors for the other 2 points
    this._C = new THREE.Vector3;
    this.debug = newThrottledLogFunction(1000);
  },

  update: function (oldData) {
    this.localClippingPlanes = [];
    this.clippingVertexPairs = [];
    let clippingPlaneEntities = this.el.querySelectorAll(":scope > [clipping-plane]");
    for (el of clippingPlaneEntities) { el.remove(); }
    clippingPlaneEntities = [];


    clippingPlaneEntities[0] = document.createElement('a-entity');
    clippingPlaneEntities[0].setAttribute("clipping-plane");
    clippingPlaneEntities[0].appendChild(document.createElement('a-entity'));
    clippingPlaneEntities[0].appendChild(document.createElement('a-entity'));

    clippingPlaneEntities[1] = document.createElement('a-entity');
    clippingPlaneEntities[1].setAttribute("clipping-plane");
    clippingPlaneEntities[1].appendChild(document.createElement('a-entity'));
    clippingPlaneEntities[1].appendChild(document.createElement('a-entity'));

    switch (this.data.from) {
      case 1:
        clippingPlaneEntities[0].children[0].setAttribute("position", "5 0 5");
        clippingPlaneEntities[0].children[1].setAttribute("position", "5 10 5");
        clippingPlaneEntities[1].children[0].setAttribute("position", "5 10 -5");
        clippingPlaneEntities[1].children[1].setAttribute("position", "5 0 -5");
        break;
        case 2:
        clippingPlaneEntities[0].children[0].setAttribute("position", "5 0 -5");
        clippingPlaneEntities[0].children[1].setAttribute("position", "5 10 -5");
        clippingPlaneEntities[1].children[0].setAttribute("position", "-5 10 -5");
        clippingPlaneEntities[1].children[1].setAttribute("position", "-5 0 -5");
        break;
        case 3:
        clippingPlaneEntities[0].children[0].setAttribute("position", "-5 0 -5");
        clippingPlaneEntities[0].children[1].setAttribute("position", "-5 10 -5");
        clippingPlaneEntities[1].children[0].setAttribute("position", "-5 10 5");
        clippingPlaneEntities[1].children[1].setAttribute("position", "-5 0 5");
        break;
      case 4:
        clippingPlaneEntities[0].children[0].setAttribute("position", "-5 0 5");
        clippingPlaneEntities[0].children[1].setAttribute("position", "-5 10 5");
        clippingPlaneEntities[1].children[0].setAttribute("position", "5 10 5");
        clippingPlaneEntities[1].children[1].setAttribute("position", "5 0 5");
        break;
    }

    this.el.appendChild(clippingPlaneEntities[0]);
    this.el.appendChild(clippingPlaneEntities[1]);

    clippingPlaneEntities[0].flushToDOM();
    clippingPlaneEntities[1].flushToDOM();
    clippingPlaneEntities[0].children[0].flushToDOM();
    clippingPlaneEntities[0].children[1].flushToDOM();
    clippingPlaneEntities[1].children[0].flushToDOM();
    clippingPlaneEntities[1].children[1].flushToDOM();





    for (el of clippingPlaneEntities) {
      const children = el.children;

      const A = children[0].object3D;
      const B = children[1].object3D;
      this.clippingVertexPairs.push([A, B]);
      this.localClippingPlanes.push(new THREE.Plane);
    }


    /*
    if (this.el.getAttribute("debug")) {
      console.log("1", this.name,"on", this.el);
      console.log("this.el.InheritedClippingPlanes = ", this.el.InheritedClippingPlanes);
      console.log("this.localClippingPlanes = ", this.localClippingPlanes);
    }*/



    // Update inherited clipping on this element and thus, recursively, on all its childer
    this.el.setAttribute("view-clip-inherited", true);
    this.el.components["view-clip-inherited"].update();

  },

  tick: function (t, dt) {
    this.data.camera.object3D.getWorldPosition(this._cameraPos);
    for (planeNum = 0; planeNum < this.localClippingPlanes.length; planeNum++) {
      this.clippingVertexPairs[planeNum][0].getWorldPosition(this._B);
      this.clippingVertexPairs[planeNum][1].getWorldPosition(this._C);
      this.localClippingPlanes[planeNum].setFromCoplanarPoints(this._cameraPos, this._B, this._C);
    }
  }
}
);

AFRAME.registerComponent("view-clip-inherited", {
  init: function () {
    this.debug = newThrottledLogFunction(1000);
  },

  update: function (oldData) {

    this.computeClippingPlanes();
    this.registerClippingWithMesh();

    if (this.el.getAttribute("debug")) {
      console.log("1", this.name, "on", this.el);
      console.log("this.clippingPlanes = ", this.clippingPlanes);
    }

    this.addComponentToChildren();

  },

  computeClippingPlanes: function () {
    this.clippingPlanes = [];

    let el = this.el;

    for (el = this.el; el != null; el = el.parentElement) {

      if (el.components != undefined && el.components["view-clip"] != undefined) {
        this.clippingPlanes.push(...el.components["view-clip"].localClippingPlanes);
      }
    }

  },

  addComponentToChildren: function () {
    let children = this.el.querySelectorAll("a-entity");

    for (child of children) {
      child.setAttribute("view-clip-inherited", true)
      child.components["view-clip-inherited"].update();
    }
  }
  ,

  registerClippingWithMesh: function () {

    const mesh = this.el.getObject3D("mesh");


    let material = null;
    if (mesh != null) {
      material = mesh.material;
    }


    if (material != null && this.clippingPlanes != null) {
      material.clippingPlanes = this.clippingPlanes;
    }

  }
  ,
}
);
