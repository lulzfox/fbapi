const express = require('express');
const bodyParser = require('body-parser');
const login = require('@xaviabot/fca-unofficial');
const fs=require("fs")
const appState = JSON.parse(fs.readFileSync("./appState.json"));
const app = express();
const port = 3000;

let api;
let currentGroupChatID = ''; 

app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  const { message, recipientID } = req.body;

  try {
    if (!api) {
      api = await login({ appState });
    }

    api.sendMessage(message, recipientID);

    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
