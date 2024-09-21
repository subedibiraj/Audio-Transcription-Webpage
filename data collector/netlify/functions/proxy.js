import fetch from 'node-fetch';

export const handler = async (event, context) => {
  const { api } = event.queryStringParameters;
  const method = event.httpMethod;

  let apiUrl = '';

  switch (api) {
    case 'unbiasedText':
      apiUrl = 'http://nepaliapi.us-east-1.elasticbeanstalk.com/api/auth/unbiasedText';
      break;
    case 'signup':
      apiUrl = 'http://nepaliapi.us-east-1.elasticbeanstalk.com/api/auth/signup';
      break;
    case 'login':
      apiUrl = 'http://nepaliapi.us-east-1.elasticbeanstalk.com/api/auth/login';
      break;
    case 'verify':
      apiUrl = 'http://nepaliapi.us-east-1.elasticbeanstalk.com/api/auth/verify';
      break;
    case 'audios':
      apiUrl = 'http://nepaliapi.us-east-1.elasticbeanstalk.com/api/auth/audios';
      break;
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid API route' }),
      };
  }

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method === 'POST' || method === 'PUT') {
      options.body = event.body;
    }

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    // Ensure correct content-type header is set in the response
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json', // Ensure response is treated as JSON
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json', // Set the header for errors as well
      },
      body: JSON.stringify({ error: 'Failed to fetch data from API', details: error.message }),
    };
  }
};
