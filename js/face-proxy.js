/** 
 * * The face-proxy and proxy components
 * 
 * The face-proxy component clones the target face ("face" attribute), sets its proxy master, and makes it a proxy
 * 
 * * The proxy component clones all children and constantly updates their position/rotation
 *
 * * TODO
 *
 * - Make the proxy component clone new children on child-attached
 **/
 




AFRAME.registerComponent("face-proxy", {
    schema: {
        face: { type: "selector" }
    },

    init: function () {
        let clonedNode = this.data.face.cloneNode();
        clonedNode.proxyMaster = this.data.face;
        clonedNode.setAttribute("proxy", true);
        clonedNode.removeAttribute("id");
        this.el.appendChild(clonedNode);
    },

});

AFRAME.registerComponent("proxy", {
    init: function () {

        // DEBUG
        // console.log("Proxying: ");
        // console.log(this.el.proxyMaster);
        

        let children = this.el.proxyMaster.getChildren();
        for (el of children) {
            // DEBUG
            // console.log("Child:");
            // console.log(el);

            let clonedNode = el.cloneNode();
            clonedNode.proxyMaster = el;
            clonedNode.setAttribute("proxy", true);
            this.el.appendChild(clonedNode);
    

        }

    },

    tick: function (t, dt) {
        this.el.object3D.position.copy(this.el.proxyMaster.object3D.position);
        this.el.object3D.rotation.copy(this.el.proxyMaster.object3D.rotation);
        }
});
