<script>
    import {
        Canvas,
        Scene,
        PerspectiveCamera,
        DirectionalLight,
        AmbientLight,
        BoxBufferGeometry,
        Mesh,
        MeshStandardMaterial,
        WebGLRenderer,
    } from './svelthree.mjs'
    
    import {rotateCube, rotateCubeZ, rotateCubeFaster} from "./animations_mesh.js"
      
    let cubeGeometry = new BoxBufferGeometry(0.8, 0.8, 0.8);
    let baseMaterial = new MeshStandardMaterial();
  
    
  </script>
  
  <svelte:options/>

  <Canvas let:sti w={500} h={500}>
  
    <Scene {sti} let:scene id="scene1" props={{ background: 0xedf2f7 }}>
  
      <PerspectiveCamera {scene} id="cam1" pos={[0, 0, 3]} lookAt={[0, 0, 0]} />
      <AmbientLight {scene} intensity={1.25} />
      <DirectionalLight {scene} pos={[3, 3, 3]} castShadow shadowMapSize={8*512}/>
  
          <!-- Mesh component as parent (level 0 - svelte-color) -->
      <Mesh
                  {scene} let:parent
                  geometry={cubeGeometry}
                  material={baseMaterial}
                  mat={{ roughness: 0.5, metalness: 0.5, color: 0xff3e00 }}
                  pos={[0, 0, 0]}
                  scale={[1, 1, 1]}
                  animation={rotateCube}
                  aniauto
                  receiveShadow
                  castShadow>
              
            <!-- Mesh component as child (level 1 - yellow) -->		
                  <Mesh {scene} {parent}
                          pos={[-0.8, 0, 0]}
                          scale={[0.5, 0.5, 0.5]}	
                          geometry={cubeGeometry}
                          material={baseMaterial.clone()}
                          mat={{ roughness: 0.5, metalness: 0.5, color: 0xF6E05E}}
                          animation={rotateCube}
                          aniauto
                          receiveShadow
                          castShadow />
              
                  <!-- Mesh component as child (level 1 - yellow) -->		
                  <Mesh {scene} {parent}
                          pos={[0.8, 0, 0]}
                          scale={[0.5, 0.5, 0.5]}	
                          geometry={cubeGeometry}
                          material={baseMaterial.clone()}
                          mat={{ roughness: 0.5, metalness: 0.5, color: 0xF6E05E }}
                          animation={rotateCube}
                          aniauto
                          receiveShadow
                          castShadow />
                  
                  <!-- Mesh component as child (level 1 - yellow) -->		
                  <Mesh {scene} {parent}
                          pos={[0, -0.8, 0]}
                          scale={[0.5, 0.5, 0.5]}	
                          geometry={cubeGeometry}
                          material={baseMaterial.clone()}
                          mat={{ roughness: 0.5, metalness: 0.5, color: 0xF6E05E }}
                          animation={rotateCube}
                          aniauto
                          receiveShadow
                          castShadow />
                  
                  <!-- Mesh component as child (level 1 - yellow) -->		
                  <Mesh {scene} {parent}
                          pos={[0, 0.8, 0]}
                          scale={[0.5, 0.5, 0.5]}	
                          geometry={cubeGeometry}
                          material={baseMaterial.clone()}
                          mat={{ roughness: 0.5, metalness: 0.5, color: 0xF6E05E }}
                          animation={rotateCube}
                          aniauto
                          receiveShadow
                          castShadow />
              
                  <!-- Mesh component as child (level 1 - yellow) -->		
                  <Mesh {scene} {parent}
                          pos={[0, 0, -0.8]}
                          scale={[0.5, 0.5, 0.5]}	
                          geometry={cubeGeometry}
                          material={baseMaterial.clone()}
                          mat={{ roughness: 0.5, metalness: 0.5, color: 0xF6E05E }}
                          animation={rotateCube}
                          aniauto
                          receiveShadow
                          castShadow />
              
                   <!-- Mesh component as child / parent (level 1 - green) -->	
                   <Mesh {scene} {parent} let:parent
                          pos={[0, 0, 0.8]}
                          scale={[0.4, 0.4, 0.4]}	 
                          geometry={cubeGeometry}
                          material={baseMaterial.clone()}
                          mat={{ roughness: 0.5, metalness: 0.5, color: 0x68D391 }}
                          animation={rotateCubeZ}
                          aniauto
                          receiveShadow
                          castShadow >
                          
                        <!-- Mesh component as child (level 2 - blue) -->
                           <Mesh {scene} {parent}
                              pos={[0.7, 0, 0]}
                              scale={[0.4, 0.4, 0.4]}		
                              geometry={cubeGeometry}
                              material={baseMaterial.clone()}
                              mat={{ roughness: 0.5, metalness: 0.5, color: 0x63B3ED }}
                              animation={rotateCubeFaster}
                              aniauto
                              receiveShadow
                              castShadow />
                       
                          <!-- Mesh component as child (level 2 - blue) -->
                          <Mesh {scene} {parent}
                              pos={[-0.7, 0, 0]}
                              scale={[0.4, 0.4, 0.4]}		
                              geometry={cubeGeometry}
                              material={baseMaterial.clone()}
                              mat={{ roughness: 0.5, metalness: 0.5, color: 0x63B3ED }}
                              animation={rotateCubeFaster}
                              aniauto
                              receiveShadow
                              castShadow />
                      
                        <!-- Mesh component as child (level 2 - blue) -->
                          <Mesh {scene} {parent}
                              pos={[0, 0.7, 0]}
                              scale={[0.4, 0.4, 0.4]}		
                              geometry={cubeGeometry}
                              material={baseMaterial.clone()}
                              mat={{ roughness: 0.5, metalness: 0.5, color: 0x63B3ED }}
                              animation={rotateCubeFaster}
                              aniauto
                              receiveShadow
                              castShadow />
                          
                        <!-- Mesh component as child (level 2 - blue) -->
                          <Mesh {scene} {parent}
                              pos={[0, -0.7, 0]}
                              scale={[0.4, 0.4, 0.4]}
                              geometry={cubeGeometry}
                              material={baseMaterial.clone()}
                              mat={{ roughness: 0.5, metalness: 0.5, color: 0x63B3ED }}
                              animation={rotateCubeFaster}
                              aniauto
                              receiveShadow
                              castShadow />
                      
                        <!-- Mesh component as child (level 2 - blue) -->
                          <Mesh {scene} {parent}
                              pos={[0, 0, 0.7]}
                              scale={[0.4, 0.4, 0.4]}
                              geometry={cubeGeometry}
                              material={baseMaterial.clone()}
                              mat={{ roughness: 0.5, metalness: 0.5, color: 0x63B3ED }}
                              animation={rotateCubeFaster}
                              aniauto
                              receiveShadow
                              castShadow />
                      
                        <!-- Mesh component as child (level 2 - blue) -->
                          <Mesh {scene} {parent}
                              pos={[0, 0, -0.7]}
                              scale={[0.4, 0.4, 0.4]}
                              geometry={cubeGeometry}
                              material={baseMaterial.clone()}
                              mat={{ roughness: 0.5, metalness: 0.5, color: 0x63B3ED }}
                              animation={rotateCubeFaster}
                              aniauto
                              receiveShadow
                              castShadow />
              </Mesh>			 
          </Mesh>			
  
    </Scene>
  
    <WebGLRenderer
      {sti}
      sceneId="scene1"
      camId="cam1"
      config={{ antialias: true, alpha: true }} enableShadowMap/>
  
  </Canvas>
  