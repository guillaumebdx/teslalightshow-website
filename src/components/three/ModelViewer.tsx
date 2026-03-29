'use client'

import { Suspense, useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Box3, Vector3, ACESFilmicToneMapping, type Group } from 'three'
const modelPath = '/tesla_20260303_geo.glb'
import { LightShowController } from './lightshow'

function Model({ desiredSize }: { desiredSize: number }) {
  const groupRef = useRef<Group>(null)
  const { scene: threeScene } = useThree()
  const { scene } = useGLTF(modelPath)
  const controller = useMemo(() => new LightShowController(), [])
  const elapsed = useRef(0)

  const { groupScale, groupPos } = useMemo(() => {
    scene.position.set(0, 0, 0)
    scene.rotation.set(0, 0, 0)
    scene.scale.set(1, 1, 1)
    scene.updateMatrixWorld(true)

    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const s = desiredSize / maxDim

    return {
      groupScale: s,
      groupPos: new Vector3(-center.x * s, (-center.y - size.y / 2) * s, -center.z * s),
    }
  }, [scene, desiredSize])

  useEffect(() => {
    controller.setup(scene, threeScene)
  }, [scene, threeScene, controller])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.3
    elapsed.current += delta
    controller.update(elapsed.current)
  })

  return (
    <group ref={groupRef} scale={groupScale} position={groupPos}>
      <primitive object={scene} />
    </group>
  )
}

function SceneContent({ mobile }: { mobile: boolean }) {
  return (
    <>
      {/* Studio lighting */}
      <ambientLight intensity={0.9} />
      <hemisphereLight color="#ffffff" groundColor="#444466" intensity={0.7} />
      <directionalLight position={[4, 8, 5]} intensity={1.0} />
      <directionalLight position={[-4, 6, 4]} intensity={0.7} color="#eeeeff" />
      <directionalLight position={[0, 5, -6]} intensity={0.6} color="#ccccff" />
      <pointLight position={[-6, 2, 0]} intensity={0.5} distance={20} />
      <pointLight position={[6, 2, 0]} intensity={0.5} distance={20} />
      <pointLight position={[0, -3, 0]} intensity={0.4} distance={15} color="#ddddef" />
      <directionalLight position={[0, 3, 8]} intensity={0.5} />
      <directionalLight position={[0, 2, -8]} intensity={0.4} color="#ddddff" />

      <Model desiredSize={2.5} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        target={[0, mobile ? -0.15 : 0, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

const GL_PROPS = {
  antialias: true,
  alpha: true,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1.2,
}

export default function ModelViewer() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* On mobile, overlay a transparent div to block Canvas touch events and allow page scroll */}
      {mobile && <div className="absolute inset-0 z-10" />}
      {mobile ? (
        <Canvas
          key="mobile"
          camera={{ position: [3, 1, 3], fov: 45 }}
          gl={GL_PROPS}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <SceneContent mobile />
          </Suspense>
        </Canvas>
      ) : (
        <Canvas
          key="desktop"
          camera={{ position: [3, 1, 3], fov: 45 }}
          gl={GL_PROPS}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <SceneContent mobile={false} />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
