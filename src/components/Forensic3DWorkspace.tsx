import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { 
  Plus, 
  Trash2, 
  FileCode, 
  FileSpreadsheet, 
  Upload, 
  HelpCircle, 
  Crosshair, 
  Sparkles, 
  Ruler, 
  Download, 
  Layers, 
  AlertTriangle,
  Info,
  CheckCircle,
  FolderOpen,
  Camera,
  MapPin,
  Maximize2
} from 'lucide-react';
import { EvidenceMarker, Trajectory } from '../types';

interface Forensic3DWorkspaceProps {
  markers: EvidenceMarker[];
  setMarkers: React.Dispatch<React.SetStateAction<EvidenceMarker[]>>;
  trajectories: Trajectory[];
  setTrajectories: React.Dispatch<React.SetStateAction<Trajectory[]>>;
  caseInfo: {
    id: string;
    title: string;
    date: string;
    location: string;
    operator: string;
    description: string;
  };
  setCaseInfo: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string;
    date: string;
    location: string;
    operator: string;
    description: string;
  }>>;
}

export default function Forensic3DWorkspace({
  markers,
  setMarkers,
  trajectories,
  setTrajectories,
  caseInfo,
  setCaseInfo
}: Forensic3DWorkspaceProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  
  // Custom objects refs for cleanup & updates
  const floorPlaneRef = useRef<THREE.Mesh | null>(null);
  const defaultEnvRef = useRef<THREE.Group | null>(null);
  const customModelRef = useRef<THREE.Object3D | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const trajectoriesGroupRef = useRef<THREE.Group | null>(null);
  const laserScannerRef = useRef<THREE.GridHelper | null>(null);
  const measurementLineRef = useRef<THREE.Line | null>(null);

  // Component states
  const [isLaserOn, setIsLaserOn] = useState(false);
  const [scannerYDir, setScannerYDir] = useState(1); // 1 = up, -1 = down
  const [selectedTag, setSelectedTag] = useState<string>("Bossolo");
  const [measurementFrom, setMeasurementFrom] = useState<number | null>(null);
  const [measurementTo, setMeasurementTo] = useState<number | null>(null);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [loadingText, setLoadingText] = useState<string>("");

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Pre-configured evidence types
  const tagColors: Record<string, string> = {
    "Bossolo": "#fbbf24", // Yellow
    "Arma": "#ef4444",    // Red
    "Impronta": "#60a5fa", // Blue
    "DNA": "#a855f7",     // Purple
    "Traccia Ematica": "#dc2626", // Deep Red
    "Danno da Impatto": "#10b981" // Emerald
  };

  // Helper function to create canvas texture for a numbered forensic tent marker
  const createMarkerTexture = (num: number, color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fill background (bright yellow/orange card for high contrast)
    ctx.fillStyle = '#fef08a'; // custom yellow light
    ctx.fillRect(0, 0, 256, 256);

    // Draw border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, 242, 242);

    // Draw secondary banner
    ctx.fillStyle = '#000000';
    ctx.fillRect(7, 7, 242, 50);

    // Draw FORA brand text
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FORA SYSTEM', 128, 40);

    // Draw big number
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 120px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(num), 128, 145);

    // Draw scale ticks at bottom
    ctx.fillStyle = '#000000';
    ctx.fillRect(30, 215, 196, 6);
    for (let i = 0; i <= 4; i++) {
      const tickX = 30 + (i * 49);
      ctx.fillRect(tickX, 205, 4, 15);
    }
    ctx.font = '14px monospace';
    ctx.fillText('cm 0   1   2   3   4', 128, 238);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // Function to build a custom sloped 3D Forensic Tent Mesh
  const buildForensicTentMesh = (id: number) => {
    const tentGroup = new THREE.Group();
    tentGroup.name = `tent-${id}`;

    // Define geometry for a sloped roof tent (2 sloped side planes)
    const texture = createMarkerTexture(id, '#facc15');
    
    // Sloped Side A
    const sideAGeo = new THREE.PlaneGeometry(0.3, 0.4);
    const sideAMat = new THREE.MeshStandardMaterial({
      map: texture || null,
      side: THREE.DoubleSide,
      roughness: 0.4,
      metalness: 0.1
    });
    const sideA = new THREE.Mesh(sideAGeo, sideAMat);
    sideA.rotation.y = 0;
    sideA.rotation.x = -Math.PI / 6; // Angle back
    sideA.position.set(0, 0.17, 0.1);
    sideA.castShadow = true;
    sideA.receiveShadow = true;
    tentGroup.add(sideA);

    // Sloped Side B (opposite side)
    const sideBGeo = new THREE.PlaneGeometry(0.3, 0.4);
    // Let's create an identical or rotated material
    const sideB = new THREE.Mesh(sideBGeo, sideAMat);
    sideB.rotation.y = Math.PI; // Spin 180
    sideB.rotation.x = -Math.PI / 6;
    sideB.position.set(0, 0.17, -0.1);
    sideB.castShadow = true;
    sideB.receiveShadow = true;
    tentGroup.add(sideB);

    // Add a small metal rod handle on top
    const handleGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.32);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0, 0.34, 0);
    tentGroup.add(handle);

    // Add a small colored pulsating indicator ring underneath/next to the tent representing the tag type
    const markerData = markers.find(m => m.id === id);
    const tagColor = markerData ? tagColors[markerData.tag] : '#fbbf24';
    
    const ringGeo = new THREE.RingGeometry(0.14, 0.18, 16);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(tagColor), 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0.005, 0);
    tentGroup.add(ring);

    return tentGroup;
  };

  // Init Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16); // Match Slate-950 dark background
    scene.fog = new THREE.FogExp2(0x090d16, 0.04);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
    camera.position.set(6, 6, 8);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls Setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.01; // Prevent going underground
    controls.minDistance = 1;
    controls.maxDistance = 25;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    // Primary Spotlight (investigation flashlight rig)
    const spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.set(5, 12, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.4;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.bias = -0.0005;
    scene.add(spotLight);

    // Fill soft blue tech light
    const fillLight = new THREE.DirectionalLight(0x3b82f6, 0.6);
    fillLight.position.set(-6, 8, -6);
    scene.add(fillLight);

    // Accent emerald grid light
    const gridLight = new THREE.PointLight(0x10b981, 0.8, 12);
    gridLight.position.set(0, 4, 0);
    scene.add(gridLight);

    // 6. Grid Calibration Helper (Grid system)
    const gridHelper = new THREE.GridHelper(20, 20, 0x10b981, 0x1e293b);
    gridHelper.position.y = 0.001; // avoid z-fighting
    scene.add(gridHelper);

    // 7. Base Environment Groups
    const defaultEnv = new THREE.Group();
    defaultEnv.name = "default-env";
    scene.add(defaultEnv);
    defaultEnvRef.current = defaultEnv;

    const markersGroup = new THREE.Group();
    markersGroup.name = "markers-group";
    scene.add(markersGroup);
    markersGroupRef.current = markersGroup;

    const trajectoriesGroup = new THREE.Group();
    trajectoriesGroup.name = "trajectories-group";
    scene.add(trajectoriesGroup);
    trajectoriesGroupRef.current = trajectoriesGroup;

    // Floor Plane (invisible boundary for clicking & shadows)
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: 0x0f172a, 
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const floorPlane = new THREE.Mesh(floorGeo, floorMat);
    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.receiveShadow = true;
    floorPlane.name = "floor";
    scene.add(floorPlane);
    floorPlaneRef.current = floorPlane;

    // 8. Build default Crime Scene interior
    // Table
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, 0, 0);

    const tableTopGeo = new THREE.BoxGeometry(3.2, 0.1, 1.8);
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.y = 0.95;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.9);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 });
    const legPositions = [
      { x: 1.4, z: 0.7 }, { x: -1.4, z: 0.7 },
      { x: 1.4, z: -0.7 }, { x: -1.4, z: -0.7 }
    ];
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(pos.x, 0.45, pos.z);
      leg.castShadow = true;
      tableGroup.add(leg);
    });
    defaultEnv.add(tableGroup);

    // Wall (behind table) to hold bullet impacts
    const backWallGeo = new THREE.BoxGeometry(10, 5, 0.2);
    const backWallMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, 2.5, -4.5);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    defaultEnv.add(backWall);

    // Pre-loaded mockup firearm on floor
    const pistolGroup = new THREE.Group();
    pistolGroup.position.set(-1.8, 0.06, 1.4);
    pistolGroup.rotation.y = Math.PI / 4;
    
    const barrelGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.34);
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.85, roughness: 0.2 });
    const barrel = new THREE.Mesh(barrelGeo, gunMat);
    barrel.rotation.z = Math.PI / 2;
    pistolGroup.add(barrel);

    const handleGeo = new THREE.BoxGeometry(0.05, 0.16, 0.035);
    const handle = new THREE.Mesh(handleGeo, gunMat);
    handle.position.set(-0.1, -0.07, 0);
    handle.rotation.z = -Math.PI / 5;
    pistolGroup.add(handle);
    defaultEnv.add(pistolGroup);

    // Tilted over chair
    const chairGroup = new THREE.Group();
    chairGroup.position.set(1.5, 0.3, -1.0);
    chairGroup.rotation.set(1.2, 0.3, -0.4); // Tumbled over state

    const seatGeo = new THREE.BoxGeometry(0.8, 0.06, 0.8);
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const seat = new THREE.Mesh(seatGeo, seatMat);
    seat.position.y = 0.5;
    seat.castShadow = true;
    chairGroup.add(seat);

    const backrestGeo = new THREE.BoxGeometry(0.06, 0.6, 0.8);
    const backrest = new THREE.Mesh(backrestGeo, seatMat);
    backrest.position.set(-0.37, 0.8, 0);
    backrest.castShadow = true;
    chairGroup.add(backrest);

    // Chair legs
    const chairLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5);
    const chairLeg1 = new THREE.Mesh(chairLegGeo, seatMat);
    chairLeg1.position.set(0.3, 0.25, 0.3);
    chairGroup.add(chairLeg1);
    const chairLeg2 = new THREE.Mesh(chairLegGeo, seatMat);
    chairLeg2.position.set(-0.3, 0.25, 0.3);
    chairGroup.add(chairLeg2);
    const chairLeg3 = new THREE.Mesh(chairLegGeo, seatMat);
    chairLeg3.position.set(0.3, 0.25, -0.3);
    chairGroup.add(chairLeg3);
    const chairLeg4 = new THREE.Mesh(chairLegGeo, seatMat);
    chairLeg4.position.set(-0.3, 0.25, -0.3);
    chairGroup.add(chairLeg4);

    defaultEnv.add(chairGroup);

    // Bullet impacts (little red rings on the wall)
    const impactPositions = [
      { x: -0.8, y: 3.1, z: -4.38 },
      { x: 1.2, y: 2.3, z: -4.38 },
      { x: 2.1, y: 1.8, z: -4.38 }
    ];
    impactPositions.forEach((pos, idx) => {
      const ringGeo = new THREE.RingGeometry(0.03, 0.05, 8);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(pos.x, pos.y, pos.z);
      defaultEnv.add(ring);
    });

    // 9. Laser Scanner Line Grid (animated scanning plane)
    const laserScanner = new THREE.GridHelper(16, 16, 0x10b981, 0x10b981);
    laserScanner.position.y = 0;
    laserScanner.visible = false;
    scene.add(laserScanner);
    laserScannerRef.current = laserScanner;

    // 10. Animation Loop
    let lastTime = 0;
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Pulse ring scaling on markers
      if (markersGroup.children.length > 0) {
        markersGroup.children.forEach(marker => {
          const ringMesh = marker.getObjectByName('ring') || marker.children.find(c => c instanceof THREE.Mesh && c.geometry instanceof THREE.RingGeometry);
          if (ringMesh) {
            const scale = 1 + Math.sin(time * 0.005) * 0.15;
            ringMesh.scale.set(scale, scale, 1);
          }
          // Slight bobbing on the sloped tent
          const tentA = marker.children[0];
          const tentB = marker.children[1];
          if (tentA && tentB) {
            const bob = Math.sin(time * 0.003 + marker.position.x) * 0.008;
            tentA.position.y = 0.17 + bob;
            tentB.position.y = 0.17 + bob;
          }
        });
      }

      // Animate Laser Scanner up and down
      if (laserScanner.visible) {
        let newY = laserScanner.position.y + (0.8 * delta * scannerYDir);
        if (newY > 4.5) {
          newY = 4.5;
          setScannerYDir(-1);
        } else if (newY < 0.02) {
          newY = 0.02;
          setScannerYDir(1);
        }
        laserScanner.position.y = newY;
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    animationFrameIdRef.current = requestAnimationFrame(animate);

    // 11. Resize Event
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      // Recursively dispose geometries & materials in scene
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (object.material instanceof Array) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      });
    };
  }, []);

  // Sync state markers array to 3D meshes in scene
  useEffect(() => {
    const scene = sceneRef.current;
    const markersGroup = markersGroupRef.current;
    if (!scene || !markersGroup) return;

    // Clear all existing markers from the group
    while (markersGroup.children.length > 0) {
      markersGroup.remove(markersGroup.children[0]);
    }

    // Rebuild all markers based on current react state
    markers.forEach(marker => {
      const tentMesh = buildForensicTentMesh(marker.id);
      tentMesh.position.set(marker.x, marker.y, marker.z);
      markersGroup.add(tentMesh);
    });
  }, [markers]);

  // Sync state trajectories array to 3D lines in scene
  useEffect(() => {
    const scene = sceneRef.current;
    const trajectoriesGroup = trajectoriesGroupRef.current;
    if (!scene || !trajectoriesGroup) return;

    // Clear existing
    while (trajectoriesGroup.children.length > 0) {
      trajectoriesGroup.remove(trajectoriesGroup.children[0]);
    }

    // Render trajectories as glowing laser strings and impact points
    trajectories.forEach(traj => {
      const points = [
        new THREE.Vector3(traj.startX, traj.startY, traj.startZ),
        new THREE.Vector3(traj.endX, traj.endY, traj.endZ)
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      
      // Neon Crimson glowing line material
      const lineMat = new THREE.LineBasicMaterial({ 
        color: 0xef4444, 
        linewidth: 2,
        transparent: true,
        opacity: 0.95
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.name = `trajectory-line-${traj.id}`;
      trajectoriesGroup.add(line);

      // Impact sphere
      const sphereGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(traj.endX, traj.endY, traj.endZ);
      trajectoriesGroup.add(sphere);

      // Start origin sphere
      const startSphereGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const startSphereMat = new THREE.MeshBasicMaterial({ color: 0xf87171 });
      const startSphere = new THREE.Mesh(startSphereGeo, startSphereMat);
      startSphere.position.set(traj.startX, traj.startY, traj.startZ);
      trajectoriesGroup.add(startSphere);
    });
  }, [trajectories]);

  // Handle click on canvas to place a marker
  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const mount = mountRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    if (!mount || !renderer || !camera || !scene) return;

    // Get click coordinates relative to the canvas bounding rect
    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / mount.clientWidth) * 2 - 1;
    const y = -((event.clientY - rect.top) / mount.clientHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    // We can intersect with floor plane, backWall, table, or any custom loaded model
    const objectsToIntersect: THREE.Object3D[] = [];
    if (floorPlaneRef.current) objectsToIntersect.push(floorPlaneRef.current);
    if (defaultEnvRef.current && defaultEnvRef.current.visible) {
      objectsToIntersect.push(defaultEnvRef.current);
    }
    if (customModelRef.current) {
      objectsToIntersect.push(customModelRef.current);
    }

    const intersects = raycaster.intersectObjects(objectsToIntersect, true);

    if (intersects.length > 0) {
      // Find the first intersection that is not a marker or trajectory itself
      const validIntersect = intersects.find(item => {
        let parent: THREE.Object3D | null = item.object;
        while (parent) {
          if (parent.name.startsWith('tent-') || parent.name.startsWith('trajectory-')) {
            return false;
          }
          parent = parent.parent;
        }
        return true;
      });

      if (validIntersect) {
        const point = validIntersect.point;
        
        // Build new evidence record
        const nextId = markers.length > 0 ? Math.max(...markers.map(m => m.id)) + 1 : 1;
        const tagName = selectedTag;
        
        const newMarker: EvidenceMarker = {
          id: nextId,
          name: `Reperto #${String(nextId).padStart(2, '0')}`,
          x: parseFloat(point.x.toFixed(3)),
          y: parseFloat(point.y.toFixed(3)),
          z: parseFloat(point.z.toFixed(3)),
          tag: tagName,
          description: `Rilevamento spaziale di tipo ${tagName}.`
        };

        setMarkers(prev => [...prev, newMarker]);
        showNotification(`Inserito ${newMarker.name} alla quota Y: ${newMarker.y.toFixed(2)}m`, 'success');
      }
    }
  };

  // Toggle Laser Scanning
  const toggleLaserScanner = () => {
    setIsLaserOn(!isLaserOn);
    if (laserScannerRef.current) {
      laserScannerRef.current.visible = !isLaserOn;
      laserScannerRef.current.position.y = 0;
    }
    showNotification(isLaserOn ? "Scanner laser spento" : "Scanner laser calibrato e attivo", "info");
  };

  // Generate Bullet Trajectory
  const generateTrajectory = () => {
    const nextId = trajectories.length > 0 ? Math.max(...trajectories.map(t => t.id)) + 1 : 1;
    
    // Simulate bullet coming from room front (approx Z ~ 4, Y ~ 1.5 to 2.2) and striking back wall (Z = -4.38)
    const startX = (Math.random() * 4 - 2); // random X
    const startY = 1.4 + (Math.random() * 1.0); // random Y weapon height
    const startZ = 4.0;

    const endX = (Math.random() * 3 - 1.5); // hit wall near center
    const endY = 0.5 + (Math.random() * 2.5); // hit height
    const endZ = -4.38; // exact wall face

    // Calculate angles
    const dx = endX - startX;
    const dy = endY - startY;
    const dz = endZ - startZ;
    const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
    
    const elevation = parseFloat((Math.atan2(dy, horizontalDistance) * (180 / Math.PI)).toFixed(1));
    const azimuth = parseFloat((Math.atan2(dx, dz) * (180 / Math.PI)).toFixed(1));

    const newTrajectory: Trajectory = {
      id: nextId,
      startX: parseFloat(startX.toFixed(3)),
      startY: parseFloat(startY.toFixed(3)),
      startZ: parseFloat(startZ.toFixed(3)),
      endX: parseFloat(endX.toFixed(3)),
      endY: parseFloat(endY.toFixed(3)),
      endZ: parseFloat(endZ.toFixed(3)),
      angleAzimuth: azimuth,
      angleElevation: elevation,
      confidence: 96.4,
      type: "Balistica"
    };

    setTrajectories(prev => [...prev, newTrajectory]);
    showNotification(`Calcolo balistico completato: Angolo ${elevation}°`, 'success');
  };

  // Calculate measurement between two markers
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing measurement line
    if (measurementLineRef.current) {
      scene.remove(measurementLineRef.current);
      measurementLineRef.current = null;
    }

    if (measurementFrom !== null && measurementTo !== null && measurementFrom !== measurementTo) {
      const m1 = markers.find(m => m.id === measurementFrom);
      const m2 = markers.find(m => m.id === measurementTo);

      if (m1 && m2) {
        // Compute distance
        const dx = m1.x - m2.x;
        const dy = m1.y - m2.y;
        const dz = m1.z - m2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        setCalculatedDistance(dist);

        // Add visual line in 3D scene
        const points = [
          new THREE.Vector3(m1.x, m1.y + 0.1, m1.z),
          new THREE.Vector3(m2.x, m2.y + 0.1, m2.z)
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineDashedMaterial({
          color: 0x10b981, // Emerald green measuring tape
          dashSize: 0.15,
          gapSize: 0.08
        });
        const line = new THREE.Line(lineGeo, lineMat);
        line.computeLineDistances();
        scene.add(line);
        measurementLineRef.current = line;
      }
    } else {
      setCalculatedDistance(null);
    }
  }, [measurementFrom, measurementTo, markers]);

  // Handle uploaded background floor image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoadingText("Mappatura dell'immagine sul piano...");
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgData = e.target?.result as string;
      const textureLoader = new THREE.TextureLoader();
      
      textureLoader.load(imgData, (texture) => {
        if (floorPlaneRef.current) {
          const material = floorPlaneRef.current.material as THREE.MeshStandardMaterial;
          material.color.setHex(0xffffff); // Clear base gray color to reveal true texture
          material.map = texture;
          material.needsUpdate = true;
          setLoadingText("");
          showNotification("Immagine di rilievo applicata con successo alla planimetria 3D!", "success");
        }
      }, undefined, () => {
        setLoadingText("");
        showNotification("Errore nel caricamento della texture.", "error");
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle uploaded 3D Models (.gltf, .glb, .obj)
  const handleModelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    setLoadingText("Elaborazione e parsing della mesh tridimensionale...");

    const reader = new FileReader();

    if (extension === 'glb' || extension === 'gltf') {
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const data = e.target?.result as ArrayBuffer;
        const loader = new GLTFLoader();
        loader.parse(data, '', (gltf) => {
          setupCustom3DModel(gltf.scene);
        }, (err) => {
          console.error(err);
          setLoadingText("");
          showNotification("Errore nel parsing del modello GLB/GLTF.", "error");
        });
      };
    } else if (extension === 'obj') {
      reader.readAsText(file);
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const loader = new OBJLoader();
        try {
          const object = loader.parse(text);
          setupCustom3DModel(object);
        } catch (err) {
          console.error(err);
          setLoadingText("");
          showNotification("Errore nel caricamento del file OBJ.", "error");
        }
      };
    } else {
      setLoadingText("");
      showNotification("Formato file non supportato. Utilizzare .obj, .gltf o .glb", "error");
    }
  };

  const setupCustom3DModel = (model: THREE.Object3D) => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove old custom model if any
    if (customModelRef.current) {
      scene.remove(customModelRef.current);
    }

    // Hide default room mockup elements
    if (defaultEnvRef.current) {
      defaultEnvRef.current.visible = false;
    }

    customModelRef.current = model;

    // Enable shadows and apply generic visible forensic clay materials if needed
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (!child.material) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x64748b, // slate grey forensic clay
            roughness: 0.8,
            metalness: 0.1
          });
        }
      }
    });

    // Compute bounding box to scale model nicely into our 20m grid
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const targetDimension = 11.0; // scale to fit inside table range comfortably
    const scale = maxDim > 0 ? targetDimension / maxDim : 1;
    model.scale.set(scale, scale, scale);

    // Reposition centered on floor (Z=0, Y=0)
    model.position.set(-center.x * scale, -box.min.y * scale + 0.01, -center.z * scale);
    scene.add(model);

    setLoadingText("");
    showNotification("Nuova mesh fotogrammetrica 3D importata con successo!", "success");
  };

  // Reset entire scene
  const resetEntireWorkspace = () => {
    setMarkers([]);
    setTrajectories([]);
    setMeasurementFrom(null);
    setMeasurementTo(null);
    setCalculatedDistance(null);

    // Remove custom uploaded models, restore defaults
    const scene = sceneRef.current;
    if (scene) {
      if (customModelRef.current) {
        scene.remove(customModelRef.current);
        customModelRef.current = null;
      }
      if (defaultEnvRef.current) {
        defaultEnvRef.current.visible = true;
      }
      if (floorPlaneRef.current) {
        const material = floorPlaneRef.current.material as THREE.MeshStandardMaterial;
        material.map = null;
        material.color.setHex(0x0f172a);
        material.needsUpdate = true;
      }
      if (measurementLineRef.current) {
        scene.remove(measurementLineRef.current);
        measurementLineRef.current = null;
      }
    }
    showNotification("Simulatore resettato allo stato di default", "info");
  };

  // Export Case File as JSON Telemetry
  const exportCaseAsJSON = () => {
    if (markers.length === 0 && trajectories.length === 0) {
      showNotification("Dossier vuoto. Inserisci reperti prima di esportare.", "error");
      return;
    }

    const payload = {
      caseMetadata: caseInfo,
      systemVersion: "FORA_v1.4.2_Enterprise",
      calibrationScale: "1:1 METRICA_CONTROLLATA",
      exportTimestamp: new Date().toISOString(),
      evidenceMarkers: markers,
      ballisticTrajectories: trajectories
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `FORA_Dossier_Caso_${caseInfo.id || '982-F'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification("Dati telemetrici JSON esportati con successo!", "success");
  };

  // Export Courthouse Forensic Report HTML
  const exportCourthouseReport = () => {
    if (markers.length === 0) {
      showNotification("Registra almeno un reperto prima di generare il report.", "error");
      return;
    }

    const reportHtml = `
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <title>FORA - Relazione Tecnica d'Indagine Forense</title>
        <style>
          body { font-family: 'Courier New', Courier, monospace; color: #0f172a; padding: 50px; background-color: #ffffff; line-height: 1.5; }
          .header { border-bottom: 3px double #000; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
          .title { font-size: 26px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin: 0; }
          .subtitle { font-size: 14px; color: #475569; margin: 5px 0 0 0; font-style: italic; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 40px; font-size: 13px; }
          .meta-item { border-bottom: 1px dashed #cbd5e1; padding: 6px 0; }
          .section-title { font-size: 18px; font-weight: bold; border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-top: 30px; margin-bottom: 15px; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 30px; }
          th, td { border: 1px solid #000000; padding: 8px 12px; text-align: left; font-size: 12px; }
          th { background-color: #f1f5f9; text-transform: uppercase; font-weight: bold; }
          .notes-box { background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; font-size: 12px; margin-bottom: 30px; }
          .signature-box { display: flex; justify-content: space-between; margin-top: 80px; font-size: 12px; }
          .sig-line { width: 220px; border-top: 1px solid #000; text-align: center; padding-top: 5px; margin-top: 40px; }
          @media print {
            body { padding: 20px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Dossier di Ricostruzione Forense Spaziale</div>
          <div class="subtitle">FORA - Forensic Open Reconstruction & Analysis System</div>
        </div>

        <div class="meta-grid">
          <div class="meta-item"><strong>REGISTRO PROCEDIMENTO CASO:</strong> # ${caseInfo.id || "N/D"}</div>
          <div class="meta-item"><strong>DATA ACQUISIZIONE:</strong> ${caseInfo.date || "N/D"}</div>
          <div class="meta-item"><strong>DENOMINAZIONE CASO:</strong> ${caseInfo.title || "N/D"}</div>
          <div class="meta-item"><strong>LOCALITÀ SCENA:</strong> ${caseInfo.location || "N/D"}</div>
          <div class="meta-item"><strong>OPERATORE RESPONSABILE:</strong> ${caseInfo.operator || "N/D"}</div>
          <div class="meta-item"><strong>STATO DI VALIDAZIONE:</strong> CALIBRATO - SCALA REALE 1:1</div>
        </div>

        <div class="section-title">Descrizione Generale del Caso</div>
        <p style="font-size: 12px; text-align: justify; margin-bottom: 35px;">
          ${caseInfo.description || "Nessuna descrizione specificata nel dossier digitale."}
        </p>

        <div class="section-title">Dossier Metrico Reperti Georeferenziati</div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoria Reperto</th>
              <th>Ascissa X (m)</th>
              <th>Ordinata Y (m)</th>
              <th>Quota Z (m)</th>
              <th>Descrizione Verbale sul Campo</th>
            </tr>
          </thead>
          <tbody>
            ${markers.map(m => `
              <tr>
                <td><strong>#${String(m.id).padStart(2, '0')}</strong></td>
                <td>${m.tag.toUpperCase()}</td>
                <td>${m.x.toFixed(3)}</td>
                <td>${m.y.toFixed(3)}</td>
                <td>${m.z.toFixed(3)}</td>
                <td>${m.description}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        ${trajectories.length > 0 ? `
          <div class="section-title">Rilievo Traiettorie Balistiche e Vettori</div>
          <table>
            <thead>
              <tr>
                <th>Vettore ID</th>
                <th>Origine XYZ (m)</th>
                <th>Impatto XYZ (m)</th>
                <th>Azimuth (°)</th>
                <th>Elevazione (°)</th>
                <th>Indice Attendibilità</th>
              </tr>
            </thead>
            <tbody>
              ${trajectories.map(t => `
                <tr>
                  <td>TRJ-${t.id}</td>
                  <td>[${t.startX}, ${t.startY}, ${t.startZ}]</td>
                  <td>[${t.endX}, ${t.endY}, ${t.endZ}]</td>
                  <td>${t.angleAzimuth}°</td>
                  <td>${t.angleElevation}°</td>
                  <td>${t.confidence}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}

        <div class="section-title">Clausola di Certificazione Scientifica</div>
        <div class="notes-box">
          Le misurazioni spaziali tridimensionali e i vettori balistici registrati in questo verbale sono stati elaborati mediante l'ecosistema digitale FORA. Il core applicativo adotta l'ingegneria del software open-source per la fotogrammetria e il rendering grafico real-time (motori Meshroom, Blender e Godot). Ai sensi della Legge 397/2000 sulle Indagini Difensive nel codice di procedura penale italiano, le formule geometriche utilizzate sono pubbliche, riproducibili, verificabili dalle parti ed esenti da vincoli o alterazioni di sistemi a scatola chiusa proprietari.
        </div>

        <div class="signature-box">
          <div>
            Luogo e Data:<br>
            ____________________________
          </div>
          <div class="sig-line">
            Firma dell'Operatore Forense<br>
            (${caseInfo.operator || "Perito Responsabile"})
          </div>
        </div>

        <div style="text-align: center; margin-top: 60px;">
          <button onclick="window.print()" style="background-color: #0f172a; color: #ffffff; padding: 10px 24px; border: none; font-family: monospace; font-size: 13px; font-weight: bold; cursor: pointer; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            Stampa / Salva in PDF Relazione Forense
          </button>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportHtml);
      printWindow.document.close();
      showNotification("Report giudiziario aperto in una nuova scheda pronto per la stampa!", "success");
    } else {
      showNotification("Impossibile aprire la nuova finestra. Controlla il blocco popup.", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-900/50 border border-slate-800 p-5 rounded-3xl overflow-hidden shadow-2xl relative" id="interactive-suite">
      
      {/* Toast notifications */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl border transition-all duration-300 animate-bounce ${
          notification.type === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300' 
            : notification.type === 'error'
            ? 'bg-rose-950/90 border-rose-500/30 text-rose-300'
            : 'bg-slate-900/95 border-slate-800 text-slate-300'
        }`}>
          {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-400" />}
          {notification.type === 'error' && <AlertTriangle className="h-5 w-5 text-rose-400" />}
          {notification.type === 'info' && <Info className="h-5 w-5 text-sky-400" />}
          <span className="text-xs font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Loading overlay */}
      {loadingText && (
        <div className="absolute inset-0 z-50 bg-slate-950/90 flex flex-col items-center justify-center p-4">
          <div className="h-12 w-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin mb-4"></div>
          <p className="text-sm font-mono text-emerald-400 animate-pulse">{loadingText}</p>
        </div>
      )}

      {/* 3D Viewport Column (Takes 2/3 of space on desktop) */}
      <div className="lg:col-span-2 relative bg-slate-950 rounded-2xl border border-slate-800 h-[500px] lg:h-[620px] overflow-hidden group">
        {/* Workspace Active Indicator Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          <div className="bg-slate-900/90 backdrop-blur-md text-[10px] sm:text-xs text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-ping"></span>
            RESA 3D REAL-TIME • METRIC: 1:1
          </div>
          {isLaserOn && (
            <div className="bg-emerald-950/90 backdrop-blur-md text-[10px] text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20 flex items-center font-mono w-max">
              SCANNER LASER ATTIVO (Y = {laserScannerRef.current?.position.y.toFixed(2)}m)
            </div>
          )}
        </div>

        {/* Action controls in corners */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button 
            onClick={resetEntireWorkspace}
            className="bg-slate-900/95 hover:bg-slate-800/95 text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-2 rounded-lg border border-slate-800 transition-all flex items-center space-x-1"
            title="Resetta l'intera simulazione ed elimina i rilievi"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Ripristina</span>
          </button>
        </div>

        {/* Floating manual instruction cards */}
        <div className="absolute bottom-4 left-4 z-10 max-w-sm pointer-events-none bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 shadow-xl hidden sm:block">
          <span className="text-xs text-slate-300 block mb-1 font-bold flex items-center">
            <Info className="h-3.5 w-3.5 text-emerald-400 mr-1" /> Interazione Spaziale 3D:
          </span>
          <ul className="text-[10px] text-slate-400 space-y-1 font-mono">
            <li><b className="text-slate-300">ORBITA:</b> Trascina con Tasto Sinistro del mouse</li>
            <li><b className="text-slate-300">PAN:</b> Trascina con Shift + Tasto Destro / Rotellina</li>
            <li><b className="text-slate-300">ZOOM:</b> Usa la Rotellina del mouse</li>
            <li><b className="text-slate-300">REPERTI:</b> Fai clic sulle superfici per posizionare il tag selezionato</li>
          </ul>
        </div>

        {/* Mount container for Three.js */}
        <div 
          ref={mountRef} 
          onClick={handleCanvasClick}
          className="w-full h-full cursor-crosshair"
          id="3d-forensic-canvas"
        ></div>
      </div>

      {/* Control Panel Column (Rightmost sidebar) */}
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-6 overflow-y-auto max-h-[500px] lg:max-h-[620px] pr-1">
          
          {/* Section: Dossier case fields */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-100">
              <FolderOpen className="h-5 w-5 text-emerald-500" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider font-mono">Anagrafica Caso</h3>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/60 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">ID Caso</label>
                  <input 
                    type="text" 
                    value={caseInfo.id} 
                    onChange={e => setCaseInfo(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded px-2.5 py-1.5 text-xs text-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">Operatore</label>
                  <input 
                    type="text" 
                    value={caseInfo.operator} 
                    onChange={e => setCaseInfo(prev => ({ ...prev, operator: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded px-2.5 py-1.5 text-xs text-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Titolo Indagine</label>
                <input 
                  type="text" 
                  value={caseInfo.title} 
                  onChange={e => setCaseInfo(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded px-2.5 py-1.5 text-xs text-slate-300 font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Località Scena</label>
                <input 
                  type="text" 
                  value={caseInfo.location} 
                  onChange={e => setCaseInfo(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded px-2.5 py-1.5 text-xs text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Section: Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Strumenti d'Indagine</span>
              <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-mono">Calibrazione 1:1</span>
            </h4>
            
            {/* Tag Selection for Click placement */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/60 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">1. Seleziona tipo di reperto da posizionare:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.keys(tagColors).map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag);
                        showNotification(`Pronto a posizionare: ${tag}. Fai clic nella scena 3D.`, 'info');
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-medium transition-all flex items-center space-x-1.5 border ${
                        selectedTag === tag 
                          ? 'bg-slate-900 border-emerald-500 text-emerald-400 shadow-md' 
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span 
                        className="h-2.5 w-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: tagColors[tag] }}
                      ></span>
                      <span className="truncate">{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Trajectory Generator & Laser Scanner controls */}
              <div className="border-t border-slate-900 pt-3 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">2. Azioni Strumentali:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={generateTrajectory}
                    className="bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-emerald-100 py-2 px-2.5 rounded-xl text-xs font-semibold border border-emerald-500/20 transition-all flex items-center justify-center space-x-1 shadow-inner"
                  >
                    <Crosshair className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Angolo Balistica</span>
                  </button>
                  <button
                    onClick={toggleLaserScanner}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center space-x-1 ${
                      isLaserOn 
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Laser Grid</span>
                  </button>
                </div>
              </div>

              {/* Upload customized file imports */}
              <div className="border-t border-slate-900 pt-3 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">3. Importa Planimetria / Mesh 3D:</span>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex flex-col items-center justify-center bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl cursor-pointer transition-all text-slate-400 group">
                    <Camera className="h-4 w-4 text-emerald-500 group-hover:scale-115 transition-transform" />
                    <span className="text-[10px] font-semibold mt-1">Carica Mappa 2D</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                  <label className="flex flex-col items-center justify-center bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl cursor-pointer transition-all text-slate-400 group">
                    <Maximize2 className="h-4 w-4 text-sky-400 group-hover:scale-115 transition-transform" />
                    <span className="text-[10px] font-semibold mt-1">Carica File 3D</span>
                    <input 
                      type="file" 
                      accept=".obj,.gltf,.glb" 
                      onChange={handleModelUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Metrical Tape (Distance tool) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <Ruler className="h-3.5 w-3.5 text-emerald-500" />
              <span>Calcolatore Distanze Relativo</span>
            </h4>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/60 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-500">Da Reperto</label>
                  <select 
                    value={measurementFrom || ""} 
                    onChange={e => setMeasurementFrom(e.target.value ? Number(e.target.value) : null)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded px-2 py-1 text-xs text-slate-300 font-mono"
                  >
                    <option value="">Seleziona...</option>
                    {markers.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.tag})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-500">A Reperto</label>
                  <select 
                    value={measurementTo || ""} 
                    onChange={e => setMeasurementTo(e.target.value ? Number(e.target.value) : null)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded px-2 py-1 text-xs text-slate-300 font-mono"
                  >
                    <option value="">Seleziona...</option>
                    {markers.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.tag})</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {calculatedDistance !== null && (
                <div className="bg-emerald-950/30 border border-emerald-500/20 p-2.5 rounded-lg flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Distanza Metrica:</span>
                  <span className="font-mono text-xs font-black text-white bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow">
                    {calculatedDistance.toFixed(3)} m
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Log of evidence */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Dossier Reperti Registrati ({markers.length})
            </h4>
            
            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {markers.length === 0 ? (
                <div className="text-center py-6 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
                  <MapPin className="h-6 w-6 text-slate-600 mx-auto mb-1.5" />
                  <p className="text-[11px] text-slate-500">Nessun reperto inserito. Clicca sulla mappa 3D per contrassegnare le prove.</p>
                </div>
              ) : (
                markers.map(m => (
                  <div key={m.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all text-xs flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center space-x-1.5 font-mono">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tagColors[m.tag] }}></span>
                        <span>{m.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400 uppercase">{m.tag}</span>
                      </span>
                      <button 
                        onClick={() => {
                          setMarkers(prev => prev.filter(item => item.id !== m.id));
                          showNotification(`Rimosso ${m.name}`, 'info');
                        }}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <input 
                      type="text" 
                      value={m.description}
                      onChange={e => {
                        const val = e.target.value;
                        setMarkers(prev => prev.map(item => item.id === m.id ? { ...item, description: val } : item));
                      }}
                      placeholder="Dettagli e note sul reperto..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded px-2 py-1 text-[11px] text-slate-300"
                    />

                    <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                      <span>XYZ Coordinate: {m.x.toFixed(2)}, {m.y.toFixed(2)}, {m.z.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Bottom CTA & Report Export Panel */}
        <div className="pt-4 border-t border-slate-800 bg-slate-900/40 mt-6 lg:mt-0">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={exportCaseAsJSON}
              className="bg-slate-950 hover:bg-slate-900 text-slate-300 text-xs py-2.5 px-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-all font-semibold font-mono flex items-center justify-center space-x-1.5"
            >
              <FileCode className="h-4 w-4 text-emerald-500" />
              <span>Dossier JSON</span>
            </button>
            <button 
              onClick={exportCourthouseReport}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs py-2.5 px-3 rounded-xl font-extrabold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1.5"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Stampa Report</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
