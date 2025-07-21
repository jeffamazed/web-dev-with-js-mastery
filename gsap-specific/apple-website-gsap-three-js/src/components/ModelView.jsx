import {
  Html,
  PerspectiveCamera,
  View,
  OrbitControls,
} from "@react-three/drei";
import Lights from "./Lights";
import LoadingIcon from "./LoadingIcon";
import { Suspense } from "react";
import IPhone from "./IPhone";
import { Vector3 } from "three";

const ModelView = ({
  index,
  groupRef,
  viewRef,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      ref={viewRef}
      className={`size-full absolute ${index === 2 && "right-[-100%]"}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      {/* For controlling the iPhone */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        {/* make sure to check the fallback later, LoadingIcon doesn't seem to work as expected */}
        <Suspense
          fallback={
            <Html fullscreen>
              <LoadingIcon />
            </Html>
          }
        >
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
