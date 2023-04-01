# Arranging the faces of the unfolding of the cube through code

This is a starting point for arranging the faces of the cube's unfolding through code.

The start for the code is in [./js/cube-face-arranger.js](./js/cube-face-arranger.js).

Here are some things to know:


The standard unfolding of the cube is 


```
 *********  *********  *********  *********

*********  TOP(2)     *********  *********

LEFT(3)    FRONT(0)   RIGHT(1)   BACK(5)

*********  BOTTOM(4)  *********  *********
        
*********  *********  *********  *********
```

If we make the unfolding of the cube be centered at the face **RIGHT(1)** we would expect something like

```
*********  *********  *********  *********

*********  ?????(?)   *********  *********

FRONT(0)   RIGHT(1)   BACK(5)    LEFT(3)

*********  ??????(?)  *********  *********
        
*********  *********  *********  *********
```

Note that some faces should also be rotated. 

The desired "center" face is passed to the component by the parameter ```currentFace``` as in this line:

```
<a-entity id="cube-geometry" cube-face-arranger="currentFace: 0">
```

The entity **cube-geometry** contains as "children" all faces of the cube:

```
    <!-- FRONT(0) (green)-->
      <a-entity id="face_0" geometry="primitive: plane; width: 10; height: 10" material="color: green; side: double"
        rotation="90 0 0"></a-entity>

      <!-- RIGHT(1) (orange) -->
      <a-entity id="face_1" geometry="primitive: plane; width: 10; height: 10" material="color: orange; side: double"
        rotation="90 0 0"></a-entity>
```

However the positions of those children are not specified in the HTML. We want to assign them through the javascript code in [./js/cube-face-arranger.js](./js/cube-face-arranger.js).


## The component **cube-face-arranger.js**

Upon intialization ```cube-face-arranger``` stores the parameter passed to it as a member variable ```this.currentFace```. This happens in this line in the ```init``` code

```
    this.currentFace = this.data.currentFace;
```

The array ```this.faces``` stores references to the 6 faces of the cube. 

```
this.faces = []; // This array (arrays are indexed from 0) will store the faces. 
```

The function responsible for arranging the faces should be ```arrangeFaces```. Currently it is mainly empty

## Goals and steps

Write a function ```arrangeFaces``` that reads ```this.currentFace``` and based on its values sets the correct 
position and rotation of each face. 


### STEP 0
Comment understand what the meaning of the example code in the function ```arrangeFaces``` is. Then comment it out.
You can try modifying the value of currentFace in the line
```

    <a-entity id="cube-geometry" cube-face-arranger="currentFace: 0">

```
in the HTML to see the effect on the code


### STEP 1
Write a sequence of commands 
```
this.faces[0].object3D.position.x = 0;
this.faces[0].object3D.position.z = 0;
this.faces[1].object3D.position.x = 123;
this.faces[1].object3D.position.z = 456;
```
that correctly arranges the faces in the "standard" desposition centered at the face 0

### STEP 2

Write a ```switch``` statement that analyzes ```this.currentFace```. Move the code of STEP1 into the 
``` 
case 0:
// CODE HERE
break;
```

For cases 1 to 5 just run
```
console.log("NOT YET IMPLEMENTED")
```

### STEP 3

Add the code for cases 1 to 5 into the switch statement to arrange the faces. For now do not worry about rotation. Make sure to check your progress step by step. 


### STEP 4:

Go back to the HTML and add some sub-shapes to each face. This will allow you to track the rotation of the faces.

Make sure everything works

### STEP 5: 

add the code that controls rotation. 
