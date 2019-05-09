'use strict';

require('dotenv').config();
const BootBot = require('bootbot');
let { translateAndAnswer } = require('./assistant');

let { accessToken, verifyToken, appSecret } = process.env;

const bot = new BootBot({
  accessToken,
  verifyToken,
  appSecret
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  translateAndAnswer(text)
    .then(answer => {
      chat.say(answer || ':((');
    });
});

bot.start(process.env.PORT || 3000);