const mongoose = require('mongoose');

const resolvers = {
  Query: {
    bookings: async (_, { status }) => {
      try {
        const filters = {};
        if (status) filters.status = status;

        return await Booking.find(filters)
          .populate('customer')
          .populate('room');
      } catch (error) {
        console.error("Error al obtener las reservas:", error.message);
        throw new Error("No se pudo obtener la lista de reservas.");
      }
    },
  },
};

module.exports = resolvers;

