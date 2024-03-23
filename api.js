const express = require('express');
const bodyParser = require('body-parser');
const login = require('@xaviabot/fca-unofficial');
const fs=require("fs")
const appState = JSON.parse(fs.readFileSync("./appState.json"));
const app = express();
const port = 3000;

let api;
let currentGroupChatID = ''; // Store the current group chat ID

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to send messages
app.post('/send-message', async (req, res) => {
  const { message, recipientID } = req.body;

  try {
    if (!api) {
      // Initialize the API instance if it's not already initialized
      api = await login({ appState });
    }

    // Send the message
    api.sendMessage(message, recipientID);

    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
