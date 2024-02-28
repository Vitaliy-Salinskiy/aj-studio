"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import Sneakers from "@/public/models/Sneakers";

export const ShoesCanvas = () => {
  return (
    <Canvas className="!h-[500px] bg-black">
      <directionalLight position={[1, 5, -4]} />
      <ambientLight intensity={-0.75} />
      <Suspense fallback={null}>
        <Sneakers />
      </Suspense>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} minZoom={10} />
    </Canvas>
  );
};
