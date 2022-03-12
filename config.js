const env = process.env;

const config = {
  listePerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
