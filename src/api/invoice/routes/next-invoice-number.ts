// path: ./src/api/invoice/routes/next-invoice-number.js

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/invoice/next-number",
      handler: "next-invoice-number.getNextInvoiceNumber",
      config: {
        auth: false, // Set to true if you want authentication
      },
    },
  ],
};
