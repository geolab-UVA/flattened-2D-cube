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





AFRAME.registerComponent("face-recurse", {
    schema: {
        depth: { type: "int", default: 1 },
        faceArranger: { type: "selector", default: "[face-arranger]" },
        faces: { type: "selectorAll", default: "[face-arranger]>a-entity[face-arrangement]" }
    },
    _getFaceChildren: function (face) {
        return face.querySelectorAll(":scope > a-entity[face-proxy]")
    },
    init: function () {
        if (this.data.depth>0){
        let proxiedFace = this.el.components["face-proxy"].data.face.id;
        let proxiedFaceNum = parseInt(proxiedFace.match(/face-(?<faceNum>[0-9]*)/).groups["faceNum"]);
        let fromDirection = this.el.components["view-clip"].data.from;
        //console.log(proxiedFaceNum, fromDirection);   
        let children = this._getFaceChildren(this.data.faces[proxiedFaceNum]);
        //console.log(children);
        for (child of children) {
            let badChild = false;
            let position = child.components["position"].data;
            console.log("fromDirection", fromDirection, "position:", position);
            switch (fromDirection) {
                case 1:
                    badChild = (position.x == 10 && position.z == 0);
                    break;
                case 2:
                    badChild = (position.x == 0 && position.z == -10);
                    break;
                case 3:
                    badChild = (position.x == -10 && position.z == 0);
                    break;
                case 4:
                    badChild = (position.x == 0 && position.z == 10);
                    break;
            }
            console.log(child, badChild)
            if (!badChild) {
                let newChild = child.cloneNode();
                newChild.setAttribute("face-recurse","depth: "+(this.data.depth-1));
                this.el.appendChild(newChild);
              }
        }}
    },

});
