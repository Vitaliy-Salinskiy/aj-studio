"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, Preload } from "@react-three/drei";
import Sneakers from "@/public/models/Sneakers";

import "react-vertical-timeline-component/style.min.css";

import { Html } from "@react-three/drei";

// ...

const fallback = (
  <Html>
    <>
      <h3 className="vertical-timeline-element-title">Art Director</h3>
      <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
      <p>
        Creative Direction, User Experience, Visual Design, SEO, Online
        Marketing
      </p>
    </>
  </Html>
);

export const ShoesCanvas = () => {
  return (
    <Canvas className="!h-[200px]">
      <directionalLight position={[1, 5, -4]} />
      <ambientLight intensity={-0.75} />
      <Suspense fallback={fallback}>
        <Html>
          <div className="vertical-timeline-element-content bounce-in">
            <h3 className="vertical-timeline-element-title">Art Director</h3>
            <h4 className="vertical-timeline-element-subtitle">
              San Francisco, CA
            </h4>
            <p>
              Creative Direction, User Experience, Visual Design, SEO, Online
              Marketing
            </p>
          </div>
        </Html>
        <Sneakers />
      </Suspense>
      <Preload all />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} minZoom={10} />
    </Canvas>
  );
};
