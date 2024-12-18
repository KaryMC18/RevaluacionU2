const Room = require('../models/roomModel'); 

const resolvers = {
  Query: {
    rooms: async (_, { type, priceRange }) => {
      try {
        const filters = {};
        if (type) filters.type = type;
        if (priceRange) filters.pricePerNight = { $lte: priceRange };

        const rooms = await Room.find(filters);
        return rooms;
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
        throw new Error("No se pudo obtener la lista de habitaciones");
      }
    },
  },
  Mutation: {
    createRoom: async (_, { name, type, pricePerNight, features }) => {
      try {
        const newRoom = new Room({
          name,
          type,
          pricePerNight,
          features,
          availability: true, 
        });
        await newRoom.save();
        return newRoom;
      } catch (error) {
        console.error("Error al crear habitación:", error);
        throw new Error("No se pudo crear la habitación");
      }
    },
  },
};

module.exports = resolvers;
