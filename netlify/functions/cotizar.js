exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const data = JSON.parse(event.body);
  // Lógica precios (mueve de frontend a backend)
  const CATALOGO_2026 = {
    auto: { base: 7500, models: {versa:8200,tiguan:13060}, factors: {cdmx:1.15} },
    salud: { base: 48000, factors: {age61plus:2.0} }
  };

  let annual = CATALOGO_2026[data.type]?.base || 5000;
  // Aplica factors...
  
  return {
    statusCode: 200,
    body: JSON.stringify({ annual: Math.round(annual) })
  };
};
