const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/analyze', upload.single('image'), async (req, res) => {
  const text = req.body.text || '';
  let imageBuffer = null;

  if (req.file) {
    imageBuffer = fs.readFileSync(req.file.path);
  }

  try {
    let response;

    if (imageBuffer) {
      // Use Gemini 2.0 Vision model for image + text
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

      response = await model.generateContent({
        contents: [
          {
            parts: [
              { text },
              {
                inlineData: {
                  data: imageBuffer.toString('base64'),
                  mimeType: req.file.mimetype,
                },
              },
            ],
          },
        ],
      });

    } else {
      // Use Gemini 2.0 Flash for text-only
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

      response = await model.generateContent({
        contents: [
          {
            parts: [{ text }],
          },
        ],
      });
    }

    const result = response.response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.json({ response: result });

  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
