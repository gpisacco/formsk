var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createBox = function (scene, name, dims) {
  const { width, height, depth } = dims
  const box = BABYLON.MeshBuilder.CreateBox(
    name,
    {
      width: width,
      height: height,
      depth: depth,
    },
    scene,
  )
  return box
}

var createCabinet = function (scene, name, dims, position) {
  var DEMO_SEPARATION = 50; // For illustration purposes only
  var DOOR_DEPTH = 15;
  var PLINTH_HEIGHT = 50;
  var PLINTH_OFFSET = 100;

  var cabinet = new BABYLON.AbstractMesh(name, scene);

  var plinth = createBox(scene, `${name}-plinth`, {
    width: dims.width,
    height: 100,
    depth: dims.depth - PLINTH_OFFSET
  });
  plinth.position = position.add(new BABYLON.Vector3(0, PLINTH_HEIGHT / 2 - DEMO_SEPARATION, - (PLINTH_OFFSET / 2)));
  plinth.parent = cabinet;

  var carcase = createBox(scene, `${name}-carcase`, dims);
  carcase.position = position.add(new BABYLON.Vector3(0, (dims.height  / 2) + PLINTH_HEIGHT, 0));
  carcase.parent = cabinet;

  var door = createBox(scene, `${name}-door`, {
    depth: DOOR_DEPTH,
    width: dims.width,
    height: dims.height
  });
  door.position = position.add(new BABYLON.Vector3(0, (dims.height  / 2) + PLINTH_HEIGHT, dims.depth / 2 + DOOR_DEPTH / 2 + DEMO_SEPARATION));
  door.parent = cabinet;

  return cabinet
}

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2000, new BABYLON.Vector3(0, 0, 500), scene);
  camera.attachControl(canvas, true);

  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

  // Example cabinet, 600mm wide
  var cabinet = createCabinet(scene, 'cab1', {
    height: 500,
    width: 600,
    depth: 500
  }, new BABYLON.Vector3(0, 0, 0))

  camera.target = new BABYLON.Vector3(0, 0, 0);

  return scene;
};

var scene = createScene();

engine.runRenderLoop(function () { 
  scene.render();
});

window.addEventListener("resize", function () { 
  engine.resize();
});
