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

AFRAME.registerComponent("controlled-face-tracker", {
  schema: {
    rig: {type: "selector", default: ".rig" },
    camera: {type: "selector", default: ".rig > .camera" },
    avatar: {type: "selector", default: "#avatar" },
    currentFace: {type: "int", default: 0 }
  },

  init: function () {
    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
    
    
    
  },

  update: function(t,dt){
    this.avatar=this.data.avatar;
    this.authoritativeFaces=this.el.sceneEl.querySelectorAll("[main-face]");
    this.rig=this.data.rig;
    this.camera=this.data.camera;
    this.el.currentFace=this.data.currentFace;
  },

  teleport2: function (t,dt){
    [this.rig.object3D.position,this.rig.object3D.rotation, this.el.currentFace]=faceTransitionFuction(this.rig.object3D.position,this.rig.object3D.rotation,this.el.currentFace);

  },
  teleport: function (t,dt){
    let position = this.rig.object3D.position;
    let rotation = this.rig.object3D.rotation;

    const newPosition = new THREE.Vector3();
    newPosition.copy(position);
    const newRotation = new THREE.Euler();
    newRotation.copy(rotation);
    let newCurrentFace=this.el.currentFace;

    
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
  },
  
  tick: function (t, dt) {
    this.teleport(t,dt);

    this.el.object3D.position.copy(this.authoritativeFaces[this.el.currentFace].object3D.position);
    this.el.object3D.rotation.copy(this.authoritativeFaces[this.el.currentFace].object3D.rotation);
        


  
    
    this.avatar.object3D.position.copy(this.camera.object3D.position);
    this.avatar.object3D.position.add(this.rig.object3D.position);
    
    this.avatar.object3D.quaternion.copy(this.camera.object3D.quaternion);
    this.avatar.object3D.quaternion.multiply(this.rig.object3D.quaternion);

    this.avatar.currentFace=this.el.currentFace;
    // DEBUG
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
