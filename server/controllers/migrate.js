"use strict";

module.exports = ({ strapi }) => ({
  async migrate(ctx) {
    const response = await strapi
      .plugin("strapi-plugin-data-migrate")
      .service("migrateService")
      .migrate(ctx);

    if (response.result === "fail") {
      return ctx.badRequest("Invalid Credentials", {
        error: response.errorMessage,
      });
    }

    return response;
  },
});
