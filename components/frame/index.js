import { useCursor, MeshPortalMaterial, Text, Image } from "@react-three/drei"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import * as THREE from "three"
import { easing, geometry } from "maath"
import { useFrame, extend } from "@react-three/fiber"

extend(geometry)

const Frame = ({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}) => {
  const portal = useRef()
  const [hover, setHover] = useState(false)
  const router = useRouter()
  const params = router.query

  useCursor(hover)
  useFrame((state, dt) => {
    easing.damp(portal.current, "blend", params.id === id ? 1 : 0, 0.2, dt)
  })

  return (
    <group {...props}>
      <color attach="background" args={["#c4da35"]} />
      <Text
        fontSize={0.28}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.2, 0.9, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <mesh
        name={id}
        onDoubleClick={(e) => (e.stopPropagation(), router.push("?id=" + id))}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={() => setHover(false)}
        theatreKey={id}
      >
        <circleGeometry args={[width, 100]} />
        <MeshPortalMaterial
          ref={portal}
          events={params.id === id}
          side={THREE.DoubleSide}
        >
          <ambientLight />
          {params.id === id ? (
            <>
              {children}
              <color attach="background" args={["#000000"]} />
            </>
          ) : (
            <group>
              <Image
                url={
                  id === "01"
                    ? "/murcielago.jpeg"
                    : id === "02"
                    ? "/aero.jpeg"
                    : id === "03"
                    ? "/peludo.jpeg"
                    : id === "04"
                    ? "/niandu.jpeg"
                    : id === "05"
                    ? "/mulita.jpeg"
                    : "/flamenco.jpeg"
                }
                scale={2}
              />
              <circleGeometry args={[width, 100]} />
            </group>
          )}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

export default Frame
