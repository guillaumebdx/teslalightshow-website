import {
  MeshStandardMaterial,
  MeshBasicMaterial,
  Matrix4,
  Vector3,
  Color,
  type Mesh,
  type Object3D,
  SpotLight,
  type Scene,
} from 'three'

// ── Node name remapping ──────────────────────────────────────
const NODE_NAME_MAP: Record<string, string> = {
  'blink_front_left002': 'blink_front_left',
  'blink_front_left.002': 'blink_front_left',
  'blin_back_right': 'blink_back_right',
  'plaque': 'license_plate',
  'stop_light': 'brake_lights',
  'anti_fog_back_left': 'rear_fog',
  'anti_fog_back_right': 'rear_fog',
  'side_clignoant_left': 'side_repeater_left',
  'side_clignotant_right': 'side_repeater_right',
}

const KNOWN_PARTS = [
  'light_left_front', 'light_right_front',
  'light_left_back', 'light_right_back',
  'brake_lights', 'rear_fog', 'license_plate',
  'blink_front_left', 'blink_front_right',
  'blink_back_left', 'blink_back_right',
  'side_repeater_left', 'side_repeater_right',
  'window_left_front', 'window_right_front',
  'window_left_back', 'window_right_back',
  'windshield_front', 'windshield_back',
  'retro_left', 'retro_right',
  'trunk', 'flap',
]

function getPartName(mesh: Object3D): string | null {
  let node: Object3D | null = mesh
  while (node) {
    const mapped = NODE_NAME_MAP[node.name] || node.name
    if (KNOWN_PARTS.includes(mapped)) return mapped
    node = node.parent
  }
  return null
}

// ── Materials ────────────────────────────────────────────────
const bodyMat = new MeshStandardMaterial({ color: 0x080808, metalness: 0.9, roughness: 0.2 })
const glassMat = new MeshStandardMaterial({ color: 0x445566, metalness: 0.7, roughness: 0.1, opacity: 0.75, transparent: true })

const headlightOff = new MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.15, emissive: new Color(0x000000), emissiveIntensity: 0 })
const headlightOn = new MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.05, emissive: new Color(0xffffff), emissiveIntensity: 1.5 })

const taillightOff = new MeshStandardMaterial({ color: 0x331111, metalness: 0.5, roughness: 0.15, emissive: new Color(0x000000), emissiveIntensity: 0 })
const taillightOn = new MeshStandardMaterial({ color: 0xff0000, metalness: 0.2, roughness: 0.05, emissive: new Color(0xff0000), emissiveIntensity: 1.5 })

const blinkerOff = new MeshBasicMaterial({ color: 0x332200 })
const blinkerOn = new MeshStandardMaterial({ color: 0xffaa00, metalness: 0.2, roughness: 0.05, emissive: new Color(0xffaa00), emissiveIntensity: 1.5 })

const flapGlow = new MeshStandardMaterial({ color: 0x22ddff, emissive: new Color(0x00aaff), emissiveIntensity: 1.0, depthTest: false, transparent: true, opacity: 0.85 })
const flapOff = new MeshStandardMaterial({ color: 0x080808, metalness: 0.9, roughness: 0.2 })

type LightType = 'headlight' | 'taillight' | 'blinker' | 'plate'

const LIGHT_TYPE_MAP: Record<string, LightType> = {
  light_left_front: 'headlight', light_right_front: 'headlight',
  light_left_back: 'taillight', light_right_back: 'taillight',
  brake_lights: 'taillight', rear_fog: 'taillight',
  license_plate: 'plate',
  blink_front_left: 'blinker', blink_front_right: 'blinker',
  blink_back_left: 'blinker', blink_back_right: 'blinker',
  side_repeater_left: 'blinker', side_repeater_right: 'blinker',
}

function getOnMat(part: string) {
  const t = LIGHT_TYPE_MAP[part]
  if (t === 'headlight' || t === 'plate') return headlightOn
  if (t === 'taillight') return taillightOn
  return blinkerOn
}
function getOffMat(part: string) {
  const t = LIGHT_TYPE_MAP[part]
  if (t === 'headlight' || t === 'plate') return headlightOff
  if (t === 'taillight') return taillightOff
  return blinkerOff
}

// ── Spot light definitions ───────────────────────────────────
const SPOT_DEFS: Record<string, { color: number; dir: [number, number, number] }> = {
  light_left_front: { color: 0xffffff, dir: [0, -0.3, 1] },
  light_right_front: { color: 0xffffff, dir: [0, -0.3, 1] },
  light_left_back: { color: 0xff2200, dir: [0, -0.3, -1] },
  light_right_back: { color: 0xff2200, dir: [0, -0.3, -1] },
  blink_front_left: { color: 0xffaa00, dir: [-0.5, -0.3, 1] },
  blink_front_right: { color: 0xffaa00, dir: [0.5, -0.3, 1] },
  blink_back_left: { color: 0xffaa00, dir: [-0.5, -0.3, -1] },
  blink_back_right: { color: 0xffaa00, dir: [0.5, -0.3, -1] },
  license_plate: { color: 0xffffff, dir: [0, -1, -0.3] },
  brake_lights: { color: 0xff2200, dir: [0, -0.3, -1] },
  rear_fog: { color: 0xff2200, dir: [0, -0.3, -1] },
  side_repeater_left: { color: 0xffaa00, dir: [-1, -0.3, 0] },
  side_repeater_right: { color: 0xffaa00, dir: [1, -0.3, 0] },
}

// ── Window data ──────────────────────────────────────────────
const WINDOW_PARTS = ['window_left_front', 'window_right_front', 'window_left_back', 'window_right_back']
const COSMETIC_WINDOWS = ['windshield_front', 'windshield_back']

interface WindowAnim { mesh: Mesh; initMatrix: Matrix4; travelZ: number }
interface MechanicalAnim { mesh: Mesh; initMatrix: Matrix4; center: Vector3 }

// ── Light show controller ────────────────────────────────────
export class LightShowController {
  parts: Record<string, Mesh> = {}
  spots: Record<string, SpotLight> = {}
  windows: Record<string, WindowAnim> = {}
  trunk: MechanicalAnim | null = null
  mirrors: Record<string, MechanicalAnim & { dir: number }> = {}
  flapMesh: Mesh | null = null

  readonly CYCLE = 75 // total loop duration in seconds

  setup(model: Object3D, scene: Scene) {
    // 1) Map parts
    model.traverse((child) => {
      if (!(child as Mesh).isMesh) return
      const mesh = child as Mesh
      const name = getPartName(mesh)
      if (name) {
        this.parts[name] = mesh
      } else {
        // Body or unknown → body material
        mesh.material = bodyMat
      }
    })

    // 2) Apply initial materials
    for (const [name, mesh] of Object.entries(this.parts)) {
      if (COSMETIC_WINDOWS.includes(name) || WINDOW_PARTS.includes(name)) {
        mesh.material = glassMat
      } else if (LIGHT_TYPE_MAP[name]) {
        mesh.material = getOffMat(name)
      } else if (name === 'flap') {
        mesh.material = flapOff
      } else if (name === 'trunk' || name === 'retro_left' || name === 'retro_right') {
        mesh.material = bodyMat
      } else {
        mesh.material = bodyMat
      }
    }

    // 3) SpotLights
    for (const [partName, def] of Object.entries(SPOT_DEFS)) {
      const mesh = this.parts[partName]
      if (!mesh) continue
      mesh.geometry.computeBoundingBox()
      const center = new Vector3()
      mesh.geometry.boundingBox!.getCenter(center)
      mesh.localToWorld(center)

      const spot = new SpotLight(def.color, 0, 15, Math.PI / 6, 0.5, 2)
      spot.position.copy(center)
      const target = center.clone().add(new Vector3(...def.dir))
      spot.target.position.copy(target)
      scene.add(spot)
      scene.add(spot.target)
      this.spots[partName] = spot
    }

    // 4) Window animation data
    for (const p of WINDOW_PARTS) {
      const mesh = this.parts[p]
      if (!mesh) continue
      mesh.geometry.computeBoundingBox()
      const travelZ = mesh.geometry.boundingBox!.max.z - mesh.geometry.boundingBox!.min.z
      this.windows[p] = { mesh, initMatrix: mesh.matrix.clone(), travelZ }
      mesh.matrixAutoUpdate = false
    }

    // 5) Trunk
    if (this.parts['trunk']) {
      const mesh = this.parts['trunk']
      mesh.geometry.computeBoundingBox()
      const bb = mesh.geometry.boundingBox!
      const center = new Vector3(bb.min.x, (bb.min.y + bb.max.y) / 2, bb.max.z)
      mesh.matrixAutoUpdate = false
      this.trunk = { mesh, initMatrix: mesh.matrix.clone(), center }
    }

    // 6) Mirrors
    for (const side of ['retro_left', 'retro_right'] as const) {
      const mesh = this.parts[side]
      if (!mesh) continue
      mesh.geometry.computeBoundingBox()
      const center = new Vector3()
      mesh.geometry.boundingBox!.getCenter(center)
      mesh.matrixAutoUpdate = false
      this.mirrors[side] = {
        mesh,
        initMatrix: mesh.matrix.clone(),
        center,
        dir: side === 'retro_left' ? 1 : -1,
      }
    }

    // 7) Flap
    this.flapMesh = this.parts['flap'] || null
  }

  // ── Helpers ──────────────────────────────────────────────
  private setLight(part: string, on: boolean) {
    const mesh = this.parts[part]
    if (mesh) mesh.material = on ? getOnMat(part) : getOffMat(part)
    const spot = this.spots[part]
    if (spot) spot.intensity = on ? 5 : 0
  }

  private setLightSmooth(part: string, intensity: number) {
    const mesh = this.parts[part]
    if (!mesh) return
    const clamp = Math.max(0, Math.min(1, intensity))
    if (!mesh.userData._dynMat) {
      mesh.userData._dynMat = getOnMat(part).clone()
    }
    const mat = mesh.userData._dynMat as MeshStandardMaterial
    const offC = (getOffMat(part) as MeshStandardMaterial).color ?? new Color(0x332200)
    const onC = getOnMat(part).color
    mat.color.copy(offC).lerp(onC, clamp)
    mat.emissive.copy(getOnMat(part).emissive).multiplyScalar(clamp)
    mat.emissiveIntensity = 1.5 * clamp
    mesh.material = mat

    const spot = this.spots[part]
    if (spot) spot.intensity = 5 * clamp
  }

  private setWindow(part: string, progress: number) {
    const wd = this.windows[part]
    if (!wd) return
    const p = Math.max(0, Math.min(1, progress))
    const slide = new Matrix4().makeTranslation(0, 0, -wd.travelZ * p)
    wd.mesh.matrix.copy(wd.initMatrix.clone().multiply(slide))
  }

  private setTrunk(progress: number) {
    if (!this.trunk) return
    const p = Math.max(0, Math.min(1, progress))
    const OPEN_ANGLE = -Math.PI / 4
    const pv = this.trunk.center
    const toO = new Matrix4().makeTranslation(-pv.x, -pv.y, -pv.z)
    const rot = new Matrix4().makeRotationY(OPEN_ANGLE * p)
    const fromO = new Matrix4().makeTranslation(pv.x, pv.y, pv.z)
    this.trunk.mesh.matrix.copy(this.trunk.initMatrix.clone().multiply(fromO).multiply(rot).multiply(toO))
  }

  private setMirror(part: string, progress: number) {
    const m = this.mirrors[part]
    if (!m) return
    const p = Math.max(0, Math.min(1, progress))
    const FOLD = Math.PI / 3
    const SLIDE = 0.15
    const c = m.center
    const toO = new Matrix4().makeTranslation(-c.x, -c.y, -c.z)
    const rot = new Matrix4().makeRotationY(FOLD * p * m.dir)
    const sl = new Matrix4().makeTranslation(SLIDE * p * m.dir, 0, 0)
    const fromO = new Matrix4().makeTranslation(c.x, c.y, c.z)
    m.mesh.matrix.copy(m.initMatrix.clone().multiply(fromO).multiply(sl).multiply(rot).multiply(toO))
  }

  private allLightsOff() {
    for (const part of Object.keys(LIGHT_TYPE_MAP)) {
      this.setLight(part, false)
    }
  }

  // ── Easing ─────────────────────────────────────────────
  private easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2 }
  private progress(time: number, start: number, dur: number) {
    return Math.max(0, Math.min(1, (time - start) / dur))
  }

  // ── Light patterns ──────────────────────────────────────
  private readonly BLINKERS_LEFT_TO_RIGHT = [
    'blink_front_left', 'side_repeater_left', 'blink_back_left',
    'blink_back_right', 'side_repeater_right', 'blink_front_right',
  ]

  private readonly HEADLIGHTS = ['light_left_front', 'light_right_front']
  private readonly TAILLIGHTS = ['light_left_back', 'light_right_back', 'brake_lights', 'rear_fog']
  private readonly ALL_LIGHTS = Object.keys(LIGHT_TYPE_MAP)

  // Ping-pong chase: lights travel left→right→left
  private pingPongChase(t: number, speed: number) {
    const seq = this.BLINKERS_LEFT_TO_RIGHT
    const phase = ((t * speed) % 2) // 0→1→2 (1=end, 2=back to start)
    const norm = phase <= 1 ? phase : 2 - phase // 0→1→0
    const activeIdx = Math.floor(norm * (seq.length - 0.01))
    seq.forEach((b, i) => {
      const dist = Math.abs(i - activeIdx)
      this.setLightSmooth(b, dist === 0 ? 1 : dist === 1 ? 0.3 : 0)
    })
  }

  // Front-to-back sweep: headlights → blinkers front → sides → blinkers back → taillights
  private frontToBackSweep(t: number, speed: number) {
    const sweep = [
      this.HEADLIGHTS,
      ['blink_front_left', 'blink_front_right'],
      ['side_repeater_left', 'side_repeater_right'],
      ['blink_back_left', 'blink_back_right'],
      this.TAILLIGHTS,
      ['license_plate'],
    ]
    const phase = ((t * speed) % 2)
    const norm = phase <= 1 ? phase : 2 - phase
    const activeGroup = Math.floor(norm * (sweep.length - 0.01))
    this.ALL_LIGHTS.forEach((l) => {
      const groupIdx = sweep.findIndex((g) => g.includes(l))
      if (groupIdx < 0) { this.setLightSmooth(l, 0); return }
      const dist = Math.abs(groupIdx - activeGroup)
      this.setLightSmooth(l, dist === 0 ? 1 : dist === 1 ? 0.25 : 0)
    })
  }

  // Alternating left/right flash
  private leftRightFlash(t: number, speed: number) {
    const leftOn = Math.sin(t * speed) > 0
    const leftParts = ['light_left_front', 'light_left_back', 'blink_front_left', 'blink_back_left', 'side_repeater_left']
    const rightParts = ['light_right_front', 'light_right_back', 'blink_front_right', 'blink_back_right', 'side_repeater_right']
    leftParts.forEach((l) => this.setLight(l, leftOn))
    rightParts.forEach((l) => this.setLight(l, !leftOn))
    this.setLight('brake_lights', true)
    this.setLight('rear_fog', !leftOn)
    this.setLight('license_plate', leftOn)
  }

  // Wave pulse: smooth sine wave across all lights with phase offset
  private wavePulse(t: number, speed: number, phaseSpread: number) {
    this.ALL_LIGHTS.forEach((l, i) => {
      const v = (Math.sin(t * speed + i * phaseSpread) + 1) / 2
      this.setLightSmooth(l, v)
    })
  }

  // Staccato bursts: rapid on/off with different frequencies per light
  private staccatoBursts(t: number) {
    this.ALL_LIGHTS.forEach((l, i) => {
      const freq = 6 + (i % 4) * 4
      const phase = i * 2.1
      const v = Math.sin(t * freq + phase) > 0.2 ? 1 : 0
      this.setLightSmooth(l, v)
    })
  }

  // Window dance helper
  private animateWindows(t: number, cycleSec: number, maxOpen: number) {
    WINDOW_PARTS.forEach((w, i) => {
      const offset = i * (Math.PI / 2)
      const phase = (t / cycleSec) * Math.PI * 2 + offset
      const wave = (maxOpen - 0.2) * (0.5 - 0.5 * Math.cos(phase))
      this.setWindow(w, maxOpen - wave)
    })
  }

  // ── Main update (called every frame) ───────────────────
  update(elapsed: number) {
    const t = elapsed % this.CYCLE

    // ═══════════════════════════════════════════════════════
    // WINDOWS: dance from 4s to 68s (almost the entire show)
    // ═══════════════════════════════════════════════════════
    if (t >= 4 && t < 68) {
      // Ease in the dance amplitude over the first 3s
      const windowFadeIn = this.easeInOut(this.progress(t, 4, 3))
      // Vary cycle speed and amplitude across phases for variety
      let cycleSec = 3.5
      let maxOpen = 0.7
      if (t >= 30 && t < 50) { cycleSec = 2.5; maxOpen = 0.85 } // faster during intense phases
      if (t >= 50 && t < 60) { cycleSec = 4.5; maxOpen = 0.6 }  // slower, elegant
      this.animateWindows(t, cycleSec, maxOpen * windowFadeIn)

      // Ease out over last 3s
      if (t >= 65) {
        const windowFadeOut = 1 - this.easeInOut(this.progress(t, 65, 3))
        WINDOW_PARTS.forEach((w) => {
          const wd = this.windows[w]
          if (!wd) return
          // Scale current position toward 0
          this.setWindow(w, 0)
        })
        // Re-animate at reduced amplitude
        this.animateWindows(t, 3.5, 0.7 * windowFadeOut)
      }
    } else {
      for (const w of WINDOW_PARTS) this.setWindow(w, 0)
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 1 (0–6s): Wake up — sequential headlight flash
    // ═══════════════════════════════════════════════════════
    if (t < 6) {
      this.allLightsOff()

      // Flash left headlight, then right, then both
      if (t < 1.5) {
        const v = (Math.sin(t * 12) + 1) / 2
        this.setLightSmooth('light_left_front', v)
      } else if (t < 3) {
        const v = (Math.sin(t * 12) + 1) / 2
        this.setLightSmooth('light_right_front', v)
      } else if (t < 4.5) {
        const v = (Math.sin(t * 10) + 1) / 2
        this.setLightSmooth('light_left_front', v)
        this.setLightSmooth('light_right_front', v)
      } else {
        // Taillights quick flash
        const v = (Math.sin(t * 14) + 1) / 2
        this.setLightSmooth('light_left_back', v)
        this.setLightSmooth('light_right_back', v)
        this.setLightSmooth('brake_lights', v)
      }
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 2 (6–14s): Blinker ping-pong chase
    // ═══════════════════════════════════════════════════════
    if (t >= 6 && t < 14) {
      // Headlights pulse gently
      const headPulse = (Math.sin(t * 3) + 1) / 2 * 0.6 + 0.3
      this.setLightSmooth('light_left_front', headPulse)
      this.setLightSmooth('light_right_front', headPulse)

      // Taillights counter-pulse
      this.setLightSmooth('light_left_back', 1 - headPulse * 0.7)
      this.setLightSmooth('light_right_back', 1 - headPulse * 0.7)
      this.setLightSmooth('brake_lights', (Math.sin(t * 5) + 1) / 2)
      this.setLightSmooth('rear_fog', (Math.sin(t * 5 + 1) + 1) / 2)
      this.setLightSmooth('license_plate', (Math.sin(t * 4) + 1) / 2)

      this.pingPongChase(t, 1.2)
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 3 (14–22s): Front-to-back sweep
    // ═══════════════════════════════════════════════════════
    if (t >= 14 && t < 22) {
      this.frontToBackSweep(t, 0.8)
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 4 (22–30s): Left/right alternating flash
    // ═══════════════════════════════════════════════════════
    if (t >= 22 && t < 30) {
      // Start slow, accelerate
      const speed = 6 + (t - 22) * 1.5
      this.leftRightFlash(t, speed)
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 5 (30–40s): Chaotic wave pulse + mirrors fold
    // ═══════════════════════════════════════════════════════
    if (t >= 30 && t < 40) {
      this.wavePulse(t, 5, 1.2)

      // Mirrors fold in/out (30-34 fold, 34-36 hold, 36-40 unfold)
      let mirP = 0
      if (t < 34) mirP = this.easeInOut(this.progress(t, 30, 4))
      else if (t < 36) mirP = 1
      else mirP = 1 - this.easeInOut(this.progress(t, 36, 4))
      this.setMirror('retro_left', mirP)
      this.setMirror('retro_right', mirP)
    } else if (t < 30 || t >= 40) {
      // Only reset mirrors outside trunk phase too
      if (t < 40 || t >= 58) {
        this.setMirror('retro_left', 0)
        this.setMirror('retro_right', 0)
      }
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 6 (40–58s): Trunk opens → long dance sequence
    // Trunk stays open while lights go wild
    // ═══════════════════════════════════════════════════════
    if (t >= 40 && t < 58) {
      // Trunk: open (40-43), hold open (43-53), close (53-57)
      let trunkP = 0
      if (t < 43) trunkP = this.easeInOut(this.progress(t, 40, 3))
      else if (t < 53) trunkP = 1
      else trunkP = 1 - this.easeInOut(this.progress(t, 53, 4))
      this.setTrunk(trunkP)

      // Mirrors dance while trunk is open (fold/unfold cycles)
      if (t >= 43 && t < 53) {
        const mirCycle = ((t - 43) % 5) / 5
        const mirWave = mirCycle <= 0.5 ? mirCycle * 2 : 2 - mirCycle * 2
        this.setMirror('retro_left', this.easeInOut(mirWave))
        this.setMirror('retro_right', this.easeInOut(mirWave))
      }

      // Flap glow pulse
      if (this.flapMesh) {
        const flapPulse = (Math.sin(t * 4) + 1) / 2
        if (!this.flapMesh.userData._flapDyn) {
          this.flapMesh.userData._flapDyn = flapGlow.clone()
        }
        const fm = this.flapMesh.userData._flapDyn as MeshStandardMaterial
        fm.emissiveIntensity = 0.3 + flapPulse * 0.7
        fm.opacity = 0.6 + flapPulse * 0.25
        this.flapMesh.material = fm
      }

      // Light patterns cycle during trunk dance
      const subPhase = t - 40
      if (subPhase < 4) {
        // Staccato bursts
        this.staccatoBursts(t)
      } else if (subPhase < 8) {
        // Fast ping-pong
        this.pingPongChase(t, 2)
        // Head/tail pulse independently
        this.HEADLIGHTS.forEach((l) => this.setLightSmooth(l, (Math.sin(t * 8) + 1) / 2))
        this.TAILLIGHTS.forEach((l) => this.setLightSmooth(l, (Math.sin(t * 8 + Math.PI) + 1) / 2))
      } else if (subPhase < 12) {
        // Fast left/right
        this.leftRightFlash(t, 10 + Math.sin(t) * 4)
      } else if (subPhase < 15) {
        // Wave pulse fast
        this.wavePulse(t, 8, 0.8)
      } else {
        // Grand staccato into sweep
        if (Math.sin(t * 2) > 0) {
          this.staccatoBursts(t)
        } else {
          this.frontToBackSweep(t, 1.5)
        }
      }
    } else {
      if (t < 40 || t >= 58) {
        this.setTrunk(0)
      }
      if (this.flapMesh && (t < 40 || t >= 58)) {
        this.flapMesh.material = flapOff
      }
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 7 (58–68s): Grand finale — everything strobes
    // ═══════════════════════════════════════════════════════
    if (t >= 58 && t < 68) {
      // Intensity builds over time
      const build = this.easeInOut(this.progress(t, 58, 5))
      const baseSpeed = 4 + build * 8

      this.ALL_LIGHTS.forEach((l, i) => {
        const phase = i * 0.9
        const freq = baseSpeed + (i % 3) * 2
        const v = (Math.sin(t * freq + phase) + 1) / 2
        this.setLightSmooth(l, v * (0.4 + build * 0.6))
      })

      // Final 3s: rapid full strobe
      if (t >= 65) {
        this.staccatoBursts(t)
      }
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 8 (68–72s): Fade out
    // ═══════════════════════════════════════════════════════
    if (t >= 68 && t < 72) {
      const fadeOut = 1 - this.easeInOut(this.progress(t, 68, 4))
      this.ALL_LIGHTS.forEach((l, i) => {
        const flicker = (Math.sin(t * (10 - fadeOut * 8) + i * 1.5) + 1) / 2
        this.setLightSmooth(l, flicker * fadeOut)
      })
      if (this.flapMesh) this.flapMesh.material = flapOff
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 9 (72–75s): Dark pause
    // ═══════════════════════════════════════════════════════
    if (t >= 72) {
      this.allLightsOff()
      if (this.flapMesh) this.flapMesh.material = flapOff
    }
  }
}
