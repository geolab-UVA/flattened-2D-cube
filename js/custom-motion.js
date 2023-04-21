AFRAME.registerComponent("custom-motion", {
    schema:
    {
        velocity: { type: "vec3", default: { x: 0, y: 0, z: 0 } }
    },
    init: function () { this.currentVelocity = new THREE.Vector3(); },
    tick: function (t, dt) {
        this.currentVelocity.x = this.data.velocity.x;
        this.currentVelocity.y = this.data.velocity.y;
        this.currentVelocity.z = this.data.velocity.z;
        this.currentVelocity.applyEuler(this.el.object3D.rotation);
        this.el.object3D.position.add(this.currentVelocity);
        
    }
})