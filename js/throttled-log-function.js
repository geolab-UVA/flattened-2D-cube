function newThrottledLogFunction(dt) {
    let previousT = performance.now() - dt - 1;
    return ((what) => {
        if (performance.now() - previousT > dt) {

            if (!Array.isArray(what)) { console.log(what); }
            else {
                for (msg of what) { console.log(msg); }
            }

            previousT = performance.now();

        }
    })
}