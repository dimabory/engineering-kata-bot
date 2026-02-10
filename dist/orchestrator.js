"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brain_1 = require("./brain");
const reddit_1 = require("./reddit");
const config_1 = require("./config");
const types_1 = require("./types");
const main = async () => {
    try {
        const brain = new brain_1.Brain();
        const topic = brain.getTopic();
        if (topic === types_1.TopicType.NONE) {
            console.log('Today is a weekend. No challenge generated.');
            return;
        }
        console.log(`Today's topic: ${topic}`);
        console.log('Generating challenge...');
        const challenge = await brain.generateChallenge(topic);
        if (config_1.config.DRY_RUN) {
            console.log('--- DRY RUN ---');
            console.log(`TITLE: ${challenge.title}`);
            console.log(`BODY:\n${challenge.body}`);
            console.log(`TAG: ${challenge.tag}`);
            console.log('--- END DRY RUN ---');
        }
        else {
            console.log('Posting to Reddit...');
            const reddit = new reddit_1.RedditClient();
            await reddit.postChallenge(challenge);
            console.log('Challenge posted successfully.');
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
};
main();
