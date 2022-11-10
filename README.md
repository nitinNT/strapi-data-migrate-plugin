# Strapi Plugin Data Migrate

A quick description of strapi-plugin-data-migrate.

# How to install:

1.  In a root folder of your strapi project run npm install @nitin.tejuja12/strapi-plugin-data-migrate --save
2.  Rebuild admin UI strapi build
3.  Run strapi strapi develop

# Configuration
`config/plugins.js`
```
module.exports = ({ env }) => ({
    'strapi-plugin-data-migrate': {
        enabled:true
    },
});
```