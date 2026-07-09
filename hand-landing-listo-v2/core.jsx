// ============================================================
// CORE — Brand, hooks, primitives, shared components
// ============================================================
const { useState, useEffect, useRef, useMemo } = React;

const BRAND = {
  terracota: '#C35731',
  marfil: '#F4F1E6',
  oliva: '#8D997A',
  crema: '#F7FFEB',
  gris: '#696F72',
  tinta: '#1A1A18',
  blanco: '#FFFFFF'
};

const FONT = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'Chivo Mono', ui-monospace, SFMono-Regular, monospace"
};

// ============================================================
// CONFIG — ⚠️ ÚNICO LUGAR PARA CAMBIAR DATOS REALES
// ============================================================
// 1) web3formsKey: crear gratis en https://web3forms.com (usar el
//    correo contacto@hndarquitectura.com al generarla) y pegar aquí.
// 2) whatsappNumber: formato internacional SIN "+", SIN espacios.
//    Brief indica 8145931116 -> con lada MX = 528145931116
//    (CONFIRMAR con cliente si la lada es 33 u otra).
const CONFIG = {
  web3formsKey: '17457e6e-3788-4266-8fa2-4737d392b638',
  whatsappNumber: '528145931116',
  whatsappMessage: 'Hola, quiero información sobre un proyecto con HAND.'
};

// Wordmark SVG (kept from original — Lnd letterform)
const SVG_WORDMARK = `<svg xmlns="http://www.w3.org/2000/svg" width="964.02" height="475.5" viewBox="0 0 964.02 475.5"><path fill="currentColor" d="M467.36,123.15c-40.58,0-80.55,14.41-106.65,42.07v-38.83h-77.91v188.47H110.08V26.61H32.17v417.93h77.91v-58.25h172.71v58.25h81.33v-201.27s31.81-45.45,87-45.45c42.85,0,66.23,23.37,66.23,77.91v168.81h77.26v-188.29c0-76.61-53.24-133.1-127.26-133.1Z"/><path fill="currentColor" d="M853.94,25.76h77.91v418.78h-71.42l-5.84-36.36c-26.62,27.27-62.33,41.55-99.34,41.55-87,0-155.83-68.17-155.83-162.97s68.82-163.62,155.83-163.62c37.01,0,72.07,14.28,98.69,40.9V25.76ZM763.69,197.82c-48.7,0-88.3,34.41-88.3,88.95s39.61,88.3,88.3,88.3,90.25-34.41,90.25-88.3-40.26-88.95-90.25-88.95Z"/></svg>`;

const Logo = ({ height = 48, color = BRAND.marfil }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = SVG_WORDMARK;
    const svg = ref.current.querySelector('svg');
    if (svg) {
      svg.style.height = `${height}px`;
      svg.style.width = 'auto';
      svg.style.color = color;
      svg.style.display = 'block';
    }
  }, [height, color]);
  return <div ref={ref} style={{ display: 'inline-block', lineHeight: 0, color }} />;
};

// ============================================================
// IMAGES — file paths to project images
// ============================================================
const IMG = {
  portada: 'images/portada.png',
  // Casa Lomas Altas
  lomas1: 'images/lomas-1.jpg', // exterior verde
  lomas2: 'images/lomas-2.jpg', // patio blanco
  lomas3: 'images/lomas-3.jpg', // cocina interior
  // Royal Contry departamento
  royal1: 'images/royal-1.jpg', // sala madera con poltrona
  royal2: 'images/royal-2.jpeg', // sala panelada
  royal3: 'images/royal-3.png', // cocina blanca
  // Casa Zibata Querétaro
  zibata1: 'images/zibata-1.png', // exterior noche
  zibata2: 'images/zibata-2.jpg', // interior con escalera/comedor
  zibata3: 'images/zibata-3.jpg', // exterior vol arbol
  zibata4: 'images/zibata-4.jpg' // fachada cielo
};

// Imágenes que el Proceso muestra como pequeñas viñetas (siluetas)
const PROCESO_IMG = {
  entender: IMG.zibata4,
  disenar: IMG.royal1,
  planear: IMG.lomas3,
  ejecutar: IMG.zibata2
};

// ============================================================
// HOOKS
// ============================================================
const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return isDesktop;
};

const useViewportSize = () => {
  const [size, setSize] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
};

// ============================================================
// SILHOUETTES + TEXTURE
// ============================================================
const SILHOUETTE_POINTS = {
  1: '10,80 10,40 50,10 90,40 90,80',
  2: '10,80 10,15 35,15 35,50 60,50 60,30 80,30 80,80',
  3: '10,80 10,50 35,50 35,30 78,12 78,80',
  4: '10,80 10,40 35,20 55,40 55,60 75,60 75,80'
};

const Silhouette = ({ shape = 1, color = BRAND.oliva, width = 80 }) =>
<svg viewBox="0 0 100 80" width={width} style={{ display: 'block' }}>
    <polygon points={SILHOUETTE_POINTS[shape]} fill={color} />
  </svg>;


const SilhouettePhoto = ({ shape = 1, imgSrc, width = 320 }) => {
  const id = useMemo(() => `clip-${shape}-${Math.random().toString(36).slice(2, 8)}`, [shape]);
  return (
    <svg viewBox="0 0 100 80" width={width} style={{ display: 'block', height: 'auto' }}>
      <defs>
        <clipPath id={id}>
          <polygon points={SILHOUETTE_POINTS[shape]} />
        </clipPath>
      </defs>
      <image
        href={imgSrc}
        x="0" y="0" width="100" height="80"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${id})`} />
      
    </svg>);

};

const SilhouetteSet = ({ color = BRAND.oliva, scale = 1 }) =>
<div style={{ display: 'flex', gap: 14 * scale, alignItems: 'flex-end' }}>
    {[1, 2, 3, 4].map((n) =>
  <Silhouette key={n} shape={n} color={color} width={72 * scale} />
  )}
  </div>;


const TexturaTecnica = ({ strokeColor = 'rgba(244,241,230,0.1)' }) =>
<svg
  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg">
  
    <defs>
      <pattern id="techgrid" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke={strokeColor} strokeWidth="0.5" />
        <path d="M 50 0 L 50 100 M 0 50 L 100 50" fill="none" stroke={strokeColor} strokeWidth="0.3" strokeDasharray="1 6" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#techgrid)" />
  </svg>;


const BrandHeadline = ({ bold, light, size = 'clamp(38px, 5.5vw, 76px)', color = 'inherit', boldColor }) =>
<h2 style={{
  fontFamily: FONT.sans,
  fontSize: size,
  lineHeight: 0.96,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  color: color,
  margin: 0
}}>
    <span style={{ display: 'block', color: boldColor || color, fontWeight: "400" }}>{bold}</span>
    <span style={{ display: 'block', fontWeight: "700" }}>{light}</span>
  </h2>;


const Container = ({ children, style = {}, ...props }) =>
<div
  style={{
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 'clamp(20px, 4vw, 40px)',
    paddingRight: 'clamp(20px, 4vw, 40px)',
    ...style
  }}
  {...props}>
  
    {children}
  </div>;


// Expose
Object.assign(window, {
  BRAND, FONT, CONFIG, IMG, PROCESO_IMG,
  Logo, Silhouette, SilhouettePhoto, SilhouetteSet, TexturaTecnica,
  BrandHeadline, Container,
  useScrollY, useInView, useIsDesktop, useViewportSize
});