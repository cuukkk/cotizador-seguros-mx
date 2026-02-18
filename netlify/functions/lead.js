// netlify/functions/lead.js
exports.handler = async (event) => {
  const lead = JSON.parse(event.body);
  
  // 1. Guarda en Airtable/Google Sheets (gratis)
  // 2. Envía WhatsApp via Twilio/WA API
  // 3. Email automático
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, lead_id: Date.now() })
  };
};
