import { config } from './config';
import { Challenge, TopicType } from './types';
import { SYSTEM_PROMPT } from './prompt';
import { AIProvider } from './ai/interface';
import { GeminiAdapter } from './ai/gemini-adapter';

export class Brain {
  private aiProvider: AIProvider;

  constructor(aiProvider?: AIProvider) {
    this.aiProvider = aiProvider || new GeminiAdapter(config.GEMINI_API_KEY, config.GEMINI_MODEL);
  }

  public getTopic(date: Date = new Date()): TopicType {
    const schedule = [
      TopicType.NONE,             // 0: Sunday
      TopicType.HARD_ENGINEERING, // 1: Monday
      TopicType.DEEP_THINKING,    // 2: Tuesday
      TopicType.HARD_ENGINEERING, // 3: Wednesday
      TopicType.DEEP_THINKING,    // 4: Thursday
      TopicType.HARD_ENGINEERING, // 5: Friday
      TopicType.NONE              // 6: Saturday
    ];
    return schedule[date.getDay()];
  }

  public async generateChallenge(topic: TopicType): Promise<Challenge> {
    if (topic === TopicType.NONE) {
      throw new Error('No challenge generation on weekends.');
    }

    const prompt = `
      ${SYSTEM_PROMPT}

      Current Context:
      Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.
      The assigned topic is: ${topic}
    `;

    const text = await this.aiProvider.generateText(prompt);

    return this.parseResponse(text);
  }

  private parseResponse(text: string): Challenge {
    const titleMatch = text.match(/TITLE:\s*(.+)/);
    const tagMatch = text.match(/TAG:\s*(.+)/);
    const bodyMatch = text.match(/BODY:\s*([\s\S]*?)TAG:/);

    if (!titleMatch || !bodyMatch || !tagMatch) {
       console.error("Malformed response from AI:", text);
       throw new Error("Failed to parse AI response. Ensure TITLE, BODY, and TAG are present.");
    }

    return {
      title: titleMatch[1].trim(),
      body: bodyMatch[1].trim(),
      tag: tagMatch[1].trim(),
    };
  }
}
