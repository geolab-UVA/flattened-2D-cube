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

AFRAME.registerComponent("face-tracker", {
  schema: {
    currentFace: {type: "int", default: 0 }
  },

  init: function () {
    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
  },

  update: function(t,dt){
    this.el.currentFace=this.data.currentFace;
  },
  
  tick: function (t, dt) {
    let position = this.el.object3D.position;
    let rotation = this.el.object3D.rotation;

    // Teleport function
    switch (this.el.currentFace) {
      case 0:
        switch (true) {
          case position.x > 5:
            [position.x, position.z] = [position.x - 10, position.z];
            this.el.currentFace = 1;
            break;
          case position.z < -5:
            [position.x, position.z] = [position.x, position.z + 10];
            this.el.currentFace = 2;
            break;
          case position.x < -5:
            [position.x, position.z] = [position.x + 10, position.z];
            this.el.currentFace = 3;
            break;
          case position.z > 5:
            [position.x, position.z] = [position.x, position.z - 10];
            this.el.currentFace = 4;
            break;
        }
        break;
      case 1:
        switch (true) {
          case position.x > 5:
            [position.x, position.z] = [position.x - 10, position.z];
            this.el.currentFace = 5;
            break;
          case position.z < -5:
            [position.x, position.z] = [10 + position.z, -position.x];
            rotation.y = rotation.y + Math.PI / 2;
            this.el.currentFace = 2;
            break;
          case position.x < -5:
            [position.x, position.z] = [position.x + 10, position.z];
            this.el.currentFace = 0;
            break;
          case position.z > 5:
            [position.x, position.z] = [10 - position.z, position.x];
            rotation.y = rotation.y - Math.PI / 2;
            this.el.currentFace = 4;
            break;
        }
        break;
      case 2:
        switch (true) {
          case position.x > 5:
            [position.x, position.z] = [-position.z, position.x - 10];
            rotation.y = rotation.y - Math.PI / 2;
            this.el.currentFace = 1;
            break;
          case position.z < -5:
            [position.x, position.z] = [-position.x, -10 - position.z];
            rotation.y = rotation.y + Math.PI;
            this.el.currentFace = 5;
            break;
          case position.x < -5:
            [position.x, position.z] = [position.z, -position.x - 10];
            rotation.y = rotation.y + Math.PI / 2;
            this.el.currentFace = 3;
            break;
          case position.z > 5:
            [position.x, position.z] = [position.x, position.z - 10];
            this.el.currentFace = 0;
            break;
        }
        break;
      case 3:
        switch (true) {
          case position.x > 5:
            [position.x, position.z] = [position.x - 10, position.z];
            this.el.currentFace = 0;
            break;
          case position.z < -5:
            [position.x, position.z] = [-position.z - 10, position.x];
            rotation.y = rotation.y - Math.PI / 2;
            this.el.currentFace = 2;
            break;
          case position.x < -5:
            [position.x, position.z] = [position.x + 10, position.z];
            this.el.currentFace = 5;
            break;
          case position.z > 5:
            [position.x, position.z] = [position.z - 10, -position.x];
            rotation.y = rotation.y + Math.PI / 2;
            this.el.currentFace = 4;
            break;
        }
        break;
      case 4:
        switch (true) {
          case position.x > 5:
            [position.x, position.z] = [position.z, -position.x + 10];
            rotation.y = rotation.y + Math.PI / 2;
            this.el.currentFace = 1;
            break;
          case position.z < -5:
            [position.x, position.z] = [position.x, position.z + 10];
            this.el.currentFace = 0;
            break;
          case position.x < -5:
            [position.x, position.z] = [-position.z, position.x + 10];
            rotation.y = rotation.y - Math.PI / 2;
            this.el.currentFace = 3;
            break;
          case position.z > 5:
            [position.x, position.z] = [-position.x, -position.z + 10];
            rotation.y = rotation.y + Math.PI;
            this.el.currentFace = 5;
            break;
        }
        break;
      case 5:
        switch (true) {
          case position.x > 5:
            [position.x, position.z] = [position.x - 10, position.z];
            this.el.currentFace = 3;
            break;
          case position.z < -5:
            [position.x, position.z] = [-position.x, -position.z - 10];
            rotation.y = rotation.y - Math.PI;
            this.el.currentFace = 2;
            break;
          case position.x < -5:
            [position.x, position.z] = [position.x + 10, position.z];
            this.el.currentFace = 1;
            break;
          case position.z > 5:
            [position.x, position.z] = [-position.x, -position.z + 10];
            rotation.y = rotation.y - Math.PI;
            this.el.currentFace = 4;
            break;
        }
        break;
    }
    // DEBUG
    // this.throttledDebug(this.el.currentFace);
    // this.throttledDebug(["x = " + x, "z = " + z, "currentFace = " + this.el.currentFace]);
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
