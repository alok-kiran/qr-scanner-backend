const axios = require("axios");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const DB = require("./mock-database");
const app = express();
const port = process.env.PORT || 3008;

const store = new DB();

app.get("/message", async (req, res) => {
  try {
    const { qrcode, userId } = req.query;
    const { data } = await axios.get(
      `https://docs.bcomo.com/qrcode/${qrcode}`,
      {
        headers: { "x-api-key": "secret123" },
      }
    );
    await store.addRecord({
      id: uuidv4(),
      userId,
      qrcode,
      response: data,
      timestamp: new Date().getTime(),
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/scans/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await store.getRecordByUserId(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
