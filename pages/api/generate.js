import axios from 'axios';

const FAL_API_URL = 'https://api.fal.ai/generate';
const FAL_API_KEY = process.env.FAL_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(FAL_API_URL, {
      prompt: prompt,
    }, {
      headers: {
        'Authorization': `Bearer ${FAL_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.status !== 200) {
      console.error('Fal.ai API responded with an error:', response.data);
      return res.status(response.status).json({ error: response.data });
    }

    return res.status(200).json({ imageUrl: response.data.image_url });
  } catch (error) {
    console.error('Error generating image:', error.message);
    return res.status(500).json({ error: 'Failed to generate image', details: error.message });
  }
}
