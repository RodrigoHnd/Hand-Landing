// ============================================================
// EQUIPO — foto grupal + 3 perfiles. Va entre Proceso y FraseAislada.
// ============================================================
const EQUIPO_TEXTO =
  'Somos un equipo joven con más de 10 años de experiencia, y así cuidamos lo que más importa en tu obra: diseño con buen gusto, costos y tiempos claros, y un trato profesional de principio a fin.';

const EQUIPO_MIEMBROS = [
  {
    nombre: 'Alfonso',
    rol: 'Arquitecto',
    area: 'Diseño y dirección de obra',
    d: 'Que lo proyectado sea lo construido.',
    img: IMG.equipoAlfonso
  },
  {
    nombre: 'José Ignacio',
    rol: 'Administración',
    area: 'Presupuestos, costos y tiempos',
    d: 'Sin sorpresas en el camino.',
    img: IMG.equipoJoseIgnacio
  },
  {
    nombre: 'Rodrigo',
    rol: 'Experiencia de cliente',
    area: 'Comunicación y acompañamiento',
    d: 'Que siempre sepas en qué etapa va tu proyecto.',
    img: IMG.equipoRodrigo
  }
];

const Equipo = React.forwardRef((props, ref) => {
  const [innerRef, inView] = useInView(0.1);
  const isDesktop = useIsDesktop();

  const reveal = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.9s ${delay}s, transform 0.9s ${delay}s`
  });

  return (
    <section
      ref={ref}
      id="equipo"
      style={{
        position: 'relative',
        backgroundColor: 'rgb(245, 241, 230)',
        color: BRAND.tinta,
        padding: '0 0 clamp(80px, 12vw, 140px)'
      }}>

      <Container>
        <div ref={innerRef} style={{ borderTop: `0.5px solid ${BRAND.tinta}20`, paddingTop: 'clamp(64px, 9vw, 110px)' }}>
          {/* Header */}
          <div style={{ marginBottom: 'clamp(32px, 5vw, 56px)', ...reveal(0) }}>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BRAND.terracota,
              marginBottom: 20
            }}>
              — El equipo
            </div>
            <BrandHeadline
              bold="Quienes cuidan"
              light="tu obra."
              color={BRAND.tinta}
              size="clamp(42px, 6vw, 78px)" />
          </div>

          {/* Foto grupal: horizontal en desktop, vertical en móvil */}
          <figure style={{ margin: 0, ...reveal(0.1) }}>
            <picture>
              <source media="(min-width: 768px)" srcSet={IMG.equipoGrupal} />
              <img
                src={IMG.equipoGrupalMovil}
                alt="Alfonso, José Ignacio y Rodrigo, equipo de HND Arquitectura y Construcción"
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: isDesktop ? '3 / 2' : '2 / 3',
                  objectFit: 'cover',
                  backgroundColor: `${BRAND.tinta}10`
                }} />
            </picture>
            <figcaption style={{
              fontFamily: FONT.sans,
              fontWeight: 300,
              fontSize: 'clamp(18px, 1.9vw, 26px)',
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              color: BRAND.tinta,
              maxWidth: '46ch',
              marginTop: 'clamp(24px, 3vw, 40px)'
            }}>
              {EQUIPO_TEXTO}
            </figcaption>
          </figure>

          {/* Perfiles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
            gap: isDesktop ? 'clamp(20px, 2.4vw, 36px)' : 48,
            marginTop: 'clamp(56px, 8vw, 96px)'
          }}>
            {EQUIPO_MIEMBROS.map((m, i) =>
              <figure key={m.nombre} style={{ margin: 0, ...reveal(0.15 + i * 0.12) }}>
                <img
                  src={m.img}
                  alt={`${m.nombre}, ${m.rol.toLowerCase()} en HND`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    backgroundColor: `${BRAND.tinta}10`
                  }} />
                <figcaption style={{ paddingTop: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                    <h3 style={{
                      fontFamily: FONT.sans,
                      fontWeight: 600,
                      fontSize: 'clamp(20px, 1.6vw, 24px)',
                      letterSpacing: '-0.02em',
                      margin: 0
                    }}>
                      {m.nombre}
                    </h3>
                    <span style={{
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: BRAND.terracota
                    }}>
                      {m.rol}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: FONT.sans,
                    fontWeight: 300,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: BRAND.gris,
                    margin: 0,
                    maxWidth: '36ch'
                  }}>
                    <span style={{ fontWeight: 500, color: BRAND.tinta }}>{m.area}:</span> {m.d.charAt(0).toLowerCase() + m.d.slice(1)}
                  </p>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </Container>
    </section>);
});
Equipo.displayName = 'Equipo';

Object.assign(window, { Equipo });
