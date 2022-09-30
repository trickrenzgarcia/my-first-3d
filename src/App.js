import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { BoxesArray } from './BoxesArray';

// the box component
export const Box = ({position}) => {
  const [ref, api] = useBox(() => ({ mass: 1}))
  return (
    <mesh onClick={() => {
      api.velocity.set(0, 10, 0)
    }} ref={ref} position={position}>
      <boxGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

// the plane component
export const Plane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0]
  }))

  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  )
}

function App() {
  const [boxes, setBoxes] = useState(BoxesArray)

  return (
    <Canvas camera={{ fov: 75, position: [-20, 15, 20]}}>  
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <Physics>
        {boxes.map((box) => (
          <Box key={box.id} position={box.position}/>
        ))}
        <Plane />
      </Physics>
    </Canvas>
  );
}

export default App;
