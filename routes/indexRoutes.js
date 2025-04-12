const testRoutes = require('./testRoutes');
const ressourceRoutes = require('./ressourceRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const userRoutes = require('./userRoutes');


module.exports = (app) => {

  app.use('/api/user', userRoutes);

  app.use('/api/ressource', ressourceRoutes);

  app.use('/api/exercise', exerciseRoutes);

  app.use('/api', testRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found, try /api', message: 'Please check your URL.' });
  });
}