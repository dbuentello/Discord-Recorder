# Discord Recorder

## About

An helpful  [Discord](https://discordapp.com) voice & video recorder bot. This Recorder bot comes with a bunch of cool and powerful commands for both Discord and recording media streams.

## [Changelog](CHANGELOG.md)

## How to use

## Commands

#### Recording:
- `@Media Recorder join` - Join the current voice channel in which you are and record the audio.
- `@Media Recorder leave` - Leave the current voice channel in wich the bot is.

---

## Installation

- Install [Node.js v14.15.0](https://nodejs.org/en)
- Install [ffmpeg](https://ffmpeg.org), [gcc](https://gcc.gnu.org), [git](https://git-scm.com)
- Download Discord Recorder (open the [terminal](http://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal) and write `git clone https://github.com/Sense/Discord-Recorder` or if you don't have/want to use [git](https://git-scm.com/downloads), download the ZIP by clicking the green Download button at the top right of this page)
- Rename `.env.example` to `.env` in the directory and fill in the required information. Note that only variables with the `*Required*` comment are needed, everything else is optional
- [cd](https://en.wikipedia.org/wiki/Cd_%28command%29) to the directory and run `npm install` to install the Node dependencies
- Run `npm run start` in the directory to start the bot

---

## Deployment

#### Docker

The `main` branch will be pushed soon to an official Docker image.

## Updating

Updating Discord Recorder bot is like any other Node.js app. Just run `git pull && npm install` in the folder via the [terminal](http://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal) if you're on Linux or the [command prompt](http://windows.microsoft.com/en-us/windows/command-prompt-faq) if you're on Windows. You may also download the ZIP, configure it and run npm install again.

---

## Contribute or Feature Requests

Have a feature in mind? We'd love to hear about it. Feel free to [open an issue](https://github.com/Sense/Discord-Recorder/issues/new) and let us know.

## Contributors

- Jean-Vincent QUILICHINI  *(Maintainer)* - [@Sense](https://github.com/Sense) - ([twitter](https://twitter.com/jvq_txt))

## [License](LICENSE)