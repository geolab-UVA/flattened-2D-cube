AFRAME.registerComponent("cube-face-arranger", {
  // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema
  // https://aframe.io/docs/1.4.0/core/component.html#schema
  schema: {
    currentFace: { type: "int", default: 0 },
  },

  init: function () {
    // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html

    // Store references to the faces with id face_X (X from 0 to 5)
    this.faces = []; // This array (arrays are indexed from 0) will store the faces.
    for (const facePosition of [0, 1, 2, 3, 4, 5]) {
      this.faces[facePosition] = this.el.querySelector("#face_" + facePosition);
    }

    /* DEBUG */
    // console.log("faces = ");
    // console.log(this.faces);
  },

  update: function () {
    // Update the current face and rearrange the faces

    this.currentFace = this.data.currentFace;
    this.flushToDOM();
    this.arrangeFaces();
    // DEBUG:
    // console.log("Current face updated!");
    // console.log("currentFace = " + this.currentFace);
  },

  arrangeFaces: function () {
    switch (this.currentFace) {
      case 0:
        this.faces[0].object3D.position.x = 0;
        this.faces[0].object3D.position.z = 0;

        this.faces[1].object3D.position.x = 10;
        this.faces[1].object3D.position.z = 0;

        this.faces[2].object3D.position.x = 0;
        this.faces[2].object3D.position.z = -10;

        this.faces[3].object3D.position.x = -10;
        this.faces[3].object3D.position.z = 0;

        this.faces[4].object3D.position.x = 0;
        this.faces[4].object3D.position.z = 10;

        this.faces[5].object3D.position.x = 20;
        this.faces[5].object3D.position.z = 0;
        break;

      case 1:
        this.faces[0].object3D.position.x = -10;
        this.faces[0].object3D.position.z = 0;

        this.faces[1].object3D.position.x = 0;
        this.faces[1].object3D.position.z = 0;

        this.faces[2].object3D.position.x = 0;
        this.faces[2].object3D.position.z = -10;
        this.faces[2].object3D.rotation.y = Math.PI / -2;

        this.faces[3].object3D.position.x = 20;
        this.faces[3].object3D.position.z = 0;

        this.faces[4].object3D.position.x = 0;
        this.faces[4].object3D.position.z = 10;
        this.faces[4].object3D.rotation.y = Math.PI / 2;

        this.faces[5].object3D.position.x = 10;
        this.faces[5].object3D.position.z = 0;

        break;

      case 2:
        this.faces[0].object3D.position.x = 0;
        this.faces[0].object3D.position.z = 10;

        this.faces[1].object3D.position.x = 10;
        this.faces[1].object3D.position.z = 0;
        this.faces[1].object3D.rotation.y = Math.PI / 2;

        this.faces[2].object3D.position.x = 0;
        this.faces[2].object3D.position.z = 0;

        this.faces[3].object3D.position.x = -10;
        this.faces[3].object3D.position.z = 0;
        this.faces[3].object3D.rotation.y = Math.PI / -2;

        this.faces[4].object3D.position.x = 20;
        this.faces[4].object3D.position.z = 0;
        this.faces[4].object3D.rotation.y = Math.PI;

        this.faces[5].object3D.position.x = 0;
        this.faces[5].object3D.position.z = -10;
        this.faces[5].object3D.rotation.y = Math.PI;

        break;

      case 3:
        this.faces[0].object3D.position.x = 10;
        this.faces[0].object3D.position.z = 0;

        this.faces[1].object3D.position.x = 20;
        this.faces[1].object3D.position.z = 0;

        this.faces[2].object3D.position.x = 0;
        this.faces[2].object3D.position.z = -10;
        this.faces[2].object3D.rotation.y = Math.PI / 2;

        this.faces[3].object3D.position.x = 0;
        this.faces[3].object3D.position.z = 0;

        this.faces[4].object3D.position.x = 0;
        this.faces[4].object3D.position.z = 10;
        this.faces[4].object3D.rotation.y = Math.PI / -2;

        this.faces[5].object3D.position.x = -10;
        this.faces[5].object3D.position.z = 0;

        break;

      case 4:
        this.faces[0].object3D.position.x = 0;
        this.faces[0].object3D.position.z = -10;

        this.faces[1].object3D.position.x = 10;
        this.faces[1].object3D.position.z = 0;
        this.faces[1].object3D.rotation.y = Math.PI / -2;

        this.faces[2].object3D.position.x = 20;
        this.faces[2].object3D.position.z = 0;
        this.faces[2].object3D.rotation.y = Math.PI;

        this.faces[3].object3D.position.x = -10;
        this.faces[3].object3D.position.z = 0;
        this.faces[3].object3D.rotation.y = Math.PI / 2;

        this.faces[4].object3D.position.x = 0;
        this.faces[4].object3D.position.z = 0;

        this.faces[5].object3D.position.x = 0;
        this.faces[5].object3D.position.z = 10;
        this.faces[5].object3D.rotation.y = Math.PI;

        break;

      case 5:
        this.faces[0].object3D.position.x = 20;
        this.faces[0].object3D.position.z = 0;

        this.faces[1].object3D.position.x = -10;
        this.faces[1].object3D.position.z = 0;

        this.faces[2].object3D.position.x = 0;
        this.faces[2].object3D.position.z = -10;
        this.faces[2].object3D.rotation.y = Math.PI;

        this.faces[3].object3D.position.x = 10;
        this.faces[3].object3D.position.z = 0;

        this.faces[4].object3D.position.x = 0;
        this.faces[4].object3D.position.z = 10;
        this.faces[4].object3D.rotation.y = Math.PI;

        this.faces[5].object3D.position.x = 0;
        this.faces[5].object3D.position.z = 0;

        break;
    }
  },

  tick: function (t, dt) {},

  /**
   * This is a debugging function
   * It is NOT executed automatically
   * All it does is console.log each element of the array given to it as input
   * If `what` is not an array just console.log `what`
   * @param {Array<any>} what - what to print to the console log
   * @returns {undefined}
   */

  //test

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
