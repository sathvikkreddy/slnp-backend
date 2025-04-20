/**
 * invoice controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::invoice.invoice", ({ strapi }) => ({
  async findOne(ctx) {
    console.log("Route params:", ctx.params);
    return await super.findOne(ctx);
  },
}));
