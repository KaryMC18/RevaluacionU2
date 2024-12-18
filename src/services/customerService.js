const Customer = require('../models/customerModel');

const customerService = {
  getCustomers: async () => {
    try {
      return await Customer.find();
    } catch (error) {
      throw new Error("Error al obtener los clientes");
    }
  },

  createCustomer: async (args) => {
    try {
      const newCustomer = new Customer(args);
      return await newCustomer.save();
    } catch (error) {
      throw new Error("Error al registrar el cliente");
    }
  }
};

module.exports = customerService;
