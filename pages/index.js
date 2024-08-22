import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setImageUrl('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate image');
    }
  };

  return (
    <div className="container">
      <h1>Fal AI Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Enter your prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit">Generate Image</button>
      </form>
      {error && <p className="error">{error}</p>}
      {imageUrl && (
        <div id="result">
          <img src={imageUrl} alt="Generated Image" />
        </div>
      )}
    </div>
  );
}
