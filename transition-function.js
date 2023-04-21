/*  Faces of the cube
    *********  *********  *********  *********
    *********  TOP(2)     *********  *********
    LEFT(3)    FRONT(0)   RIGHT(1)   BACK(5)
    *********  BOTTOM(4)  *********  *********
    *********  *********  *********  *********
*/


faceTransitionFuction = function (currentFace, position, rotation) {
    let newCurrentFace = currentFace;

    // Teleport function
    switch (currentFace) {
        case 0:
            switch (true) {
                case position.x > 5:
                    newCurrentFace = 1;
                    [position.x, position.z] = [position.x - 10, position.z];
                    break;
                case position.z < -5:
                    newCurrentFace = 2;
                    [position.x, position.z] = [position.x, position.z + 10];
                    break;
                case position.x < -5:
                    newCurrentFace = 3;
                    [position.x, position.z] = [position.x + 10, position.z];
                    break;
                case position.z > 5:
                    newCurrentFace = 4;
                    [position.x, position.z] = [position.x, position.z - 10];
                    break;
            }
            break;
        case 1:
            switch (true) {
                case position.x > 5:
                    newCurrentFace = 5;
                    [position.x, position.z] = [position.x - 10, position.z];
                    break;
                case position.z < -5:
                    newCurrentFace = 2;
                    [position.x, position.z] = [10 + position.z, -position.x];
                    rotation.y = rotation.y + Math.PI / 2;
                    break;
                case position.x < -5:
                    newCurrentFace = 0;
                    [position.x, position.z] = [position.x + 10, position.z];
                    break;
                case position.z > 5:
                    newCurrentFace = 4;
                    [position.x, position.z] = [10 - position.z, position.x];
                    rotation.y = rotation.y - Math.PI / 2;

                    break;
            }
            break;
        case 2:
            switch (true) {
                case position.x > 5:
                    newCurrentFace = 1;
                    [position.x, position.z] = [-position.z, position.x - 10];
                    rotation.y = rotation.y - Math.PI / 2;
                    break;
                case position.z < -5:
                    newCurrentFace = 5;
                    [position.x, position.z] = [-position.x, -10 - position.z];
                    rotation.y = rotation.y + Math.PI;
                    break;
                case position.x < -5:
                    [position.x, position.z] = [position.z, -position.x - 10];
                    rotation.y = rotation.y + Math.PI / 2;
                    newCurrentFace = 3;
                    break;
                case position.z > 5:
                    [position.x, position.z] = [position.x, position.z - 10];
                    newCurrentFace = 0;
                    break;
            }
            break;
        case 3:
            switch (true) {
                case position.x > 5:
                    newCurrentFace = 0;
                    [position.x, position.z] = [position.x - 10, position.z];
                    break;
                case position.z < -5:
                    newCurrentFace = 2;
                    [position.x, position.z] = [-position.z - 10, position.x];
                    rotation.y = rotation.y - Math.PI / 2;
                    break;
                case position.x < -5:
                    newCurrentFace = 5;
                    [position.x, position.z] = [position.x + 10, position.z];
                    break;
                case position.z > 5:
                    newCurrentFace = 4;
                    [position.x, position.z] = [position.z - 10, -position.x];
                    rotation.y = rotation.y + Math.PI / 2;
                    break;
            }
            break;
        case 4:
            switch (true) {
                case position.x > 5:
                    newCurrentFace = 1;
                    [position.x, position.z] = [position.z, -position.x + 10];
                    rotation.y = rotation.y + Math.PI / 2;
                    break;
                case position.z < -5:
                    newCurrentFace = 0;
                    [position.x, position.z] = [position.x, position.z + 10];
                    break;
                case position.x < -5:
                    newCurrentFace = 3;
                    [position.x, position.z] = [-position.z, position.x + 10];
                    rotation.y = rotation.y - Math.PI / 2;
                    break;
                case position.z > 5:
                    newCurrentFace = 5;
                    [position.x, position.z] = [-position.x, -position.z + 10];
                    rotation.y = rotation.y + Math.PI;
                    break;
            }
            break;
        case 5:
            switch (true) {
                case position.x > 5:
                    newCurrentFace = 3;
                    [position.x, position.z] = [position.x - 10, position.z];
                    break;
                case position.z < -5:
                    newCurrentFace = 2;
                    [position.x, position.z] = [-position.x, -position.z - 10];
                    rotation.y = rotation.y - Math.PI;
                    break;
                case position.x < -5:
                    newCurrentFace = 1;
                    [position.x, position.z] = [position.x + 10, position.z];
                    break;
                case position.z > 5:
                    newCurrentFace = 4;
                    [position.x, position.z] = [-position.x, -position.z + 10];
                    rotation.y = rotation.y - Math.PI;
                    break;
            }
            break;
    }
    return [newCurrentFace,position, rotation]
};
