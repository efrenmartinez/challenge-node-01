/* eslint-disable no-console */
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const postToSlack = async (user, photo, count) => {
  const data = JSON.stringify({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Reto Cumplido* \n https://github.com/${user} \n Numero de repositorios: ${count.trimStart()}`,
        },
        accessory: {
          type: "image",
          image_url: photo,
          alt_text: user,
        },
      },
    ],
  });
  const webhookURL = `${process.env.HOOK}/${process.env.TOKEN}`;
  await fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: data,
  }).then((response) => {
    console.log(response.size);
  });
};

module.exports = postToSlack;
