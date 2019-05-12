# simple_assistant

### This is a really simple Facebook chatbot I used for Facebook messenger platform app review
The base idea behind this is to use Google Assistant as a bot to receive and reply to messages. I used the [google-assistant](https://www.npmjs.com/package/google-assistant) npm package for that
But since I'm in Vietnam and Google Assistant package haven't support Vietnamese yet (I tried), so I used the [@vitalets/google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api) package to translate Vietnamese to English and back. But Google Translate could recognize the language already so I made the bot translate the input language onto English, transfer it to Google Assistant to get reply then translate it back to the input language

### Prerequisites
- NodeJS (version 6+ maybe?) + npm

### How to setup
1. Clone/download this repository
2. `cd` into project folder and run `npm install`
3. Follow the steps [here](https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account) to get the client secret file (Download it in the Device Registration step)
4. Get the Facebook page access token by create/goto your app at https://developers.facebook.com, add the Messenger platform to your app and goto Settings (read more about Messenger Platform (here)[https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup])
![Like this](https://i.imgur.com/iUjsdrq.png)
5. Get your app secret inside your app too
6. Create .env with those variables:
```
accessToken=<Access token from step 4>
verifyToken=<Your Messenger Platform app's verify token>
appSecret=<App secret from step 5>
assistantClientSecretPath=<Assistant client secret from step 3>
```
7. `node index.js`
8. Go to Webhook part in your Facebook app Messenger Platform settings and put your webhook url as <server_ip>/webhook and your verify token the same as verifyToken variable in .env file and press Verify
9. If everything is working your webhook url will be verified and start to work immediately (for yourself)
10. If you want your chatbot to work publicly, send an app review for the pages_messaging permission

### Demo
![Demo](https://i.imgur.com/m4r4Wab.png)
