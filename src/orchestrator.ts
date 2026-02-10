
import { Brain } from './brain';
import { RedditClient } from './reddit';
import { config } from './config';
import { TopicType } from './types';

const main = async () => {
  try {
    const brain = new Brain();
    const topic = brain.getTopic();

    if (topic === TopicType.NONE) {
      console.log('Today is a weekend. No challenge generated.');
      return;
    }

    console.log(`Today's topic: ${topic}`);
    console.log('Generating challenge...');

    const challenge = await brain.generateChallenge(topic);

    if (config.DRY_RUN) {
      console.log('--- DRY RUN ---');
      console.log(`TITLE: ${challenge.title}`);
      console.log(`BODY:\n${challenge.body}`);
      console.log(`TAG: ${challenge.tag}`);
      console.log('--- END DRY RUN ---');
    } else {
        console.log('Posting to Reddit...');
        const reddit = new RedditClient();
        await reddit.postChallenge(challenge);
        console.log('Challenge posted successfully.');
    }

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
};

main();
