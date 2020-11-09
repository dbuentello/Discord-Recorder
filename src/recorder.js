import moment from 'moment';
import wav from 'wav';
import logger from './logger';

class Recorder {
    constructor(client) {
        this.client          = client
        this.voiceChannel    = undefined
        this.voiceConnection = undefined
        this.voiceReceiver   = undefined
        this.userStream      = undefined
        this.audioWriter     = undefined
    }
    
    leaveVoice = () => {
        // Leave the current voice channel if any
        try {
            this.voiceConnection.disconnect();
            logger.info(`I left the ${this.voiceChannel.name} channel.`)
            this.voiceConnection = undefined;
            this.voiceChannel = undefined;
            this.audioWriter = undefined;
        } catch(e) {
            console.log(e)
            return;
        }
    }
    
    joinVoice = async (voiceChannel) => {
        // Join the same voice channel of the author of the message
        try {
            this.voiceChannel = voiceChannel;
            this.voiceConnection = await this.voiceChannel.join();
            logger.info(`I joined the ${this.voiceChannel.name} channel.`)
            this.recordAudio()
        } catch (err) {
            console.error(err);
        }
    }
    
    recordAudio = async () => {
        this.voiceReceiver = this.voiceConnection.receiver;
        this.voiceConnection.on('debug', (debug) => {
            // Try to decode the packet as media event
            try {
                const packet = JSON.parse(debug.slice(8));
                // Avoid some wrong edge cases
                if(!packet.d || packet.d && packet.d.speaking != 1) return;

                const user = this.client.users.resolve(packet.d.user_id);

                if(!this.audioWriter) {
                    logger.info("Creating new media recording file in: " + `${process.env.MEDIA_OUTPUT_FOLDER}/${moment().format("YYYY-MM-DD_HHmmss")}-media-recording.wav`)
                    this.audioWriter = new wav.FileWriter(`${process.env.MEDIA_OUTPUT_FOLDER}/${moment().format("YYYY-MM-DD_HHmmss")}-media-recording.wav`);
                }

                // Record the speaking user
                if(packet.d.speaking) {
                    this.userStream = this.voiceReceiver.createStream(user, { mode: 'pcm', end: 'manual' });
                    this.userStream.on('data', (chunk) => this.audioWriter.write(chunk));
                }
            } catch (e) {
                return;
            }
        });
    }
}

export default Recorder