const axios = require('axios');

const FAL_API_URL = 'https://api.fal.ai/generate';
const FAL_API_KEY = process.env.FAL_API_KEY; // Use environment variable for API key

async function generateImage(prompt) {
  try {
    const response = await axios.post(FAL_API_URL, {
      prompt: prompt,
    }, {
      headers: {
        'Authorization': `Bearer ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.image_url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Image generation failed');
  }
}

module.exports = { generateImage };
