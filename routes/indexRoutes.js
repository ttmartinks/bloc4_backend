const testRoutes = require('./testRoutes');


module.exports = (app) => {
  app.use('/api', testRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found, try /api', message: 'Please check your URL.' });
  });
}