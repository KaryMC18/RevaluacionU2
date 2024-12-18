const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');
const Customer = require('../models/customerModel');

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
        console.error("Error al obtener las reservas:", error);
        throw new Error("No se pudo obtener la lista de reservas.");
      }
    },
  },

  Mutation: {
    createBooking: async (_, { customerId, roomId, startDate, endDate }) => {
      try {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start < now) {
          throw new Error("La fecha de inicio debe ser igual o posterior a la fecha actual.");
        }

        const room = await Room.findById(roomId);
        if (!room || !room.availability) {
          throw new Error("La habitación no está disponible.");
        }

        const existingBooking = await Booking.findOne({
          room: roomId,
          $or: [
            { startDate: { $lte: end }, endDate: { $gte: start } }, // Conflicto dentro del rango
            { startDate: { $gte: start, $lte: end } } // Conflicto al solaparse
          ],
        });

        if (existingBooking) {
          throw new Error("La habitación ya está reservada en este rango de fechas.");
        }

        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * room.pricePerNight;

        const newBooking = new Booking({
          customer: customerId,
          room: roomId,
          startDate: start,
          endDate: end,
          nights,
          totalPrice,
          status: "PENDING",
        });

        await newBooking.save();

        room.availability = false;
        await room.save();

        return newBooking.populate('customer room');
      } catch (error) {
        console.error("Error al crear la reserva:", error);
        throw new Error(error.message);
      }
    },

    updateBooking: async (_, { bookingId, status }) => {
      try {
        const booking = await Booking.findById(bookingId);
        if (!booking) throw new Error("Reserva no encontrada.");

        booking.status = status;

        if (status === "CANCELLED") {
          const room = await Room.findById(booking.room);
          if (room) {
            room.availability = true;
            await room.save();
          }
        }

        await booking.save();
        return booking.populate('customer room');
      } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        throw new Error("No se pudo actualizar la reserva.");
      }
    },

    deleteBooking: async (_, { bookingId }) => {
      try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) throw new Error("Reserva no encontrada.");

        const room = await Room.findById(booking.room);
        if (room) {
          room.availability = true;
          await room.save();
        }

        return booking;
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        throw new Error("No se pudo eliminar la reserva.");
      }
    },
  },
};

module.exports = resolvers;
