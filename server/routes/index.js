module.exports = [
  {
    method: "POST",
    path: "/",
    handler: "migrateController.migrate",
    config: {
      policies: [],
    },
  },
];
