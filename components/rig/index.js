import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useRouter } from "next/router"
import { useEffect } from "react"
import * as THREE from "three"

const Rig = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree()
  const router = useRouter()

  const params = router.query
  const id = params.id

  useEffect(() => {
    const active = scene.getObjectByName(id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })

  return (
    <CameraControls
      maxDistance={id ? 1.3 : Infinity}
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
    />
  )
}

export default Rig
