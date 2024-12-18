const Room = require('../models/roomModel');

const roomService = {
  getRooms: async (filters) => {
    try {
      return await Room.find(filters);
    } catch (error) {
      throw new Error("Error al obtener las habitaciones");
    }
  },

  createRoom: async (args) => {
    try {
      const newRoom = new Room({ ...args, availability: true }); 
      return await newRoom.save();
    } catch (error) {
      throw new Error("Error al crear la habitación");
    }
  }
};

module.exports = roomService;
