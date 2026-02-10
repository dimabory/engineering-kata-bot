"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedditClient = void 0;
const snoowrap_1 = __importDefault(require("snoowrap"));
const config_1 = require("./config");
class RedditClient {
    constructor() {
        this.r = new snoowrap_1.default({
            userAgent: 'EngineeringKataBot/1.0.0',
            clientId: config_1.config.REDDIT_CLIENT_ID,
            clientSecret: config_1.config.REDDIT_CLIENT_SECRET,
            username: config_1.config.REDDIT_USERNAME,
            password: config_1.config.REDDIT_PASSWORD,
        });
    }
    async postChallenge(challenge) {
        const subredditName = `u_${config_1.config.REDDIT_USERNAME}`; // Post to user's profile
        const properTag = `\n\n*Topic: ${challenge.tag}*`;
        try {
            await this.r.submitSelfpost({
                subredditName: subredditName,
                title: challenge.title,
                text: challenge.body + properTag
            });
            console.log(`Successfully posted to ${subredditName}: ${challenge.title}`);
        }
        catch (error) {
            console.error("Failed to post to Reddit:", error);
            throw error;
        }
    }
}
exports.RedditClient = RedditClient;
