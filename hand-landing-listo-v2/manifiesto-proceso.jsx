// ============================================================
// MANIFIESTO + PROCESO + FRASE AISLADA
// ============================================================
const { useState: useStateMP, useEffect: useEffectMP, useRef: useRefMP } = React;

// Top edge: slightly negative margin + rounded top so it interlocks with hero's bridge
const Manifiesto = React.forwardRef((props, ref) => {
  const [innerRef, inView] = useInView();
  const isDesktop = useIsDesktop();

  return (
    <section
      ref={ref}
      id="manifiesto"
      style={{
        position: 'relative',
        backgroundColor: BRAND.marfil,
        color: BRAND.tinta,

        marginTop: -1, // sin gap con el puente del hero
        zIndex: 4, padding: "139px 0px 39px"
      }}>
      
      <Container>
        <div ref={innerRef} style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '5fr 7fr' : '1fr',
          gap: isDesktop ? 60 : 40,
          alignItems: 'start'
        }}>
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s, transform 0.8s'
          }}>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BRAND.terracota,
              marginBottom: 20
            }}>
              — Manifiesto · 001
            </div>
            <BrandHeadline
              bold="Construimos"
              light="con certeza."
              color={BRAND.tinta}
              boldColor={BRAND.terracota}
              size="clamp(40px, 5vw, 64px)" />
            
          </div>

          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s 0.2s, transform 0.9s 0.2s'
          }}>
            <p style={{
              fontFamily: FONT.sans,
              fontWeight: 300,
              fontSize: 'clamp(20px, 2.4vw, 32px)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              color: BRAND.tinta,
              margin: 0
            }}>
              Combinamos diseño, funcionalidad y ejecución experta con algo poco común en el mercado:{' '}
              <span style={{ color: BRAND.terracota, fontWeight: 600 }}>
                procesos claros y presupuestos pensados desde el inicio.
              </span>
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
              gap: 0,
              marginTop: 48
            }}>
              {[
              { label: 'Presupuestos', sub: 'Reales' },
              { label: 'Procesos', sub: 'Claros' },
              { label: 'Acompañamiento', sub: 'Sincero' }].
              map((p, i) =>
              <div key={p.label} style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingRight: isDesktop && i < 2 ? 16 : 0,
                paddingLeft: isDesktop && i > 0 ? 16 : 0,
                borderTop: `0.5px solid ${BRAND.terracota}`,
                borderLeft: isDesktop && i > 0 ? `0.5px solid ${BRAND.tinta}15` : 'none',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ${0.4 + i * 0.1}s, transform 0.6s ${0.4 + i * 0.1}s`
              }}>
                  <div style={{
                  fontFamily: FONT.sans,
                  fontWeight: 700,
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: BRAND.terracota,
                  lineHeight: 1
                }}>
                    {p.label}
                  </div>
                  <div style={{
                  fontFamily: FONT.sans,
                  fontWeight: 300,
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: BRAND.terracota,
                  lineHeight: 1,
                  marginTop: 4
                }}>
                    {p.sub}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>);

});
Manifiesto.displayName = 'Manifiesto';

// ============================================================
// PROCESO — 4 etapas en UNA SOLA FILA, siluetas más pequeñas
// ============================================================
const Proceso = React.forwardRef((props, ref) => {
  const [innerRef, inView] = useInView(0.1);
  const isDesktop = useIsDesktop();

  const pasos = [
  {
    n: '01',
    t: 'Entendemos tu proyecto',
    d: 'Definimos alcance y objetivo de acuerdo a tus necesidades.',
    shape: 1,
    img: PROCESO_IMG.entender
  },
  {
    n: '02',
    t: 'Diseñamos con intención',
    d: 'Cada decisión responde a funcionalidad, estética y viabilidad.',
    shape: 2,
    img: PROCESO_IMG.disenar
  },
  {
    n: '03',
    t: 'Planeamos con precisión',
    d: 'Presupuesto, tiempos y alcances claros antes de construir.',
    shape: 3,
    img: PROCESO_IMG.planear
  },
  {
    n: '04',
    t: 'Ejecutamos con control',
    d: 'Seguimiento constante para asegurar calidad y evitar sorpresas inesperadas.',
    shape: 4,
    img: PROCESO_IMG.ejecutar
  }];


  return (
    <section
      ref={ref}
      id="proceso"
      style={{ ...{
          position: 'relative',
          backgroundColor: BRAND.crema,
          color: BRAND.tinta,
          padding: 'clamp(80px, 12vw, 140px) 0'
        }, backgroundColor: "rgb(245, 241, 230)" }}>
      
      <Container>
        <div ref={innerRef}>
          {/* Header */}
          <div style={{
            marginBottom: 'clamp(40px, 6vw, 64px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s, transform 0.9s'
          }}>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BRAND.terracota,
              marginBottom: 20
            }}>
              — Nuestro proceso · 04 etapas
            </div>
            <BrandHeadline
              bold="Método antes"
              light="que ejecución."
              color={BRAND.tinta}
              size="clamp(42px, 6vw, 78px)" />
            
          </div>

          {/* 4 columnas — una sola fila en desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : '1fr',
            gap: '1px',
            backgroundColor: `${BRAND.tinta}15`
          }}>
            {pasos.map((p, i) =>
            <div
              key={p.n}
              style={{ ...{
                  backgroundColor: BRAND.crema,
                  padding: 'clamp(20px, 1.8vw, 30px) clamp(18px, 1.6vw, 26px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.8s ${0.15 + i * 0.12}s, transform 0.8s ${0.15 + i * 0.12}s`
                }, backgroundColor: "rgb(246, 241, 230)" }}>
              
                {/* Top row: silueta pequeña + número + título a la par */}
                <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14
              }}>
                  <div style={{ flexShrink: 0 }}>
                    <Silhouette
                    shape={p.shape}
                    color={BRAND.terracota}
                    width={isDesktop ? 64 : 72} />

                  </div>
                  <span style={{
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  fontWeight: 500,
                  color: BRAND.terracota,
                  letterSpacing: '0.05em'
                }}>
                    {p.n}
                  </span>
                </div>

                {/* Título */}
                <h3 style={{
                fontFamily: FONT.sans,
                fontWeight: 600,
                fontSize: 'clamp(17px, 1.5vw, 22px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: BRAND.tinta,
                margin: 0,
                minHeight: isDesktop ? '2.3em' : undefined
              }}>
                  {isDesktop && p.n === '04' ? <>Ejecutamos con<br />control</> : p.t}
                </h3>

                {/* Descripción */}
                <p style={{
                fontFamily: FONT.sans,
                fontWeight: 300,
                fontSize: 13,
                lineHeight: 1.5,
                color: BRAND.gris,
                margin: 0,
                maxWidth: '32ch'
              }}>
                  {p.d}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>);

});
Proceso.displayName = 'Proceso';

// ============================================================
// FRASE AISLADA
// ============================================================
const FraseAislada = () => {
  const [ref, inView] = useInView(0.3);
  const frase = "Cada etapa está pensada para que el proceso se sienta claro, ordenado y bien acompañado.";
  const palabras = frase.split(' ');

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        backgroundColor: BRAND.terracota,
        color: BRAND.marfil,
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px clamp(20px, 4vw, 40px)',
        overflow: 'hidden'
      }}>
      
      {/* Textura HAND como fondo del bloque terracota */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(images/textura-hand.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.55,
        mixBlendMode: 'screen',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 960,
        textAlign: 'center'
      }}>
        <div style={{
          width: 40,
          height: 1,
          backgroundColor: BRAND.marfil,
          opacity: inView ? 0.6 : 0,
          margin: '0 auto 48px',
          transition: 'opacity 0.8s'
        }} />

        <p style={{
          fontFamily: FONT.sans,
          fontWeight: 300,
          fontSize: 'clamp(28px, 4.5vw, 56px)',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: BRAND.marfil,
          margin: 0
        }}>
          {palabras.map((w, i) =>
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: 12,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ${i * 0.04}s, transform 0.5s ${i * 0.04}s`,
              fontWeight: w === 'claridad' ? 700 : 300
            }}>
            
              {w}
            </span>
          )}
        </p>

      </div>
    </section>);

};

Object.assign(window, { Manifiesto, Proceso, FraseAislada });