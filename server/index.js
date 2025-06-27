const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (optional, for debug)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST /predict — accepts image, returns dummy prediction
app.post('/predict', upload.single('image'), (req, res) => {

  if (!req.file) return res.status(400).json({ error: 'Image required' });

  // In real logic, run AI prediction here
  const dummyPrediction = {
    country: "India",
    region: "Tamil Nadu",
    latitude: 11.0168,
    longitude: 76.9558,
    confidence: 0.83,
  };

  res.json({
    prediction: dummyPrediction,
    filename: req.file.filename
  });
});

// POST /feedback — saves user feedback
app.post('/feedback', (req, res) => {
  const feedback = req.body;

  if (!feedback || !feedback.prediction || !feedback.rating) {
    return res.status(400).json({ error: 'Invalid feedback format' });
  }

  const line = JSON.stringify(feedback) + '\n';

  fs.appendFile('feedback_log.jsonl', line, err => {
    if (err) {
      console.error('Error saving feedback:', err);
      return res.status(500).json({ error: 'Failed to save feedback' });
    }
    res.json({ status: 'success' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 GeoLocatorAI backend running at http://localhost:${PORT}`);
});

