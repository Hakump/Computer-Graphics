var stats;

var webGLRenderer;
var camera, scene;
var clock;
var controls;

var pointlight, pointlight2;
var mesh, mesh2;

var raycaster, mouse;
var intersects, INTERSECTED;

//Initialize function
var init = function () {

	console.log("init() called");

	 clock = new THREE.Clock()
	
     // CREATE A SCENE FOR HOLDING OUR ALL 3D SCENE ELEMENTS
         scene = new THREE.Scene();
	 // CREATE A DISTANCE FOG FOR OUR 3D WORLD
	 	 scene.fog = new THREE.Fog( 0x000000, 1200, 3000 );
     // CREATE THE CAMERA
         camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
     // CREATE A WEBGL RENDERER
         webGLRenderer = new THREE.WebGLRenderer();
	     webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
	     webGLRenderer.setSize(window.innerWidth, window.innerHeight);
	     webGLRenderer.shadowMapEnabled = true;
	 // ANTIALIAS THE SHADOW
	     webGLRenderer.shadowMapType = THREE.PCFSoftShadowMap;
     // POSITION THE CAMERA AND MAKE IT LOOK TO THE CENTER OF THE STAGE
	     
	     camera.position.x = 150;
	     camera.position.y = -1650;
	     camera.position.z = -700;
	     camera.lookAt(new THREE.Vector3(0, 0, 0));
	     
	  // CREATE CONTROLS
		 controls = new THREE.OrbitControls( camera, webGLRenderer.domElement );
		 controls.target.set( 0, -1400, 0 );
	  
	  // CREATE POINT LIGHT 
	     pointlight = new THREE.PointLight( 0x4aa592, 1, 900 ); 
	     pointlight.position.set( 0, -1100, -100 ); 
	     scene.add( pointlight );
	     	     
	    var light = new THREE.SpotLight( 0x4aa592, 2, 4500 );
			light.position.set( 0, 20, 1 );

			light.castShadow = true;
			light.shadowMapWidth = 1024;
			light.shadowMapHeight = 1024;
			light.shadowMapDarkness = 0.98;
			
			scene.add(light);
	     
		//  CREATE THE GROUND
			var gt = THREE.ImageUtils.loadTexture( "images/desert_texture.png" );
			var mapHeight = THREE.ImageUtils.loadTexture( "images/desert_texture_bw_16bit.png" );
			
			mapHeight.anisotropy = 4;
			mapHeight.repeat.set( 0.998, 0.998 );
			mapHeight.offset.set( 0.005, 0.005 )
			mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
			mapHeight.format = THREE.RGBFormat;
			
			var gg = new THREE.PlaneGeometry( 6000, 3000, 100, 100 );				
			var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt, specular: 0x333333, shininess: 5, bumpMap: mapHeight, bumpScale: 0.85, metal: false } );

			var ground = new THREE.Mesh( gg, gm );
				ground.rotation.x = - Math.PI / 2;
				ground.material.map.repeat.set( 8, 8 );
				ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
				ground.receiveShadow = true;
				
				ground.position.y = -1490;

			scene.add( ground );
	     
	     // PREPARE THE SKYBOX TEXTURES
			var urls = [
			            'images/skybox_horizon_Right.jpg', 
			            'images/skybox_horizon_Left.jpg',
			            'images/skybox_horizon_Top.jpg',
			            'images/skybox_horizon_Bottom.jpg',
			            'images/skybox_horizon_Front.jpg', 
			            'images/skybox_horizon_Back.jpg'	
			           ];

			          var cubemap = THREE.ImageUtils.loadTextureCube(urls); // LOAD THE CUBE TEXTURES
			              cubemap.format = THREE.RGBFormat;

			          var shader = THREE.ShaderLib['cube']; // INITIALIZE A SHADER
			              shader.uniforms['tCube'].value = cubemap; // APPLY THE TEXTURES TO THE MODEL

			          // CREATE A SHADER FOR THE SKYBOX
			          var skyBoxMaterial = new THREE.ShaderMaterial( {
			            fragmentShader: shader.fragmentShader,
			            vertexShader: shader.vertexShader,
			            uniforms: shader.uniforms,
			            depthWrite: false,
			            side: THREE.BackSide
			          });

			          // CREATE THE MESH FOR THE SKYBOX
			          var skybox = new THREE.Mesh(
			            new THREE.CubeGeometry(3000, 3000, 3000),
			            skyBoxMaterial
			          );

			          scene.add(skybox);
			          
			          ///////////////////////////
			
    
	     document.body.appendChild( webGLRenderer.domElement );
	
	     
	     // LOAD THE JSON MODEL - FORMER MD2 ANIMATED MODEL
	     var loader = new THREE.JSONLoader();
	        loader.load('models/horse.js', function (geometry, mat) {
	            geometry.computeMorphNormals();
	            
	            var mat = new THREE.MeshLambertMaterial(
	                    {
	                        map: THREE.ImageUtils.loadTexture("models/horse.jpg"),
	                        morphTargets: true, morphNormals: true,
	                        specular: 0xffffff, shininess: 60,
	                        shading: THREE.SmoothShading,
	                        vertexColors: THREE.FaceColors
	                    });
	            
	            // CREATE THE MESH FOR THE FIRST HORSE MODEL
	            mesh = new THREE.MorphAnimMesh(geometry, mat);
	            mesh.name = "horse1";
	      
	            mesh.parseAnimations(); // HERE WE PARSE THE ANIMATION IN ORDER TO GET THE NAMES OF THE KEYFRAMES IN THE ANIMATION
	            mesh.playAnimation("stand", 10);
	            
	            mesh.position.y = -1493;
	            mesh.position.z = 0;
	            
	            mesh.castShadow = true;
	            mesh.receiveShadow = true;
	            
	            scene.add(mesh);
	            
	            // CREATE THE MESH FOR THE SECOND HORSE MODEL
	            mesh2 = new THREE.MorphAnimMesh(geometry, mat);
	            mesh2.name = "horse2";
	            
	            mesh2.parseAnimations(); // HERE WE PARSE THE ANIMATION IN ORDER TO GET THE NAMES OF THE KEYFRAMES IN THE ANIMATION
	            mesh2.playAnimation("stand", 10);
	            
	            mesh2.position.y = -1493;
	            mesh2.position.z = 280;
	            mesh2.position.x = 2000;
	            
	            mesh2.castShadow = true;
	            mesh2.receiveShadow = true;
	        
	            scene.add(mesh2);

	            // CREATE A RAYCASTER OBJECT WHICH WE WILL USE TO PICK 3D OBJECTS IN THE SCENE
	            raycaster = new THREE.Raycaster();
	            mouse = new THREE.Vector2(), INTERSECTED;

	            // THIS FUNCTION WILL ADD AN EMMISIVE COLOR TO THE MATERIAL ON CLICK AND TURN IT OFF ON THE SECOND CLICK
	            function onMouseClick( event ) {

	            	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
	            	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1	
	            	
	            	if ( intersects.length > 0 ) {
	            		
	            		INTERSECTED = intersects[0].object;
	            		
	            	
	            		if (INTERSECTED.name == "horse1" || INTERSECTED.name == "horse2"){
	            			
	            			if (INTERSECTED.material.isOn == false) {
	            			
		            			INTERSECTED.material.emissive = new THREE.Color( 0xb3f0e3 );
		            			INTERSECTED.material.isOn = true;
	            			
	            			}
	            			else
	            			{
	            				
	            				INTERSECTED.material.emissive = new THREE.Color( 0x000000 );
		            			INTERSECTED.material.isOn = false;
	            				
	            			}
	            			
	            		}
	            	
	            	}

	            }
   
	            window.addEventListener( 'click', onMouseClick, false );
	            
	            render();
	        });
	     
	     stats = initStats(); // INITIALIZe MR.DOOB STATS
	     
	        function render() {
	            stats.update();

	            // HERE WE UPDATE THE RAYCASTING PICKING RAY WITH THE CAMERA AND MOUSE OBJECTS
	        	raycaster.setFromCamera( mouse, camera );	

	        	// HERE ARE MADE CALCULATIONS OF THE INTERSECTIONS OF THE OBJECTS IN THE SCENE AND THE PICKING RAY
	        	intersects = raycaster.intersectObjects( scene.children );
	            
	            var delta = clock.getDelta();
	            
	           ground.position.x += 2; // MOVE THE GROUND UNDER THE HORSES TO GET A MOVEMENT FEEL
	           
	           if (ground.position.x > 1500) { // MOVE THE GROUND BACK IN ORDER TO GET AN 'ENDLESS GROUND EFFECT'
	        	   ground.position.x = 0;
	           }
	            
	           mesh2.position.x-=2; // MOVE THE SECOND HORSE
	           if (mesh2.position.x < -2000) // GENERATE A NEW Z COORDINATE AND MOVE THE SECOND HORSE BACK
	           {
	        	   mesh2.position.x = 2000;
	        	   mesh2.position.z = -1000 + Math.round(Math.random()*2000);
	           }
	           
	           // UPDATE BOTH HORSE ANIMATIONS
	           mesh.updateAnimation(delta * 1000);
	           mesh2.updateAnimation(delta * 1000);
	                
	            // RENDER USING THE REQUESTANIMATIONFRAME
	            window.webkitRequestAnimationFrame(render);
	            controls.update();
	            webGLRenderer.render(scene, camera);
	        }
	        
	      
	        // USE STATS.JS FROM MR DOOB TO MEASURE PERFORMANCE
	        function initStats() {
	            stats = new Stats();
	            stats.setMode(0); // 0: fps, 1: ms
	            // Align top-left
	            stats.domElement.style.position = 'absolute';
	            stats.domElement.style.left = '0px';
	            stats.domElement.style.top = '0px';
	            
	            document.body.appendChild( stats.domElement );
	        
	            return stats;
	        }
	        
	        // REDRAW OUR 3D SCENE EVERY TIME SOMEONE CHANGES THE WINDOW SIZE
	        window.addEventListener( 'resize', onWindowResize, false );
	        
	        function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				webGLRenderer.setSize( window.innerWidth, window.innerHeight );

			}
	        
	        // CONVERT DEGREES TO RADIANS
	        function deg2rad(angle) {
	        	  return angle * .017453292519943295;
	        }
	     
	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});
};
// window.onload can work without <body onload="">
window.onload = init;
