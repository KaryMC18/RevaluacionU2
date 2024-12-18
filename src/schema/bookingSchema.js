const { gql } = require('apollo-server');

const typeDefs = gql`
  enum BookingStatus {
    PENDING
    CONFIRMED
    CANCELLED
  }

  type Booking {
  """Identificador único de la reserva"""
  _id: ID!
  """Cliente asociado a la reserva"""
  customer: Customer!
  """Habitación reservada"""
  room: Room!
  """Fecha de inicio de la reserva (formato ISO 8601)"""
  startDate: String!
  """Fecha de fin de la reserva (formato ISO 8601)"""
  endDate: String!
  """Número total de noches reservadas"""
  nights: Int!
  """Precio total calculado automáticamente"""
  totalPrice: Float!
  """Estado de la reserva: PENDING, CONFIRMED o CANCELLED"""
  status: BookingStatus!
}


  type Query {
  """Obtiene una lista de todas las reservas, opcionalmente filtradas por estado"""
    bookings(status: BookingStatus): [Booking] 
  }

  type Mutation {
    """Crea una nueva reserva"""
    createBooking(
      customerId: ID!,
      roomId: ID!,
      startDate: String!,
      endDate: String!
    ): Booking

      """Actualiza una habitación existente"""
    updateBooking(
      bookingId: ID!,
      status: BookingStatus!
    ): Booking
  """Elimina una reserva del sistema"""
    deleteBooking(bookingId: ID!): Booking
  }
`;

module.exports = typeDefs;
