// ============================================================
// NAV + HERO + BRIDGE
// ============================================================
const { useState: useStateNH, useEffect: useEffectNH, useRef: useRefNH } = React;

const Nav = ({ scrolled, logoVisible, onNav }) => {
  const [open, setOpen] = useStateNH(false);
  const isDesktop = useIsDesktop();
  const links = [
  { id: 'manifiesto', label: 'Manifiesto' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' }];


  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      backgroundColor: scrolled ? `${BRAND.marfil}F2` : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? `0.5px solid ${BRAND.tinta}20` : '0.5px solid transparent',
      transition: 'background-color 0.5s, border-color 0.5s, backdrop-filter 0.5s'
    }}>
      <Container style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16
      }}>
        <button
          onClick={() => onNav('top')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.6s, transform 0.6s'
          }}>
          
          <Logo height={26} color={scrolled ? BRAND.terracota : BRAND.marfil} />
          {isDesktop &&
          <span style={{
            fontFamily: FONT.mono,
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: scrolled ? BRAND.gris : `${BRAND.marfil}CC`,
            lineHeight: 1.4,
            textAlign: 'left'
          }}>
              Arquitectura y<br />construcción
            </span>
          }
        </button>

        {isDesktop &&
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {links.map((l) =>
          <button
            key={l.id}
            onClick={() => onNav(l.id)}
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: scrolled ? BRAND.tinta : BRAND.marfil,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 0.6}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
            
                {l.label}
              </button>
          )}
            <button
            onClick={() => onNav('contacto')}
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '10px 18px',
              border: `0.5px solid ${scrolled ? BRAND.terracota : BRAND.marfil}`,
              color: scrolled ? BRAND.terracota : BRAND.marfil,
              background: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
            
              Comencemos ↗
            </button>
          </nav>
        }

        {!isDesktop &&
        <button
          onClick={() => setOpen(!open)}
          style={{
            color: scrolled ? BRAND.tinta : BRAND.marfil,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4
          }}>
          
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        }
      </Container>

      {open && !isDesktop &&
      <div style={{
        backgroundColor: BRAND.marfil,
        borderTop: `0.5px solid ${BRAND.tinta}20`
      }}>
          <Container style={{ paddingTop: 20, paddingBottom: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {links.map((l) =>
            <button
              key={l.id}
              onClick={() => {onNav(l.id);setOpen(false);}}
              style={{
                fontFamily: FONT.mono,
                fontSize: 13,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: BRAND.tinta,
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer'
              }}>
              
                  {l.label}
                </button>
            )}
            </div>
          </Container>
        </div>
      }
    </header>);

};

// ============================================================
// HERO — Fotoparaportada + Wordmark animado
// Termina con un puente continuo hacia la sección Manifiesto
// ============================================================
const Hero = ({ onNav }) => {
  const scrollY = useScrollY();
  const { h: vh } = useViewportSize();
  const isDesktop = useIsDesktop();

  const animEnd = vh * 0.8;
  const progress = Math.max(0, Math.min(1, scrollY / animEnd));
  const eased = 1 - Math.pow(1 - progress, 3);

  const logoScale = 1 - eased * 0.82;
  const logoY = -eased * 42;
  const logoX = -eased * (isDesktop ? 38 : 32);

  const textProgress = Math.max(0, Math.min(1, (scrollY - vh * 0.15) / (vh * 0.4)));
  const textOpacity = textProgress;
  const textY = (1 - textProgress) * 30;

  // Bridge progress — gradual takeover starting earlier in the scroll
  const bridgeStart = vh * 1.05;
  const bridgeProgress = Math.max(0, Math.min(1, (scrollY - bridgeStart) / (vh * 0.65)));
  // Border-radius animates from 60px to 0 in the last 35% of bridge progress (so it lands flat)
  const bridgeRadius = Math.max(0, 60 - Math.max(0, (bridgeProgress - 0.65) / 0.35) * 60);
  // Hero darkness fades to marfil tone as bridge starts climbing
  const overlayMarfil = Math.max(0, Math.min(1, (scrollY - vh * 0.95) / (vh * 0.5)));

  return (
    <section style={{
      position: 'relative',
      height: '180vh',
      backgroundColor: BRAND.tinta
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: BRAND.tinta
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMG.portada})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${1 + eased * 0.05})`,
          transition: 'transform 0.1s linear'
        }} />

        {/* Overlay para legibilidad — y, en el tramo final, vira a marfil suave */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${BRAND.tinta}88 0%, ${BRAND.tinta}44 40%, ${BRAND.tinta}DD 100%)`
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: BRAND.marfil,
          opacity: overlayMarfil * 0.6,
          transition: 'opacity 0.1s linear',
          pointerEvents: 'none'
        }} />

        <TexturaTecnica strokeColor="rgba(244,241,230,0.06)" />

        {/* WORDMARK LND animado */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${logoX}vw), calc(-50% + ${logoY}vh)) scale(${logoScale})`,
          transformOrigin: 'center center',
          zIndex: 10,
          transition: 'transform 0.05s linear',
          willChange: 'transform',
          color: BRAND.marfil
        }}>
          <Logo height={isDesktop ? Math.min(vh * 0.22, 180) : 90} color={BRAND.marfil} />
          <div style={{
            fontFamily: FONT.sans,
            fontWeight: 300,
            fontSize: isDesktop ? 'clamp(12px, 1.1vw, 16px)' : 11,
            letterSpacing: '0.05em',
            color: BRAND.marfil,
            textAlign: 'center',
            marginTop: isDesktop ? 12 : 6,
            opacity: Math.max(0, 1 - eased * 2.5),
            transition: 'opacity 0.1s linear'
          }}>
            arquitectura y construcción
          </div>
        </div>

        {/* Contenido del hero */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 clamp(20px, 4vw, 40px)',
          zIndex: 8,
          opacity: textOpacity * (1 - bridgeProgress * 0.7),
          transform: `translateY(${textY - bridgeProgress * 40}px)`,
          transition: 'opacity 0.1s linear, transform 0.1s linear',
          pointerEvents: textOpacity > 0.5 ? 'auto' : 'none'
        }}>
          <div style={{ textAlign: 'center', maxWidth: 760, width: '100%' }}>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: BRAND.marfil,
              opacity: 0.85,
              marginBottom: 28
            }}>HOLA, SOMOS HND —

            </div>
            <h1 style={{
              fontFamily: FONT.sans,
              fontSize: 'clamp(34px, 5vw, 64px)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: BRAND.marfil,
              margin: 0,
              marginBottom: 24
            }}>
              <span style={{ fontWeight: 800, display: 'block' }}>DISEÑO, FUNCIONALIDAD</span>
              <span style={{ fontWeight: 300, display: 'block' }}> Y EJECUCIÓN.</span>
            </h1>
            <p style={{
              fontFamily: FONT.sans,
              fontWeight: 300,
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              lineHeight: 1.5,
              color: `${BRAND.marfil}EE`,
              maxWidth: 560,
              margin: '0 auto 40px'
            }}>Con procesos claros y presupuestos bien pensados desde el principio. 

            </p>

            <div style={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: 12,
              justifyContent: 'center'
            }}>
              <button
                onClick={() => onNav('contacto')}
                style={{
                  backgroundColor: BRAND.marfil,
                  color: BRAND.terracota,
                  padding: '16px 28px',
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 0.85}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
                
                Cuéntanos tu proyecto ↗
              </button>
              <a
                href="https://wa.me/528145931116?text=Hola%20HAND%2C%20me%20interesa%20agendar%20una%20cita"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 28px',
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: `0.5px solid ${BRAND.marfil}`,
                  color: BRAND.marfil,
                  textDecoration: 'none',
                  display: 'inline-block',
                  textAlign: 'center',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${BRAND.marfil}15`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                
                Agenda una cita
              </a>
            </div>
          </div>
        </div>

        {/* Pie con siluetas — se oculta gradualmente conforme inicia el puente */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '20px clamp(20px, 4vw, 40px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: `0.5px solid ${BRAND.marfil}30`,
          zIndex: 5,
          opacity: textOpacity * (1 - bridgeProgress),
          transition: 'opacity 0.3s'
        }}>
          <SilhouetteSet color={BRAND.marfil} scale={0.5} />
          <span style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: BRAND.marfil,
            opacity: 0.7
          }}>
            Scroll ↓
          </span>
        </div>

        {/* PUENTE — fondo marfil que sube desde abajo del hero */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          bottom: 0,
          height: `${bridgeProgress * 100}%`,
          backgroundColor: BRAND.marfil,
          borderRadius: `${bridgeRadius}px ${bridgeRadius}px 0 0`,
          transform: 'translateZ(0)',
          transition: 'height 0.1s linear',
          zIndex: 12,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {/* Etiqueta/eyebrow que aparece dentro del puente */}
          <div style={{
            position: 'absolute',
            top: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            opacity: bridgeProgress > 0.45 ? (bridgeProgress - 0.45) / 0.55 : 0,
            transition: 'opacity 0.2s'
          }}>
            <span style={{
              display: 'inline-block',
              width: 28,
              height: 1,
              backgroundColor: BRAND.terracota
            }} />
            <span style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: BRAND.terracota
            }}>
              Manifiesto · 001
            </span>
            <span style={{
              display: 'inline-block',
              width: 28,
              height: 1,
              backgroundColor: BRAND.terracota
            }} />
          </div>
        </div>

        {/* Línea vertical que "baja" durante el puente, conectando ambas secciones */}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          width: 1,
          height: `${20 + bridgeProgress * 80}%`,
          background: `linear-gradient(180deg, transparent 0%, ${BRAND.marfil}AA 30%, ${BRAND.terracota} 100%)`,
          transform: 'translateX(-50%)',
          zIndex: 13,
          pointerEvents: 'none',
          opacity: bridgeProgress > 0.05 ? 1 : 0,
          transition: 'opacity 0.2s'
        }}>
          {/* Punto en la punta inferior */}
          <span style={{
            position: 'absolute',
            bottom: -3,
            left: -3,
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: BRAND.terracota
          }} />
        </div>
      </div>
    </section>);

};

Object.assign(window, { Nav, Hero });