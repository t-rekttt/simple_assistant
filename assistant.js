require('dotenv').config();
const path = require('path');
const GoogleAssistant = require('google-assistant');
const translate = require('@vitalets/google-translate-api');

let { assistantClientSecretPath } = process.env;

const config = {
  auth: {
    keyFilePath: path.resolve(__dirname, assistantClientSecretPath),
    savedTokensPath: path.resolve(__dirname, 'tokens.json'),
  },
};

const assistant = new GoogleAssistant(config.auth);

// starts a new conversation with the assistant
const startConversation = (conversation) => {
  return new Promise(cb => {
    conversation
      .on('response', (text) => {
        cb(text);
      })
      .on('error', err => {
        throw err;
      });
  });
};

const conversationConfig = {
  lang: 'en-US', // language code for input/output (defaults to en-US)
  isNew: true, // set this to true if you want to force a new conversation and ignore the old state
  screen: {
    isOn: false, // set this to true if you want to output results to a screen
  }
}

let answer = (text) => {
  return new Promise(cb => {
    let config = conversationConfig;
    config.textQuery = text;

    assistant.start(conversationConfig, conversation => {
      startConversation(conversation).then(cb);
    });
  });
}

let translateAndAnswer = (text) => {
  let translationPromise = translate(text, { to: 'en' });

  let answerPromise = translationPromise
    .then(res => {
      let translatedText = res.text;

      return answer(translatedText);
    });

  return Promise.all([translationPromise, answerPromise])
    .then(([translation, answer]) => {
      let sourceLanguage = translation.from.language.iso;

      return translate(answer, { to: sourceLanguage });
    })
    .then(translation => translation.text);
}

module.exports = { translateAndAnswer }