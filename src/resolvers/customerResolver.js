const Customer = require('../models/customerModel'); 
const resolvers = {
  Query: {
    customers: async () => {
      try {
        return await Customer.find();
      } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw new Error("No se pudo obtener la lista de clientes");
      }
    },
  },
  Mutation: {
    createCustomer: async (_, { name, email, phone }) => {
      try {
        const newCustomer = new Customer({ name, email, phone });
        await newCustomer.save();
        return newCustomer;
      } catch (error) {
        console.error("Error al crear cliente:", error);
        throw new Error("No se pudo registrar el cliente");
      }
    },
  },
};

module.exports = resolvers;
