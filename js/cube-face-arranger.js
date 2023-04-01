AFRAME.registerComponent("cube-face-arranger", {
  // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema
  schema: {
    currentFace: { type: "int", default: 0 }
  },

  init: function () {
    // The init function gets executed each time an instance of the component is created
    console.log(
      "The component " + this.name + " is being initialized on the element "
    );
    console.log(this.el); // this.el is the <a-entity> this component is attached to
    console.log(" with data ");
    console.log(this.data);

    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);

    // Initialize the varaible `currentFace` that stores the current face, passed through the component attribute
    // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html
    // https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-properties-with-the-schema

    
    // Store references to the faces with id face_X (X from 0 to 5)

    this.faces = []; // This array (arrays are indexed from 0) will store the faces.

    // We recover the faces by looking at children nodes of thes element to which the component is attached to
    // and looking for the ones with id face_X (X from 0 to 5)
    // In HTML the #string selector selects the element with id attribute `string`

    for (const facePosition of [0, 1, 2, 3, 4, 5]) {
      this.faces[facePosition] = this.el.querySelector("#face_" + facePosition);
    }

    // For debugging purposes we print out the contents of the array we created
    console.log("faces = ");
    console.log(this.faces);

    
  },

update: function(){

  // Update the current face and rearrange the faces
  console.log("Current face updated!");
  this.currentFace = this.data.currentFace;
  console.log("currentFace = " + this.currentFace);
  this.flushToDOM();
  this.arrangeFaces(); 

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
        this.faces[2].object3D.rotation.y = Math.PI / (-2);

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
        this.faces[3].object3D.rotation.y = Math.PI / (-2);
  
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
          this.faces[4].object3D.rotation.y = Math.PI / (-2);
  
          this.faces[5].object3D.position.x = -10;
          this.faces[5].object3D.position.z = 0;

          break;

      case 4:
        this.faces[0].object3D.position.x = 0;
        this.faces[0].object3D.position.z = -10;

        this.faces[1].object3D.position.x = 10;
        this.faces[1].object3D.position.z = 0;
        this.faces[1].object3D.rotation.y = Math.PI / (-2);

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
  }
});
