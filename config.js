const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 20,
};

module.exports = config;
