//Import
const db = require('../services/db');
const config = require('../config');

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.lang) {
    messages.push('lang is empty');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Author is empty');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(quoteObj) {
  validateCreate(quoteObj);
  const { lang, quote, author } = quoteObj;
  const result = db.run(
    `INSERT INTO quote (lang, quote, author) VALUES (@lang, @quote, @author)`,
    { lang, quote, author }
  );

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }
  return { message };
}

module.export = { getMultiple, create };
