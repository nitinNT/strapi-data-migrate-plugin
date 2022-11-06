'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-data-migrate')
      .service('myService')
      .getWelcomeMessage();
  },
});
