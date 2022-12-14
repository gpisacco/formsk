var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createBox = function (scene, name, dims, color) {
  const { width, height, depth } = dims
  const box = BABYLON.MeshBuilder.CreateBox(
    name,
    {
      width: width,
      height: height,
      depth: depth,
      updatable: true
    },
    scene,
  )
  return box
}

var createCabinet = function (scene, name, dims, position) {
  var DEMO_SEPARATION = 2; // For illustration purposes only
  var DOOR_DEPTH = 15;
  var HANDLE_DEPTH = 15;

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

  var handle = createBox(scene, `${name}-handle`, {
    depth: HANDLE_DEPTH,
    width: dims.width/4,
    height: dims.height/16
  });
  var blackMaterial = new BABYLON.StandardMaterial("tankMaterial", scene);
  blackMaterial.diffuseColor = new BABYLON.Color3.Black;
  handle.material = blackMaterial;
  handle.position = position.add(new BABYLON.Vector3(0,dims.height, dims.depth / 2 + DOOR_DEPTH*2 + DEMO_SEPARATION));
  handle.parent = cabinet;

  return cabinet
}
var line2D = function(name, options, scene) {
	
  //Arrays for vertex positions and indices
  var positions = [];
  var indices = [];
      var normals = [];

      var width = options.width / 2 || 0.5;
      var path = options.path;
  var closed = options.closed || false;
  if(options.standardUV === undefined) {
    standardUV = true;
  }
  else {
    standardUV = options.standardUV;
  }

  var interiorIndex;
  
  //Arrays to hold wall corner data 
  var innerBaseCorners = [];
  var outerBaseCorners = [];
  
  var outerData = [];
      var innerData = [];
  var angle = 0;
  
  var nbPoints = path.length;
  var line = BABYLON.Vector3.Zero();
  var nextLine = BABYLON.Vector3.Zero();
  path[1].subtractToRef(path[0], line);

  if(nbPoints > 2 && closed) {	
    path[2].subtractToRef(path[1], nextLine);    
    for(var p = 0; p < nbPoints; p++) {    
      angle = Math.PI - Math.acos(BABYLON.Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));            
      direction = BABYLON.Vector3.Cross(line, nextLine).normalize().z;                
      lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
      line.normalize();
      innerData[(p + 1) % nbPoints] = path[(p + 1) % nbPoints].subtract(lineNormal.scale(width)).subtract(line.scale(direction * width/Math.tan(angle/2)));
      outerData[(p + 1) % nbPoints] = path[(p + 1) % nbPoints].add(lineNormal.scale(width)).add(line.scale(direction * width/Math.tan(angle/2)));        
      line = nextLine.clone();        
      path[(p + 3) % nbPoints].subtractToRef(path[(p + 2) % nbPoints], nextLine);    
    }
  }
  else {
    lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
    line.normalize();		
    innerData[0] = path[0].subtract(lineNormal.scale(width));
    outerData[0] = path[0].add(lineNormal.scale(width));
  
    for(var p = 0; p < nbPoints - 2; p++) {	
      path[p + 2].subtractToRef(path[p + 1], nextLine);
      angle = Math.PI - Math.acos(BABYLON.Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));			
      direction = BABYLON.Vector3.Cross(line, nextLine).normalize().z;			
      lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
      line.normalize();
      innerData[p + 1] = path[p + 1].subtract(lineNormal.scale(width)).subtract(line.scale(direction * width/Math.tan(angle/2)));
      outerData[p + 1] = path[p + 1].add(lineNormal.scale(width)).add(line.scale(direction * width/Math.tan(angle/2)));		
      line = nextLine.clone();			
    }
    if(nbPoints > 2) {
      path[nbPoints - 1].subtractToRef(path[nbPoints - 2], line);
      lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
      line.normalize();		
      innerData[nbPoints - 1] = path[nbPoints - 1].subtract(lineNormal.scale(width));
      outerData[nbPoints - 1] = path[nbPoints - 1].add(lineNormal.scale(width));
    }
    else{
      innerData[1] = path[1].subtract(lineNormal.scale(width));
      outerData[1] = path[1].add(lineNormal.scale(width));
    }
  }
   
  var maxX = Number.MIN_VALUE;
  var minX = Number.MAX_VALUE;
  var maxY = Number.MIN_VALUE;
  var minY = Number.MAX_VALUE;
  
  for(var p = 0; p < nbPoints; p++) {
    positions.push(innerData[p].x, innerData[p].y, innerData[p].z);
    maxX = Math.max(innerData[p].x, maxX);
    minX = Math.min(innerData[p].x, minX);
    maxY = Math.max(innerData[p].y, maxY);
    minY = Math.min(innerData[p].y, minY);
  }

  for(var p = 0; p < nbPoints; p++) {
    positions.push(outerData[p].x, outerData[p].y, outerData[p].z);
    maxX = Math.max(innerData[p].x, maxX);
    minX = Math.min(innerData[p].x, minX);
    maxY = Math.max(innerData[p].y, maxY);
    minY = Math.min(innerData[p].y, minY);
  }

      for(var i = 0; i < nbPoints - 1; i++) {
          indices.push(i, i + 1, nbPoints + i + 1);
          indices.push(i, nbPoints + i + 1, nbPoints + i)
      }
  
  if(nbPoints > 2 && closed) {
    indices.push(nbPoints - 1, 0, nbPoints);
          indices.push(nbPoints - 1, nbPoints, 2 * nbPoints - 1)
  }

  var normals = [];
      var uvs =[];

  if(standardUV) {
    for(var p = 0; p < positions.length; p += 3) {
      uvs.push((positions[p] - minX)/(maxX - minX), (positions[p + 1] - minY)/(maxY - minY))
    }
  }
  else {
    var flip = 0;
    var p1 = 0;
    var p2 = 0;
    var p3 = 0;
    var v0 = innerData[0];
    var v1 = innerData[1].subtract(v0);
    var v2 = outerData[0].subtract(v0);
    var v3 = outerData[1].subtract(v0);
    var axis = v1.clone();
    axis.normalize();

    p1 = BABYLON.Vector3.Dot(axis,v1);
    p2 = BABYLON.Vector3.Dot(axis,v2);
    p3 = BABYLON.Vector3.Dot(axis,v3);
    var minX = Math.min(0, p1, p2, p3);
    var maxX = Math.max(0, p1, p2, p3);
    
    uvs[2 * indices[0]] = -minX/(maxX - minX);
    uvs[2 * indices[0] + 1] = 1;
    uvs[2 * indices[5]] = (p2 - minX)/(maxX - minX);
    uvs[2 * indices[5] + 1] = 0;
    
    uvs[2 * indices[1]] = (p1 - minX)/(maxX - minX);
    uvs[2 * indices[1] + 1] = 1;
    uvs[2 * indices[4]] = (p3 - minX)/(maxX - minX);
    uvs[2 * indices[4] + 1] = 0;
  
    for(var i = 6; i < indices.length; i +=6) {
    
      flip = (flip + 1) % 2;
      v0 = innerData[0];
      v1 = innerData[1].subtract(v0);
      v2 = outerData[0].subtract(v0);
      v3 = outerData[1].subtract(v0);
      axis = v1.clone();
      axis.normalize();

      p1 = BABYLON.Vector3.Dot(axis,v1);
      p2 = BABYLON.Vector3.Dot(axis,v2);
      p3 = BABYLON.Vector3.Dot(axis,v3);
      var minX = Math.min(0, p1, p2, p3);
      var maxX = Math.max(0, p1, p2, p3);
    
      uvs[2 * indices[i + 1]] = flip + Math.cos(flip * Math.PI) * (p1 - minX)/(maxX - minX);
      uvs[2 * indices[i + 1] + 1] = 1;
      uvs[2 * indices[i + 4]] = flip + Math.cos(flip * Math.PI) * (p3 - minX)/(maxX - minX);
      uvs[2 * indices[i + 4] + 1] = 0;
    }
  }
  
  BABYLON.VertexData.ComputeNormals(positions, indices, normals);
  BABYLON.VertexData._ComputeSides(BABYLON.Mesh.DOUBLESIDE, positions, indices, normals, uvs);  	
  console.log(uvs)		
  //Create a custom mesh  
  var customMesh = new BABYLON.Mesh("custom", scene);

  //Create a vertexData object
  var vertexData = new BABYLON.VertexData();

  //Assign positions and indices to vertexData
  vertexData.positions = positions;
  vertexData.indices = indices;
  vertexData.normals = normals;
  vertexData.uvs = uvs;

  //Apply vertexData to custom mesh
  vertexData.applyToMesh(customMesh);
  
  var blackMaterial = new BABYLON.StandardMaterial("tankMaterial", scene);
  blackMaterial.diffuseColor = new BABYLON.Color3.Black;
  customMesh.material = blackMaterial;
  return customMesh;
  
}

var createTallCabinet = function (scene, name, dims, position) {
  var DEMO_SEPARATION = 2; // For illustration purposes only
  var DOOR_DEPTH = 15;
  var HANDLE_DEPTH = 15;

  var PLINTH_HEIGHT = 50;
  var PLINTH_OFFSET = 100;

  var cabinet = new BABYLON.AbstractMesh(name, scene);

  var carcase = createBox(scene, `${name}-carcase1`, dims);
  carcase.position = position.add(new BABYLON.Vector3(0, (dims.height  / 2) + PLINTH_HEIGHT, 0));
  carcase.parent = cabinet;

  var door = createBox(scene, `${name}-door1`, {
    depth: DOOR_DEPTH,
    width: dims.width,
    height: dims.height
  });
  door.position = position.add(new BABYLON.Vector3(0, (dims.height  / 2) + PLINTH_HEIGHT, dims.depth / 2 + DOOR_DEPTH / 2 + DEMO_SEPARATION));
  door.parent = cabinet;

  var handle = createBox(scene, `${name}-handle1`, {
    depth: HANDLE_DEPTH,
    width: dims.width/4,
    height: dims.height/16
  });

  var blackMaterial = new BABYLON.StandardMaterial("tankMaterial", scene);
  blackMaterial.diffuseColor = new BABYLON.Color3.Black;
  handle.material = blackMaterial;
  handle.position = position.add(new BABYLON.Vector3(0,dims.height/8, dims.depth / 2 + DOOR_DEPTH*2 + DEMO_SEPARATION));
  handle.parent = cabinet;

  return cabinet
}


var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

  const width = 601;
  const height = [501,701,501,701];
  //bottom to top
  const grid = [
    [1,1,1,1,1,1],
    [2,3,3,3,3,2],
    [0,0,0,0,0,0],
    [3,3,3,3,3,3]
  ];
  let pos = [0,0,0];
  for (let l=0;l< grid.length;l++){
    let line = grid[l];
    for (let item of line){
      if(item === 1){
        createCabinet(scene, 'cab1'+item+l, {
          height: 500,
          width: 600,
          depth: 500
        }, new BABYLON.Vector3(pos[0], pos[1], 0))
      } else if(item === 2){
        createTallCabinet(scene, 'cab2'+item+l, {
          height: 700,
          width: 600,
          depth: 500
        }, new BABYLON.Vector3(pos[0], pos[1], 0))
      }
      pos = [pos[0]+width,pos[1],0]
    }
    pos = [0,pos[1]+height[l],0]
  }
  var path = [ 	
    new BABYLON.Vector3(-310, -40, 265),
		new BABYLON.Vector3(3310, -40, 265),
		new BABYLON.Vector3(3310, 2440, 265),
		new BABYLON.Vector3(-310, 2440, 265),
	]
  var line = line2D("line", {path: path, width:5, closed: true}, scene);

  var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI/2, 4000, new BABYLON.Vector3(1500, 1100, 0), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  var distance =6000;
  var aspect =
    scene.getEngine().getRenderingCanvasClientRect().height /
    scene.getEngine().getRenderingCanvasClientRect().width;
  camera.orthoLeft = -distance / 2;
  camera.orthoRight = distance / 2;
  camera.orthoBottom = camera.orthoLeft * aspect;
  camera.orthoTop = camera.orthoRight * aspect;
  camera.attachControl(canvas, true);

  return scene;
};

var scene = createScene();

engine.runRenderLoop(function () { 
  scene.render();
});

window.addEventListener("resize", function () { 
  engine.resize();
});
