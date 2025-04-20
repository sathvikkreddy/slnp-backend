// path: ./src/api/invoice/controllers/next-invoice-number.js

"use strict";

import { format } from "date-fns";

module.exports = {
  async getNextInvoiceNumber(ctx) {
    try {
      // Get the prefix pattern from query params or use default
      const prefix = ctx.query.prefix || `SLNP/${format(getThisFinancialYear().from, "yyyy")}-${format(getThisFinancialYear().to, "yy")}/`;

      // Find the latest invoice with the given prefix
      const invoices = await strapi.entityService.findMany("api::invoice.invoice", {
        filters: {
          invoice_number: {
            $containsi: prefix,
          },
        },
        sort: { createdAt: "desc" },
        limit: 100, // Fetch enough to ensure we get the highest number
      });

      // Initialize variables to track the highest number found
      let highestNumber = 0;

      // Process each invoice to extract the numeric part
      invoices.forEach((invoice) => {
        if (invoice.invoice_number && invoice.invoice_number.startsWith(prefix)) {
          // Extract the numeric part after the prefix
          const numericPart = invoice.invoice_number.substring(prefix.length);
          const num = parseInt(numericPart, 10);

          // Update highestNumber if this one is larger
          if (!isNaN(num) && num > highestNumber) {
            highestNumber = num;
          }
        }
      });

      // Generate the next invoice number
      const nextNumber = highestNumber + 1;

      return { prefix, nextNumber };
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};

const getThisFinancialYear = () => {
  const today = new Date();
  const year = today.getFullYear();

  const isBeforeApril = today.getMonth() < 3; // Jan=0, Feb=1, Mar=2
  const fromYear = isBeforeApril ? year - 1 : year;
  const toYear = isBeforeApril ? year : year + 1;

  return {
    from: new Date(fromYear, 3, 1), // April 1
    to: new Date(toYear, 2, 31), // March 31
  };
};
