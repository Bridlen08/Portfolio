const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/api/projects', (req, res) => {
  res.json([{ id: 1, title: 'Debug Server', description: 'Testing connectivity' }]);
});

app.listen(PORT, () => {
  console.log('Minimalist server running on port 5001');
});
