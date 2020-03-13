let B = null;
let scene = null;
let canvas = null;

/**
 * ON N'A PAS TROP LE TEMPS DE BOSSER EN BACKEND ET EN FRONTEND
 * DONC ON VA BOSSER EN BACKEND SEULEMENT AVEC NODEJS ET EXPRESS
 * DONC ON NE VA PAS CREER DES MODULES DANS DES FICHIERS SEPARÉS
 * DONC ON VA DÉFINIR TOUS LES OBJECTS DANS CE MEME FICHIER JS
 * DONC C'EST COOL !
*/

/**
 * CLASSE CHARACTER
*/
function Character(x, y, z, speed=.1){
	this.x = x;
	this.y = y;
	this.z = z;
	this.initialPosition = new B.Vector3(this.x, this.y, this.z);
	this.speed = speed;
	this.camera = null;
	this.cameraOn = () => {
		this.camera = new B.FreeCamera("FreeCamera", new B.Vector3(this.x, this.y, this.z), scene);
		this.camera.minZ = .01;
		this.camera.attachControl(canvas, true);
		this.camera.speed = this.speed;
		this.camera.checkCollisions = true;
		this.camera.applyGravity = true;
	}
}

/**
 * CLASSE LABYRINTHE
*/
function Labyrinthe(){
	this.labyrintheMap = [
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1]
		];
}

/****************************************************************************************************
 * LA LOGIQUE DU JEU                                                                                *
****************************************************************************************************/

window.addEventListener("DOMContentLoaded", () => {
	/*PARCE-QUE C'EST TROP CHIANT DE TAPER BABYLON À CHAQUE FOIS*/
	B = BABYLON;
	/*RECUPÉRER L'OBJET CANVAS DU HTML*/
	canvas = document.getElementById("canvas");
	/*INSTANCIER UN MOTEUR GRAPHIQUE*/
	let engine = new B.Engine(canvas, true);
	
	/*GENERER UNE SCENE (LE NOM DE LA FONCTION EST UN CHOIX)*/
	let createScene = () => {
		let scene = new B.Scene(engine);
		scene.clearColor = new B.Color3.FromHexString("#77dd99");
		
		/*LUMIÈRE*/
		let light1 = new B.PointLight("PointLight1", new B.Vector3(-2, 30, -2), scene);
		let light2 = new B.PointLight("PointLight2", new B.Vector3(-2, 30, 23), scene);
		let light3 = new B.PointLight("PointLight3", new B.Vector3(23, 30, -2), scene);
		let light4 = new B.PointLight("PointLight4", new B.Vector3(23, 30, 23), scene);
		
		let sphere = new B.MeshBuilder.CreateSphere("Sphere", {diameter: 1.0, diameterX: 1.0}, scene);
		sphere.position = new B.Vector3(21, 1, 19.5);
		
		/*GRAVITÉ*/
		scene.gravity = new B.Vector3(0, -9.81, 0);
		
		/*SOL*/
		let ground = new B.MeshBuilder.CreateGround("Ground", 
			{height: 300, width: 300, subdivisions: 10}, scene);
		ground.position = new B.Vector3(0, 0, 0);
		let groundMaterial = new B.StandardMaterial("Checkered_tiles", scene);
		groundMaterial.diffuseTexture = new B.Texture("../images/checkered_tiles/checkered_tiles.jpg", scene);
		groundMaterial.diffuseTexture.uScale = 50.0;
		groundMaterial.diffuseTexture.vScale = 50.0;
		ground.material = groundMaterial;
		
		/*LE LABYRINTHE*/
		let lb = new Labyrinthe();
		let cubes = [];
		for(let row = 0; row < lb.labyrintheMap.length; row++){
			for(let col = 0; col < lb.labyrintheMap[row].length; col++){
				if(lb.labyrintheMap[row][col] === 1){
					let cube = new B.MeshBuilder.CreateBox(`Cube_${row}_${col}`, {height: 4.0, width: 1.0, depth: 1.0}, scene);
					cube.position = new B.Vector3(row, 2, col);
					cube.checkCollisions = true;
					let cubeMaterial = new B.StandardMaterial("Brick_wall", scene);
					cubeMaterial.diffuseTexture = new B.Texture("../images/brick_wall/brick_wall.jpg", scene);
					// cubeMaterial.diffuseTexture.uScale = 2.0;
					// cubeMaterial.diffuseTexture.vScale = 1.0;
					cube.material = cubeMaterial;
					cube.enableEdgesRendering(.5);   
					cube.edgesWidth = 5.0;
					cube.edgesColor = new BABYLON.Color4(0, 0, 0, 1);
					cubes.push(cube);
				}
			}
		}
		
		let character = new Character(0, 2, 1);
		character.cameraOn();
		character.camera.onCollide = (collidedMesh) => {
			if(collidedMesh.uniqueId === sphere.uniqueId) {
				character.camera.position = character.initialPosition;
			}
		}
		
		/*APPLICATION DES COLLISIONS*/
		scene.collisionsEnabled = true;
		ground.checkCollisions = true;
		sphere.checkCollisions = true;

		return scene;
	};

	/*CRÉATION DE LA SCENE (POUR DE VRAI XD )*/
	scene = createScene();
	engine.runRenderLoop(() => {
		scene.render();
	});
});