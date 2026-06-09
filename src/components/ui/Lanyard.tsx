/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// replace with your own imports, see the usage snippet for details
const cardGLB = './card.glb';
const lanyard = './lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: LanyardProps) {
  const [isSmall, setIsSmall] = useState(false);
  const [anchorX, setAnchorX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmall(width < 1024);
      
      if (width < 1024) {
        setAnchorX(0);
      } else if (width < 1280) {
        setAnchorX(2);
      } else {
        setAnchorX(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Camera centered; card position controlled by group offset in Band component
  const adjustedPosition: [number, number, number] = [0, 0, 20];
  const adjustedFov = isSmall ? 20 : 18;

  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center">
      <Canvas
        camera={{ position: adjustedPosition, fov: adjustedFov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band key={anchorX} isSmall={isSmall} anchorX={anchorX} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isSmall?: boolean;
  anchorX?: number;
}

function Band({ maxSpeed = 50, minSpeed = 0, isSmall = false, anchorX = 0 }: BandProps) {
  // Using "any" for refs since the exact types depend on Rapier's internals
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);


  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
        // Safety check: ensure all refs are present and have valid translations
        const allRefs = [fixed, j1, j2, j3, card];
        const isReady = allRefs.every(ref => 
            ref.current && 
            !isNaN(ref.current.translation().x) && 
            !isNaN(ref.current.translation().y) && 
            !isNaN(ref.current.translation().z)
        );

        if (!isReady) return;

      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) {
          const t = ref.current.translation();
          const safe = t && Number.isFinite(t.x) && Number.isFinite(t.y) && Number.isFinite(t.z);
          ref.current.lerped = new THREE.Vector3().copy(safe ? t : new THREE.Vector3(0, 0, 0));
        }

        const tr = ref.current.translation();
        if (tr && Number.isFinite(tr.x) && Number.isFinite(tr.y) && Number.isFinite(tr.z)) {
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(tr)));
          const lerpAlpha = Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
          ref.current.lerped.lerp(tr, lerpAlpha);
        }
      });
      
      // Calculate curve points
      const p0 = j3.current.translation();
      const p1 = j2.current.lerped;
      const p2 = j1.current.lerped;
      const p3 = fixed.current.translation();

      // Safety check: ensure all control points are finite
      if (
          [p0, p1, p2, p3].some(v => !v || !Number.isFinite(v.x) || !Number.isFinite(v.y) || !Number.isFinite(v.z))
      ) {
          return;
      }

      curve.points[0].copy(p0);
      curve.points[1].copy(p1);
      curve.points[2].copy(p2);
      curve.points[3].copy(p3);
      
      // Update geometry
      const points = curve.getPoints(32);
      if (points.some(p => !Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z))) return;
      band.current.geometry.setPoints(points);
      
      // Update card rotation
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const meshLineGeom = useMemo(() => new MeshLineGeometry(), []);
  const meshLineMat = useMemo(() => {
    // MeshLineMaterial expects some non-React props; create it imperatively and keep it stable.
    const mat: any = new MeshLineMaterial({
      color: 'white',
      depthTest: false,
      resolution: new THREE.Vector2(isSmall ? 1000 : 1000, isSmall ? 2000 : 1000),
      useMap: true,
      map: texture,
      repeat: new THREE.Vector2(-4, 1),
      lineWidth: 1
    } as any);
    return mat;
  }, [texture, isSmall]);

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody position={[anchorX, 0, 0]} ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[anchorX, -0.5, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[anchorX, -1.0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[anchorX, -1.5, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[anchorX, -2.0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} geometry={meshLineGeom} material={meshLineMat} />
    </>
  );
}

useGLTF.preload(cardGLB);
useTexture.preload(lanyard);