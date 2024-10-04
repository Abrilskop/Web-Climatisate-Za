"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const climateData = {
  arctic: { name: "Ártico", temp: -10, description: "Región polar en rápido calentamiento" },
  temperate: { name: "Templado", temp: 15, description: "Zona de cambios estacionales marcados" },
  tropical: { name: "Tropical", temp: 28, description: "Área de alta biodiversidad amenazada" },
  desert: { name: "Desierto", temp: 35, description: "Región de extrema aridez en expansión" }
}

function Earth({ selectedClimate, setSelectedClimate }) {
  const earthRef = useRef()
  const cloudsRef = useRef()
  const [earthTexture, cloudsTexture] = useLoader(TextureLoader, [
    '/assets/3d/texture_earth.jpg',
    '/placeholder.svg?height=1024&width=2048'
  ])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime / 10
    cloudsRef.current.rotation.y = elapsedTime / 8
  })

  return (
    <group>
      <mesh ref={earthRef} onClick={(e) => setSelectedClimate(e.object.userData.climate)}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial map={earthTexture} />
        <Html position={[0, 2.5, 0]}>
          <div className="text-white text-center bg-black bg-opacity-50 p-2 rounded">
            {selectedClimate ? climateData[selectedClimate].name : "Selecciona una zona"}
          </div>
        </Html>
        {Object.entries(climateData).map(([key, data], index) => (
          <mesh
            key={key}
            position={[
              2 * Math.cos((index * Math.PI) / 2),
              0,
              2 * Math.sin((index * Math.PI) / 2)
            ]}
            userData={{ climate: key }}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color={selectedClimate === key ? "yellow" : "white"} />
          </mesh>
        ))}
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshPhongMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}

function ClimateInfo({ climate }) {
  const { temp, description } = climateData[climate]
  return (
    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded">
      <h2 className="text-2xl mb-2">{climateData[climate].name}</h2>
      <p className="mb-2">Temperatura: {temp}°C</p>
      <p>{description}</p>
    </div>
  )
}

function SpaceBackground() {
  return <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} />
}

export default function ClimateChangeExperience() {
  const [selectedClimate, setSelectedClimate] = useState(null)

  return (
    <div className="w-full h-screen relative bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <SpaceBackground />
        <Earth selectedClimate={selectedClimate} setSelectedClimate={setSelectedClimate} />
        <OrbitControls enableZoom={false} />
      </Canvas>
      {selectedClimate && <ClimateInfo climate={selectedClimate} />}
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-3xl mb-2">Cambio Climático Global</h1>
        <p>Explora las diferentes zonas climáticas y su impacto</p>
      </div>
    </div>
  )
}