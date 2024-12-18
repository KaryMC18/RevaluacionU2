const { gql } = require('apollo-server');

const typeDefs = gql`
  type Room {
  """Identificador único de la habitación"""
  _id: ID!
  """Nombre de la habitación, por ejemplo, 'Suite Presidencial'"""
  name: String!
  """Tipo de habitación: 'suite', 'doble', 'sencilla'"""
  type: String!
  """Precio por noche en la moneda configurada"""
  pricePerNight: Float!
  """Características adicionales de la habitación"""
  features: [String]
  """Disponibilidad de la habitación: true si está disponible"""
  availability: Boolean!
}


  type Query {
  """Obtiene una lista de todas las habitaciones disponibles"""
    rooms(type: String, priceRange: Float): [Room] 
  }

  type Mutation {
    """Crea una nueva habitación en el sistema"""
    createRoom(
      name: String!,
      type: String!,
      pricePerNight: Float!,
      features: [String]
    ): Room

  }
`;

module.exports = typeDefs;
