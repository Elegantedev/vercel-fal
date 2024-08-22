const express = require('express');
const path = require('path');
const { generateImage } = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const imageUrl = await generateImage(prompt);
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
