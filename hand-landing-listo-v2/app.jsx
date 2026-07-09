// ============================================================
// APP PRINCIPAL — Hand Arquitectura y Construcción
// ============================================================
function HandLanding() {
  const [scrolled, setScrolled] = React.useState(false);
  const [logoVisible, setLogoVisible] = React.useState(false);

  const refs = {
    top: React.useRef(null),
    manifiesto: React.useRef(null),
    proceso: React.useRef(null),
    servicios: React.useRef(null),
    proyectos: React.useRef(null),
    contacto: React.useRef(null),
  };

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      setLogoVisible(y > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = refs[id]?.current;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={refs.top}
      style={{
        backgroundColor: BRAND.marfil,
        minHeight: '100vh',
        fontFamily: FONT.sans,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <Nav scrolled={scrolled} logoVisible={logoVisible} onNav={handleNav} />
      <Hero onNav={handleNav} />
      <Manifiesto ref={refs.manifiesto} />
      <Proceso ref={refs.proceso} />
      <FraseAislada />
      <Servicios ref={refs.servicios} />
      <Proyectos ref={refs.proyectos} />
      <CTADiagonal onNav={handleNav} />
      <Contacto ref={refs.contacto} />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HandLanding />);
