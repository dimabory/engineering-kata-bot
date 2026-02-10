
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config';
import { Challenge, TopicType } from './types';
import { SYSTEM_PROMPT } from './prompt';

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

export class Brain {
  private model = genAI.getGenerativeModel({ model: config.GEMINI_MODEL });

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

    // if (config.DRY_RUN) {
    //     return {
    //         title: "Mock Challenge Title",
    //         body: "This is a mock challenge body for dry run purposes.",
    //         tag: topic
    //     };
    // }

    const prompt = `
      ${SYSTEM_PROMPT}

      Current Context:
      Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.
      The assigned topic is: ${topic}
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return this.parseResponse(text);
  }

  private parseResponse(text: string): Challenge {
    // Basic parsing logic. Robustness can be improved.
    const titleMatch = text.match(/TITLE:\s*(.+)/);
    const tagMatch = text.match(/TAG:\s*(.+)/);
    
    // Extract body: everything between TITLE line and TAG line
    const bodyMatch = text.match(/BODY:\s*([\s\S]*?)TAG:/);

    if (!titleMatch || !bodyMatch || !tagMatch) {
       // Fallback or error. For now, throw error which Orchestrator will handle.
       console.error("Malformed response from Gemini:", text);
       throw new Error("Failed to parse Gemini response. Ensure TITLE, BODY, and TAG are present.");
    }

    return {
      title: titleMatch[1].trim(),
      body: bodyMatch[1].trim(),
      tag: tagMatch[1].trim(),
    };
  }
}
