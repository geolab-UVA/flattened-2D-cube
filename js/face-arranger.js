
AFRAME.registerComponent("face-arrangement", {
    schema: {
        centerFace: { type: "int", default: 0 }
    },

    init: function () {
        this.faceArranger = this.el.sceneEl.querySelector("[face-arranger]");
        this.el.setAttribute("visible", "true");
        this.el.flushToDOM();
        
        // DEBUG
        // console.log("face-arrangement of ");
        // console.log(this.el);
        // console.log("Arranger is ");
        // console.log(this.faceArranger.currentFace);
    },
    tick: function (t, dt) {
        this.el.setAttribute("visible", (this.data.centerFace == this.faceArranger.currentCenterFace));
    }
});


AFRAME.registerComponent("face-arranger", {
    schema: {
        currentCenterFace: { type: "int", default: 0 }
    },
    init: function () {
        Object.defineProperty(this.el, "currentCenterFace", {
            get() {
                return this.components["face-arranger"].data.currentCenterFace
            },
            set(currentCenterFace) {
                this.components["face-arranger"].data.currentCenterFace = currentCenterFace;
                return this.components["face-arranger"].data.currentCenterFace
            }
        });

    }
});
