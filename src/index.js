const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const roomSchema = require('./schema/roomSchema');
const customerSchema = require('./schema/customerSchema');
const bookingSchema = require('./schema/bookingSchema');

const roomResolvers = require('./resolvers/roomResolver');
const customerResolvers = require('./resolvers/customerResolver');
const bookingResolvers = require('./resolvers/bookingResolver');

const typeDefs = [roomSchema, customerSchema, bookingSchema];
const resolvers = [roomResolvers, customerResolvers, bookingResolvers];

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(
      'mongodb+srv://kayamacedoca:UqCuguw5ZkKmoyAY@taskmanagercluster.aywkn.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Conexión a MongoDB exitosa.');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Servidor corriendo en ${url}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
