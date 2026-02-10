
import Snoowrap from 'snoowrap';
import { config } from './config';
import { Challenge } from './types';

export class RedditClient {
  private r: Snoowrap;

  constructor() {
    this.r = new Snoowrap({
      userAgent: 'EngineeringKataBot/1.0.0',
      clientId: config.REDDIT_CLIENT_ID,
      clientSecret: config.REDDIT_CLIENT_SECRET,
      username: config.REDDIT_USERNAME,
      password: config.REDDIT_PASSWORD,
    });
  }

  public async postChallenge(challenge: Challenge): Promise<void> {
    const subredditName = `u_${config.REDDIT_USERNAME}`; // Post to user's profile
    const properTag = `\n\n*Topic: ${challenge.tag}*`;

    try {
        await (this.r.submitSelfpost({
            subredditName: subredditName,
            title: challenge.title,
            text: challenge.body + properTag
        }) as Promise<any>);
        console.log(`Successfully posted to ${subredditName}: ${challenge.title}`);
    } catch (error) {
        console.error("Failed to post to Reddit:", error);
        throw error;
    }
  }
}
