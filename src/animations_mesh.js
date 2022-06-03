/**
 * These functions are being called by the Mesh component when starting animation
 * via componentReference.startAni() or when prop 'aniauto' is provided (true)
 */
 export const rotateCube = (obj) => {
    let rAF = 0;
    let doRotate = false;
  
    function onStart() {
      startRotating();
    }
  
    function startRotating() {
      doRotate = true;
      rAF = requestAnimationFrame(rotate);
    }
  
    function rotate() {
      if (doRotate) {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
        obj.rotation.z += 0.01;
        rAF = requestAnimationFrame(rotate);
      }
    }
  
    function onDestroy() {
      doRotate = false;
      cancelAnimationFrame(rAF);
    }
  
    return {
      onStart: onStart,
      onDestroy: onDestroy,
    };
  };
  
  export const rotateCubeZ = (obj) => {
    let rAF = 0;
    let doRotate = false;
  
    function onStart() {
      startRotating();
    }
  
    function startRotating() {
      doRotate = true;
      rAF = requestAnimationFrame(rotate);
    }
  
    function rotate() {
      if (doRotate) {
        obj.rotation.z += 0.05;
        rAF = requestAnimationFrame(rotate);
      }
    }
  
    function onDestroy() {
      doRotate = false;
      cancelAnimationFrame(rAF);
    }
  
    return {
      onStart: onStart,
      onDestroy: onDestroy,
    };
  };
  
  export const rotateCubeFaster = (obj) => {
    let rAF = 0;
    let doRotate = false;
  
    function onStart() {
      startRotating();
    }
  
    function startRotating() {
      doRotate = true;
      rAF = requestAnimationFrame(rotate);
    }
  
    function rotate() {
      if (doRotate) {
        obj.rotation.x += 0.05;
        obj.rotation.y += 0.05;
        obj.rotation.z += 0.05;
        rAF = requestAnimationFrame(rotate);
      }
    }
  
    function onDestroy() {
      doRotate = false;
      cancelAnimationFrame(rAF);
    }
  
    return {
      onStart: onStart,
      onDestroy: onDestroy,
    };
  };