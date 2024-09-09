require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

// MongoDB connection
const mongoConnString = require('./config/dbConfig');
mongoose.connect(mongoConnString, {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
