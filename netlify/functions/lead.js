exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405 };
  }

  try {
    const { name, phone, age, type, annual, coverage, details, period } = JSON.parse(event.body);

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Leads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Phone: phone,
            Age: age,
            Type: type,
            AnnualPrice: annual,
            Coverage: coverage,
            Details: details,
            Period: period,
            Status: 'Nuevo'
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { statusCode: 500, body: error };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
