const { gql } = require('apollo-server');

const typeDefs = gql`
 type Customer {
  """Identificador único del cliente"""
  _id: ID!
  """Nombre completo del cliente"""
  name: String!
  """Correo electrónico del cliente"""
  email: String!
  """Teléfono de contacto del cliente"""
  phone: String
}


  type Query {
   """Obtiene una lista de todos los clientes registrados"""
    customers: [Customer] 
  }

  type Mutation {
  """Crea un nuevo cliente"""
    createCustomer(
      name: String!,
      email: String!,
      phone: String!
    ): Customer

   
  }
`;

module.exports = typeDefs;
