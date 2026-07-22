// ============================================================
// SERVICIOS — Hover animado (color + escala) sin apariencia clickable
// ============================================================
const { useState: useStateSP, useEffect: useEffectSP, useRef: useRefSP } = React;

const Servicios = React.forwardRef((props, ref) => {
  const [innerRef, inView] = useInView(0.1);
  const [hovered, setHovered] = useStateSP(null);
  const isDesktop = useIsDesktop();

  const servicios = [
  { n: 'A.01', bold: 'Diseño', light: 'arquitectónico', desc: 'Del concepto al plano ejecutivo.', shape: 1 },
  { n: 'A.02', bold: 'Construcción', light: 'residencial', desc: 'Casas y residencias llave en mano.', shape: 4 },
  { n: 'A.03', bold: 'Construcción', light: 'comercial', desc: 'Locales, oficinas y espacios corporativos.', shape: 2 },
  { n: 'A.04', bold: 'Remodelaciones', light: 'integrales', desc: 'Intervenciones con enfoque arquitectónico.', shape: 3 },
  { n: 'A.05', bold: 'Planeación', light: 'y control de obra', desc: 'Supervisión técnica y administrativa.', shape: 1 }];


  return (
    <section
      ref={ref}
      id="servicios"
      style={{
        position: 'relative',
        backgroundColor: BRAND.marfil,
        color: BRAND.tinta,
        padding: 'clamp(80px, 12vw, 140px) 0'
      }}>
      
      <Container>
        <div ref={innerRef}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? '5fr 7fr' : '1fr',
            gap: isDesktop ? 48 : 24,
            alignItems: 'end',
            marginBottom: 'clamp(48px, 8vw, 80px)'
          }}>
            <div style={{
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
                — Qué hacemos · 05 servicios
              </div>
              <BrandHeadline
                bold="Nuestros"
                light="servicios."
                color={BRAND.tinta}
                size="clamp(42px, 6vw, 78px)" />
              
            </div>
            <p style={{
              fontFamily: FONT.sans,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.6,
              color: BRAND.gris,
              maxWidth: '46ch',
              margin: 0,
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.9s 0.3s'
            }}>Diseñamos y construimos espacios pensados para verse bien, funcionar mejor y disfrutarse todos los días.

            </p>
          </div>

          {/* Lista de servicios — hover anim sin botón / cursor pointer */}
          <div style={{ borderTop: `0.5px solid ${BRAND.tinta}25` }}>
            {servicios.map((s, i) =>
            <div
              key={s.n}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ ...{
                  display: 'grid',
                  gridTemplateColumns: isDesktop ? '60px 50px 1fr 240px' : '40px 1fr',
                  alignItems: 'center',
                  gap: isDesktop ? 24 : 16,
                  padding: hovered === i ? '32px 24px 32px 24px' : '28px 0',
                  borderBottom: `0.5px solid ${BRAND.tinta}25`,
                  backgroundColor: hovered === i ? `${BRAND.crema}80` : 'transparent',
                  cursor: 'default',
                  transition: 'all 0.4s ease',
                  opacity: inView ? 1 : 0,
                  transform: inView ?
                  hovered === i ? 'translateY(0) scale(1.015)' : 'translateY(0) scale(1)' :
                  'translateY(20px) scale(1)',
                  transformOrigin: 'left center',
                  transitionDelay: `${i * 0.08}s`
                }, backgroundColor: "rgb(245, 241, 230)" }}>
              
                {/* Silueta como viñeta */}
                {isDesktop &&
              <div style={{
                transform: hovered === i ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 0.4s'
              }}>
                    <Silhouette
                  shape={s.shape}
                  color={hovered === i ? BRAND.terracota : BRAND.oliva}
                  width={52} />
                
                  </div>
              }

                {/* Código */}
                <span style={{
                fontFamily: FONT.mono,
                fontSize: 12,
                color: BRAND.terracota,
                letterSpacing: '0.05em'
              }}>
                  {s.n}
                </span>

                {/* Nombre Bold + Light */}
                <h3 style={{
                fontFamily: FONT.sans,
                fontSize: 'clamp(22px, 3vw, 42px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: hovered === i ? BRAND.terracota : BRAND.tinta,
                margin: 0,
                transition: 'color 0.4s'
              }}>
                  <span style={{ fontWeight: 700 }}>{s.bold}</span>{' '}
                  <span style={{ fontWeight: 300 }}>{s.light}</span>
                </h3>

                {/* Descripción */}
                {isDesktop &&
              <p style={{
                fontFamily: FONT.sans,
                fontWeight: 300,
                fontSize: 14,
                color: hovered === i ? BRAND.tinta : BRAND.gris,
                lineHeight: 1.5,
                margin: 0,
                textAlign: 'right',
                transition: 'color 0.4s'
              }}>
                    {s.desc}
                  </p>
              }
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>);

});
Servicios.displayName = 'Servicios';

// ============================================================
// PROYECTOS — sticky stacking cards (3 proyectos reales)
// Botón "Más detalles" muestra burbuja con info extendida al hover
// ============================================================
const DetailsBubble = ({ visible, info, isDesktop }) => {
  if (!isDesktop) return null;
  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 16px)',
      right: 0,
      width: 'min(380px, 80vw)',
      backgroundColor: BRAND.marfil,
      color: BRAND.tinta,
      padding: '20px 22px',
      borderRadius: 16,
      boxShadow: '0 20px 60px rgba(0,0,0,0.28), 0 0 0 0.5px rgba(0,0,0,0.08)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.96)',
      transformOrigin: 'top right',
      transition: 'opacity 0.3s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      pointerEvents: 'none',
      zIndex: 50
    }}>
      <div style={{
        fontFamily: FONT.mono,
        fontSize: 9,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: BRAND.terracota,
        marginBottom: 10
      }}>
        — Detalles del proyecto
      </div>
      <p style={{
        fontFamily: FONT.sans,
        fontWeight: 300,
        fontSize: 13.5,
        lineHeight: 1.55,
        color: BRAND.tinta,
        margin: 0
      }}>
        {info}
      </p>
      {/* Triángulo apuntando al botón (arriba de la burbuja) */}
      <span style={{
        position: 'absolute',
        top: -7,
        right: 28,
        width: 14, height: 14,
        backgroundColor: BRAND.marfil,
        transform: 'rotate(45deg)',
        boxShadow: '-2px -2px 4px rgba(0,0,0,0.04)'
      }} />
    </div>);

};

const ProjectCard = ({ proyecto, index, totalCards, scrollY, cardStartY, vh, isDesktop }) => {
  const [bubbleOpen, setBubbleOpen] = useStateSP(false);

  const cardScrollStart = cardStartY;
  const cardProgress = Math.max(0, Math.min(1, (scrollY - cardScrollStart) / vh));

  const isLast = index === totalCards - 1;
  const nextCardProgress = index < totalCards - 1 ?
  Math.max(0, Math.min(1, (scrollY - (cardStartY + vh * 0.95)) / vh)) :
  0;
  const currentScale = isLast ? 1 : 1 - nextCardProgress * 0.04;

  return (
    <div style={{
      position: isDesktop ? 'sticky' : 'relative',
      top: isDesktop ? 96 : 'auto',
      paddingTop: 0,
      paddingBottom: index < totalCards - 1 ? '5vh' : 0,
      marginBottom: isDesktop ? 0 : 24,
      zIndex: index + 1
    }}>
      <div style={{ ...{
          maxWidth: 1280,
          margin: '0 auto',
          backgroundColor: proyecto.bg,
          color: BRAND.tinta,
          borderRadius: isDesktop ? 40 : 24,
          border: `0.5px solid ${BRAND.marfil}30`,
          padding: `clamp(20px, 3vw, 36px)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          height: isDesktop ? '82vh' : 'auto',
          transform: isDesktop ? `scale(${currentScale})` : 'none',
          transformOrigin: 'top center',
          transition: 'transform 0.1s linear',
          overflow: isDesktop ? 'hidden' : 'visible',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
        }, backgroundColor: "rgb(245, 241, 230)" }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'auto 1fr auto' : '1fr',
          alignItems: isDesktop ? 'center' : 'flex-start',
          gap: 20,
          paddingBottom: 16,
          borderBottom: `0.5px solid ${BRAND.tinta}20`
        }}>
          <span style={{
            fontFamily: FONT.sans,
            fontWeight: 800,
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: BRAND.terracota
          }}>
            {proyecto.n}
          </span>
          <div>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BRAND.gris,
              marginBottom: 6
            }}>
              {proyecto.categoria}
            </div>
            <h3 style={{
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 'clamp(20px, 2.4vw, 32px)',
              letterSpacing: '-0.02em',
              color: BRAND.tinta,
              margin: 0,
              lineHeight: 1.1
            }}>
              {proyecto.nombre}
            </h3>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              color: BRAND.gris,
              marginTop: 4,
              letterSpacing: '0.05em'
            }}>
              {proyecto.year}
            </div>
          </div>

          {/* Botón Más detalles + burbuja al hover (solo desktop) */}
          {isDesktop &&
          <div
            style={{ position: 'relative', justifySelf: 'end' }}
            onMouseEnter={() => setBubbleOpen(true)}
            onMouseLeave={() => setBubbleOpen(false)}>

            <div style={{
              borderRadius: 100,
              border: `1px solid ${bubbleOpen ? BRAND.terracota : BRAND.tinta}`,
              backgroundColor: bubbleOpen ? BRAND.terracota : 'transparent',
              color: bubbleOpen ? BRAND.marfil : BRAND.tinta,
              fontFamily: FONT.mono,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '12px 22px',
              cursor: 'default',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transform: bubbleOpen ? 'scale(1.04)' : 'scale(1)',
              userSelect: 'none'
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: bubbleOpen ? BRAND.marfil : BRAND.terracota,
                display: 'inline-block',
                transition: 'background-color 0.3s'
              }} />
              Más detalles
            </div>
            <DetailsBubble visible={bubbleOpen} info={proyecto.detalles} isDesktop={isDesktop} />
          </div>
          }
        </div>

        {/* Detalles inline (solo móvil) — reemplaza la burbuja de hover */}
        {!isDesktop &&
        <p style={{
          fontFamily: FONT.sans,
          fontWeight: 300,
          fontSize: 13,
          lineHeight: 1.6,
          color: BRAND.gris,
          margin: 0
        }}>
          {proyecto.detalles}
        </p>
        }

        {/* Bottom: grid 40/60 con imágenes */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: isDesktop ? '40% 1fr' : '1fr',
          gap: 12,
          minHeight: 0
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <div style={{
              flex: isDesktop ? 1 : 'none',
              height: isDesktop ? 'auto' : 220,
              borderRadius: isDesktop ? 24 : 16,
              overflow: 'hidden',
              backgroundImage: `url(${proyecto.imgs[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 100
            }} />
            <div style={{
              flex: isDesktop ? 1.4 : 'none',
              height: isDesktop ? 'auto' : 220,
              borderRadius: isDesktop ? 24 : 16,
              overflow: 'hidden',
              backgroundImage: `url(${proyecto.imgs[1]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 100
            }} />
          </div>
          <div style={{
            height: isDesktop ? 'auto' : 220,
            borderRadius: isDesktop ? 24 : 16,
            overflow: 'hidden',
            backgroundImage: `url(${proyecto.imgs[2]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 200,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              padding: 'clamp(16px, 2vw, 28px)',
              background: `linear-gradient(180deg, transparent 0%, ${BRAND.tinta}DD 100%)`,
              color: BRAND.marfil
            }}>
              <p style={{
                fontFamily: FONT.sans,
                fontWeight: 300,
                fontSize: isDesktop ? 15 : 13,
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '60ch'
              }}>
                {proyecto.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

const Proyectos = React.forwardRef((props, ref) => {
  const scrollY = useScrollY();
  const sectionRef = useRefSP(null);
  const [sectionTop, setSectionTop] = useStateSP(0);
  const { h: vh } = useViewportSize();
  const isDesktop = useIsDesktop();

  useEffectSP(() => {
    if (sectionRef.current) {
      const update = () => {
        setSectionTop(sectionRef.current.getBoundingClientRect().top + window.scrollY);
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
  }, []);

  const proyectos = [
  {
    n: '01',
    categoria: 'RESIDENCIAL · REMODELACIÓN',
    nombre: 'Casa Lomas Altas',
    year: 'Zapopan, Jal · 2025',
    tagline: 'Intervención integral de vivienda: distribución, función y atmósfera renovadas.',
    detalles: 'Intervención integral de vivienda para actualizar la distribución y funcionalidad de los espacios. El resultado: un hogar más eficiente, contemporáneo y alineado con la vida diaria de sus habitantes.',
    imgs: [IMG.lomas1, IMG.lomas3, IMG.lomas2],
    bg: BRAND.crema
  },
  {
    n: '02',
    categoria: 'DEPARTAMENTO · REMODELACIÓN',
    nombre: 'Proyecto Royal Contry',
    year: 'Zapopan, Jal · 2026',
    tagline: 'Remodelación integral de departamento: acabados, materialidad y atmósfera.',
    detalles: 'Remodelación integral de departamento enfocada en renovar acabados, materialidad y atmósfera de cada espacio. Un proyecto pensado para elevar la calidez, funcionalidad y experiencia de habitar el área social y privada.',
    imgs: [IMG.royal2, IMG.royal3, IMG.royal1],
    bg: BRAND.marfil
  },
  {
    n: '03',
    categoria: 'RESIDENCIAL · DISEÑO Y EJECUCIÓN',
    nombre: 'Proyecto Polanco',
    year: 'CDMX · 2026',
    tagline: 'Diseño y ejecución.',
    detalles: 'Desarrollo integral de un departamento residencial, transformando una obra gris en un hogar diseñado alrededor de la forma de vivir de la familia. Cada espacio cumple una función específica, sin perder atención al buen gusto.',
    imgs: [IMG.polanco2, IMG.polanco3, IMG.polanco1],
    bg: BRAND.crema
  }];


  return (
    <section
      ref={(el) => {
        if (typeof ref === 'function') ref(el);else
        if (ref) ref.current = el;
        sectionRef.current = el;
      }}
      id="proyectos"
      style={{
        position: 'relative',
        backgroundColor: BRAND.tinta,
        color: BRAND.marfil,
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        zIndex: 5,
        paddingTop: 96,
        paddingBottom: 0
      }}>
      
      <TexturaTecnica strokeColor="rgba(244,241,230,0.05)" />

      <Container style={{ position: 'relative', zIndex: 2, marginBottom: 64 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '7fr 5fr' : '1fr',
          gap: isDesktop ? 48 : 24,
          alignItems: 'end'
        }}>
          <div>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BRAND.terracota,
              marginBottom: 20
            }}>
              — Proyectos · Selección 2024–2026
            </div>
            <BrandHeadline
              bold="Nuestros"
              light="proyectos."
              color={BRAND.marfil}
              size="clamp(42px, 6vw, 76px)" />
            
          </div>
          <span style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: `${BRAND.marfil}80`,
            textAlign: isDesktop ? 'right' : 'left'
          }}>ESPACIOS QUE TRASCIENDEN

          </span>
        </div>
      </Container>

      <div style={{
        position: 'relative',
        paddingLeft: 'clamp(16px, 4vw, 40px)',
        paddingRight: 'clamp(16px, 4vw, 40px)',
        paddingBottom: '20vh'
      }}>
        {proyectos.map((p, i) =>
        <ProjectCard
          key={p.n}
          proyecto={p}
          index={i}
          totalCards={proyectos.length}
          scrollY={scrollY}
          cardStartY={sectionTop + i * vh * 0.95}
          vh={vh}
          isDesktop={isDesktop} />

        )}
      </div>
    </section>);

});
Proyectos.displayName = 'Proyectos';

Object.assign(window, { Servicios, Proyectos });