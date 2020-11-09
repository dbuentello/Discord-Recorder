import dotenv from 'dotenv';
import wav from 'wav';
import R from 'ramda';
import Discord from 'discord.js';

import logger from "./src/logger";
import Recorder from './src/recorder';

dotenv.config();

class BOT {
  constructor() {
    this.client = new Discord.Client();
    this.recorder = new Recorder(this.client);

    this.client.once('ready', () => {
      logger.info(`---- ${process.env.NODE_ENV.toUpperCase()} ENVIRONMENT ----`)
      logger.info(`Booting Discord Recorder BOT...`)
    });

    this.registerEvents();

    this.client.login(process.env.BOT_TOKEN);
  }

  registerEvents = () => {
    this.client.on('message', this.handleMessage)
    this.client.on('shardError', error => {
      console.error('A websocket connection encountered an error:', error);
   });
   process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    });
  }

  handleMessage = (message) => {
    // Checks if bot was mentioned
    if (message.mentions.has(this.client.user.id)) {
      const msg_split = message.content.split(' ');

      // If bot was mentioned without a command, then skip.
      if (!msg_split[1]) return;

      const suffix = R.join(' ', R.slice(2, msg_split.length, msg_split));
      let command = msg_split[1].toLowerCase();
      if (command[0] === process.env.BOT_PREFIX) command = command.slice(1);

      switch (command) {
          case "join":
              this.recorder.joinVoice(message.member.voice.channel);
              break;
          case "leave":
              this.recorder.leaveVoice();
              break;
      }
      return;
    }
  }
}

new BOT();