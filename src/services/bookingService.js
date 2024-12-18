const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

const bookingService = {
  getBookings: async (filters) => {
    try {
      return await Booking.find(filters).populate('customer').populate('room');
    } catch (error) {
      throw new Error("Error al obtener las reservas");
    }
  },

  createBooking: async ({ customerId, roomId, startDate, endDate }) => {
    try {
      const room = await Room.findById(roomId);
      if (!room || !room.availability) {
        throw new Error("La habitación no está disponible");
      }

      const nights = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      const totalPrice = nights * room.pricePerNight;

      const newBooking = new Booking({
        customer: customerId,
        room: roomId,
        startDate,
        endDate,
        nights,
        totalPrice,
        status: "PENDING",
      });

      await newBooking.save();

      room.availability = false;
      await room.save();

      return newBooking.populate('customer room');
    } catch (error) {
      throw new Error("Error al crear la reserva");
    }
  },

  updateBooking: async ({ bookingId, status }) => {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) throw new Error("Reserva no encontrada");

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
      throw new Error("Error al actualizar la reserva");
    }
  },

  deleteBooking: async (bookingId) => {
    try {
      const booking = await Booking.findByIdAndDelete(bookingId);
      if (!booking) throw new Error("Reserva no encontrada");

      // Marcar la habitación como disponible
      const room = await Room.findById(booking.room);
      if (room) {
        room.availability = true;
        await room.save();
      }

      return booking;
    } catch (error) {
      throw new Error("Error al eliminar la reserva");
    }
  },
};

module.exports = bookingService;
