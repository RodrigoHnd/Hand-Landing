// ============================================================
// CTA DIAGONAL + CONTACTO + FOOTER
// ============================================================
const { useState: useStateCF, useEffect: useEffectCF, useRef: useRefCF } = React;

const CTADiagonal = ({ onNav }) => {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref}>
      <section style={{
        position: 'relative',
        backgroundColor: BRAND.terracota,
        color: BRAND.marfil,
        padding: '100px clamp(20px, 4vw, 40px)',
        overflow: 'hidden'
      }}>
        <TexturaTecnica strokeColor="rgba(244,241,230,0.08)" />
        <div style={{
          position: 'relative',
          maxWidth: 920,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: BRAND.marfil,
            opacity: inView ? 0.85 : 0,
            marginBottom: 28,
            transition: 'opacity 0.8s'
          }}>
            — Última parada
          </div>
          <h2 style={{
            fontFamily: FONT.sans,
            fontSize: 'clamp(36px, 5.4vw, 76px)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: BRAND.marfil,
            margin: 0,
            marginBottom: 24,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s 0.1s, transform 1s 0.1s'
          }}>
            <span style={{ fontWeight: 800, display: 'block' }}>Si estás por</span>
            <span style={{ fontWeight: 300, display: 'block' }}>construir o remodelar,</span>
            <span style={{ fontWeight: 800, display: 'block' }}>podemos ayudarte.</span>
          </h2>
          <p style={{
            fontFamily: FONT.sans,
            fontWeight: 300,
            fontSize: 'clamp(17px, 1.9vw, 22px)',
            lineHeight: 1.45,
            color: `${BRAND.marfil}EE`,
            maxWidth: '52ch',
            margin: '0 auto 48px',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.9s 0.4s'
          }}>
            A hacerlo bien desde el inicio.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 48,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.9s 0.6s, transform 0.9s 0.6s'
          }}>
            <SilhouetteSet color={BRAND.marfil} scale={0.85} />
          </div>
          <button
            onClick={() => onNav('contacto')}
            style={{
              backgroundColor: BRAND.marfil,
              color: BRAND.terracota,
              padding: '20px 44px',
              fontFamily: FONT.mono,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(15px)',
              transitionDelay: '0.7s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 0.88}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
            
            Comencemos tu proyecto ↗
          </button>
        </div>
      </section>
    </div>);

};

const Contacto = React.forwardRef((props, ref) => {
  const [innerRef, inView] = useInView(0.1);
  const isDesktop = useIsDesktop();
  const [form, setForm] = useStateCF({
    nombre: '', email: '', telefono: '',
    ubicacion: 'Guadalajara y zona metropolitana',
    ubicacionOtra: '',
    tipo: 'Residencial',
    mensaje: ''
  });
  const [sent, setSent] = useStateCF(false);
  const [sending, setSending] = useStateCF(false);
  const [error, setError] = useStateCF('');
  const [folio] = useStateCF(Math.floor(Math.random() * 9000) + 1000);

  const submit = async () => {
    if (!form.nombre || !form.email || !form.mensaje) {
      setError('Por favor completa los campos requeridos: Nombre, Email y Descripción.');
      return;
    }
    setError('');
    setSending(true);

    const ubicacionFinal = form.ubicacion === 'Otra' ?
    form.ubicacionOtra || 'Otra (sin especificar)' :
    form.ubicacion;

    // Payload a Web3Forms. Los nombres de campo aparecen tal cual en el correo.
    const payload = {
      access_key: CONFIG.web3formsKey,
      subject: `Nueva cotización · Proyecto ${form.tipo} — ${form.nombre} (Folio #${String(folio).padStart(4, '0')})`,
      from_name: 'Landing HAND Arquitectura',
      'Folio': `#${String(folio).padStart(4, '0')}`,
      'Nombre': form.nombre,
      'Email': form.email,
      'Teléfono': form.telefono || '(no proporcionado)',
      'Ubicación': ubicacionFinal,
      'Tipo de proyecto': form.tipo,
      'Descripción del proyecto': form.mensaje
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
      } else {
        setError(data.message || 'No se pudo enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.');
      }
    } catch (err) {
      setError('Hubo un problema de conexión. Revisa tu internet e intenta de nuevo, o escríbenos por WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const fieldLabel = {
    fontFamily: FONT.mono,
    fontSize: 9,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: BRAND.gris,
    marginBottom: 6,
    display: 'block'
  };

  const fieldInput = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `0.5px solid ${BRAND.tinta}40`,
    padding: '12px 0',
    fontFamily: FONT.sans,
    fontWeight: 400,
    fontSize: 15,
    color: BRAND.tinta,
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <section
      ref={ref}
      id="contacto"
      style={{
        position: 'relative',
        backgroundColor: BRAND.marfil,
        color: BRAND.tinta,
        padding: 'clamp(80px, 12vw, 140px) 0'
      }}>
      
      <Container>
        <div ref={innerRef} style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '5fr 7fr' : '1fr',
          gap: isDesktop ? 64 : 48,
          alignItems: 'start'
        }}>
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
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
              — Contacto · Cotización
            </div>
            <BrandHeadline
              bold="Cuéntanos"
              light="sobre tu proyecto."
              color={BRAND.tinta}
              size="clamp(36px, 4.5vw, 60px)" />
            
            <p style={{
              fontFamily: FONT.sans,
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.6,
              color: BRAND.gris,
              maxWidth: '40ch',
              marginTop: 24,
              marginBottom: 48
            }}>Con tu información podremos orientarte mejor desde el inicio.
            </p>

            <div style={{ marginBottom: 24 }}>
              <div style={fieldLabel}>Dirección</div>
              <p style={{ fontFamily: FONT.sans, fontSize: 14, color: BRAND.tinta, lineHeight: 1.6, margin: 0 }}>
                Guadalajara, Jalisco
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              marginBottom: 24
            }}>
              <div>
                <div style={fieldLabel}>Teléfono</div>
                <p style={{ fontFamily: FONT.mono, fontSize: 13, color: BRAND.tinta, margin: 0 }}>+52 81 4593 1116

                </p>
              </div>
              <div>
                <div style={fieldLabel}>Email</div>
                <p style={{ fontFamily: FONT.mono, fontSize: 13, color: BRAND.tinta, margin: 0 }}>
                  contacto@hndarquitectura.com
                </p>
              </div>
            </div>

            <div style={{ paddingTop: 24, borderTop: `0.5px solid ${BRAND.tinta}20` }}>
              <div style={{ ...fieldLabel, marginBottom: 14 }}>Accesos directos</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <a
                  href="https://wa.me/528145931116?text=Hola%20HAND%2C%20me%20interesa%20platicar%20sobre%20un%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: BRAND.oliva,
                    color: BRAND.marfil,
                    padding: '11px 18px',
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    textDecoration: 'none'
                  }}>
                  
                  WhatsApp ↗
                </a>
                <a
                  href="https://instagram.com/hand.arquitectura"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: `0.5px solid ${BRAND.tinta}`,
                    color: BRAND.tinta,
                    padding: '11px 18px',
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    textDecoration: 'none'
                  }}>
                  
                  Instagram
                </a>
                <a
                  href="https://facebook.com/hand.arquitectura"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: `0.5px solid ${BRAND.tinta}`,
                    color: BRAND.tinta,
                    padding: '11px 18px',
                    fontFamily: FONT.mono,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    textDecoration: 'none'
                  }}>
                  
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s 0.2s, transform 0.9s 0.2s'
          }}>
            {sent ?
            <div style={{
              backgroundColor: BRAND.crema,
              borderLeft: `3px solid ${BRAND.terracota}`,
              padding: '48px 40px'
            }}>
                <div style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: BRAND.terracota,
                marginBottom: 16
              }}>
                  — Mensaje enviado
                </div>
                <BrandHeadline
                bold="Gracias por"
                light="escribirnos."
                color={BRAND.tinta}
                size="clamp(28px, 3vw, 40px)" />
              
                <p style={{
                fontFamily: FONT.sans,
                fontSize: 16,
                color: BRAND.gris,
                lineHeight: 1.6,
                marginTop: 20,
                maxWidth: '42ch'
              }}>
                  Recibimos tu información. Un miembro del equipo HAND te contactará en un plazo máximo de 24 horas hábiles con los siguientes pasos.
                </p>
              </div> :

            <div style={{
              backgroundColor: BRAND.blanco,
              borderTop: `2px solid ${BRAND.terracota}`,
              padding: 'clamp(28px, 4vw, 40px)'
            }}>
                <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 16,
                alignItems: 'flex-start',
                marginBottom: 32,
                paddingBottom: 20,
                borderBottom: `0.5px solid ${BRAND.tinta}20`
              }}>
                  <div style={{
                  fontFamily: FONT.sans,
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: '-0.015em',
                  color: BRAND.tinta,
                  textTransform: 'uppercase',
                  lineHeight: 1.1
                }}>
                    Cotización<br />
                    <span style={{ fontWeight: 300 }}>de proyecto</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ ...fieldLabel, marginBottom: 2 }}>Fecha</div>
                    <div style={{ fontFamily: FONT.mono, fontSize: 12, color: BRAND.tinta, marginBottom: 10 }}>
                      {new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </div>
                    <div style={{ ...fieldLabel, marginBottom: 2 }}>Folio</div>
                    <div style={{ fontFamily: FONT.mono, fontSize: 12, color: BRAND.tinta }}>
                      #{String(folio).padStart(4, '0')}
                    </div>
                  </div>
                </div>

                <div style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                gap: 24,
                marginBottom: 24
              }}>
                  <div>
                    <label style={fieldLabel}>Nombre</label>
                    <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    style={fieldInput}
                    placeholder="Tu nombre completo" />
                  
                  </div>
                  <div>
                    <label style={fieldLabel}>Email</label>
                    <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={fieldInput}
                    placeholder="tu@correo.com" />
                  
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={fieldLabel}>Teléfono <span style={{ textTransform: 'none', letterSpacing: '0.05em', opacity: 0.6 }}>(opcional)</span></label>
                  <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  style={fieldInput}
                  placeholder="+52 33 0000 0000" />
                
                </div>

                {(() => {
                const showOtra = form.ubicacion === 'Otra';
                return (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isDesktop ?
                    showOtra ? '1fr 1fr 1fr' : '1fr 0fr 1fr' :
                    '1fr',
                    columnGap: isDesktop ? showOtra ? 24 : 0 : 0,
                    rowGap: 24,
                    marginBottom: 24,
                    transition: 'grid-template-columns 0.5s cubic-bezier(0.4, 0, 0.2, 1), column-gap 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                      <div>
                        <label style={fieldLabel}>Ubicación</label>
                        <select
                        value={form.ubicacion}
                        onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
                        style={{ ...fieldInput, cursor: 'pointer' }}>
                        
                          <option>Guadalajara y zona metropolitana</option>
                          <option>Ciudad de México</option>
                          <option>Querétaro</option>
                          <option>Otra</option>
                        </select>
                      </div>

                      {/* Campo libre — aparece a la derecha de Ubicación solo cuando se elige "Otra" */}
                      <div style={{
                      overflow: 'hidden',
                      opacity: showOtra ? 1 : 0,
                      transform: showOtra ? 'translateX(0)' : 'translateX(-12px)',
                      transition: 'opacity 0.45s ease 0.1s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.05s',
                      pointerEvents: showOtra ? 'auto' : 'none',
                      minWidth: 0
                    }}>
                        <label style={fieldLabel}>Especifica tu ubicación</label>
                        <input
                        type="text"
                        value={form.ubicacionOtra}
                        onChange={(e) => setForm({ ...form, ubicacionOtra: e.target.value })}
                        style={fieldInput}
                        placeholder="Ciudad / Estado"
                        aria-hidden={!showOtra}
                        tabIndex={showOtra ? 0 : -1} />
                      
                      </div>

                      <div>
                        <label style={fieldLabel}>Tipo de proyecto</label>
                        <select
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                        style={{ ...fieldInput, cursor: 'pointer' }}>
                        
                          <option>Residencial</option>
                          <option>Comercial</option>
                          <option>Interiorismo</option>
                          <option>Llave en mano</option>
                          <option>Consultoría</option>
                        </select>
                      </div>
                    </div>);

              })()}

                <div style={{ marginBottom: 36 }}>
                  <label style={fieldLabel}>Descripción del proyecto</label>
                  <textarea
                  required
                  rows={4}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  style={{ ...fieldInput, resize: 'vertical', minHeight: 90 }}
                  placeholder="Hola, platiquemos de tu proyecto" />
                
                </div>

                <div style={{
                display: 'flex',
                flexDirection: isDesktop ? 'row' : 'column',
                alignItems: isDesktop ? 'center' : 'stretch',
                justifyContent: 'space-between',
                gap: 16,
                paddingTop: 20,
                borderTop: `0.5px solid ${BRAND.tinta}20`
              }}>
                  <div>
                    <div style={{
                    fontFamily: FONT.mono,
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: BRAND.gris
                  }}>
                      Términos
                    </div>
                    <div style={{
                    fontFamily: FONT.sans,
                    fontSize: 12,
                    color: BRAND.gris,
                    maxWidth: '32ch',
                    marginTop: 4
                  }}>
                      Respuesta en 24 hrs hábiles · Primera sesión sin costo.
                    </div>
                  </div>
                  <button
                  type="button"
                  onClick={submit}
                  disabled={sending}
                  style={{
                    backgroundColor: BRAND.terracota,
                    color: BRAND.marfil,
                    padding: '16px 32px',
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: sending ? 'wait' : 'pointer',
                    opacity: sending ? 0.6 : 1,
                    transition: 'opacity 0.3s'
                  }}
                  onMouseEnter={(e) => !sending && (e.currentTarget.style.opacity = 0.88)}
                  onMouseLeave={(e) => !sending && (e.currentTarget.style.opacity = 1)}>

                    {sending ? 'Enviando…' : 'Enviar proyecto ↗'}
                  </button>
                </div>

                {error &&
                <div
                  role="alert"
                  style={{
                    marginTop: 20,
                    backgroundColor: `${BRAND.terracota}12`,
                    borderLeft: `3px solid ${BRAND.terracota}`,
                    padding: '14px 16px',
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: BRAND.tinta
                  }}>
                    {error}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </Container>
    </section>);

});
Contacto.displayName = 'Contacto';

const Footer = () => {
  const isDesktop = useIsDesktop();
  return (
    <footer style={{
      position: 'relative',
      backgroundColor: BRAND.tinta,
      color: BRAND.marfil,
      paddingTop: 80,
      paddingBottom: 40,
      overflow: 'hidden'
    }}>
      <TexturaTecnica strokeColor="rgba(244,241,230,0.04)" />
      <Container style={{ position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '5fr 3fr 4fr' : '1fr',
          gap: isDesktop ? 40 : 32,
          marginBottom: 64
        }}>
          <div>
            <Logo height={70} color={BRAND.marfil} />
            <p style={{
              fontFamily: FONT.sans,
              fontWeight: 300,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: BRAND.marfil,
              opacity: 0.9,
              maxWidth: '22ch',
              marginTop: 32
            }}>
              Diseño y construcción con método y claridad.
            </p>
          </div>

          <div>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: `${BRAND.marfil}80`,
              marginBottom: 16
            }}>
              Secciones
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Manifiesto', 'Nuestro proceso', 'Servicios', 'Proyectos', 'Contacto'].map((l) =>
              <li key={l} style={{
                fontFamily: FONT.sans,
                fontSize: 14,
                fontWeight: 300,
                color: BRAND.marfil,
                opacity: 0.85,
                marginBottom: 8
              }}>
                  {l}
                </li>
              )}
            </ul>
          </div>

          <div>
            <div style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: `${BRAND.marfil}80`,
              marginBottom: 16
            }}>
              Contacto
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 24 }}>
              <li style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 300, color: BRAND.marfil, opacity: 0.9, marginBottom: 6 }}>
                contacto@hndarquitectura.com
              </li>
              <li style={{ fontFamily: FONT.mono, fontSize: 13, color: BRAND.marfil, opacity: 0.9, marginBottom: 6 }}>
                +52 81 4593 1116
              </li>
              <li style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 300, color: BRAND.marfil, opacity: 0.85 }}>
              </li>
              <li style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 300, color: BRAND.marfil, opacity: 0.85 }}>
                Guadalajara · Jalisco
              </li>
            </ul>
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href="https://instagram.com/hand.arquitectura"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: BRAND.marfil,
                  opacity: 0.8,
                  textDecoration: 'none',
                  padding: '8px 14px',
                  border: `0.5px solid ${BRAND.marfil}50`
                }}>
                
                IG ↗
              </a>
              <a
                href="https://facebook.com/hand.arquitectura"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: BRAND.marfil,
                  opacity: 0.8,
                  textDecoration: 'none',
                  padding: '8px 14px',
                  border: `0.5px solid ${BRAND.marfil}50`
                }}>
                
                FB ↗
              </a>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 16,
          padding: '32px 0',
          borderTop: `0.5px solid ${BRAND.marfil}20`,
          borderBottom: `0.5px solid ${BRAND.marfil}20`
        }}>
          <SilhouetteSet color={BRAND.marfil} scale={0.7} />
          {isDesktop &&
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <span style={{
              fontFamily: FONT.mono,
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: `${BRAND.marfil}50`
            }}>
                Residencial / Comercial
              </span>
              <span style={{
              fontFamily: FONT.mono,
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: `${BRAND.marfil}50`
            }}>
                Remodelación / Control de obra
              </span>
            </div>
          }
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          paddingTop: 32
        }}>
          <span style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: `${BRAND.marfil}50`
          }}>
            © 2026 HND Arquitectura y Construcción
          </span>
          <span style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: `${BRAND.marfil}50`
          }}>
          </span>
        </div>
      </Container>
    </footer>);

};

// ============================================================
// BOTÓN FLOTANTE DE WHATSAPP (FAB)
// Fijo en pantalla, visible en todo el scroll. Respeta la marca.
// ============================================================
const WhatsAppFAB = () => {
  const [hover, setHover] = useStateCF(false);
  const isDesktop = useIsDesktop();
  const size = isDesktop ? 60 : 54;
  const href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed',
        right: isDesktop ? 28 : 18,
        bottom: isDesktop ? 28 : 18,
        zIndex: 1000,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: BRAND.terracota,
        color: BRAND.marfil,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        boxShadow: hover ?
        '0 10px 30px rgba(26,26,24,0.30)' :
        '0 6px 18px rgba(26,26,24,0.22)',
        transform: hover ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s'
      }}>

      <svg
        viewBox="0 0 32 32"
        width={size * 0.55}
        height={size * 0.55}
        fill="currentColor"
        aria-hidden="true"
        style={{ display: 'block' }}>
        <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.5 1.13 6.744 3.05 9.377L1.05 31.94l6.77-2.164A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.826 32 16S24.83 0 16.004 0zm9.32 22.598c-.386 1.09-1.92 1.996-3.143 2.26-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.727-6.724-7.963-7.035-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.425 1.636-3.905.386-.394.842-.573 1.32-.573.155 0 .295.008.42.014.386.017.58.04.834.648.316.762 1.086 2.66 1.178 2.854.094.194.157.42.03.73-.12.31-.226.45-.42.694-.194.244-.41.545-.586.732-.194.21-.396.437-.17.83.226.394.996 1.64 2.14 2.656 1.474 1.312 2.72 1.72 3.16 1.906.335.14.735.108 1.004-.194.34-.386.756-1.024 1.18-1.657.3-.454.68-.51 1.078-.362.406.14 2.573 1.213 3.014 1.432.44.22.732.328.84.51.107.185.107 1.05-.28 2.06z"/>
      </svg>
    </a>);

};

Object.assign(window, { CTADiagonal, Contacto, Footer, WhatsAppFAB });