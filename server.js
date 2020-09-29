const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const htmlToText = require('html-to-text');
const cors = require('cors');
const path = require('path');
const enforce = require('express-sslify');

app.use(express.json());
app.use(cors());

const port = 5000;
const environment = process.env.NODE_ENV || 'dev';

// Redirect to React in non Dev environment
if (environment !== 'dev') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join("client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || port, (req, res) => {
  console.log(`Connected on port ${port}`);
});