const AIRTABLE_API_KEY = 'patXXXXXXXXXXXXXXXX'; // Tu key
const AIRTABLE_BASE_ID = 'appYYYYYYYYYYYYYY';   // Tu base ID
const AIRTABLE_LEADS_TABLE = 'Leads';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  try {
    const lead = JSON.parse(event.body);
    
    await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_LEADS_TABLE}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          Name: lead.name,
          Age: lead.age,
          Type: lead.type,
          AnnualPrice: lead.annual,
          Details: lead.details,
          Coverage: lead.coverage,
          Period: lead.selectedAmount,
          Timestamp: new Date().toISOString(),
          Status: 'Nuevo Lead'
        }
      })
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

