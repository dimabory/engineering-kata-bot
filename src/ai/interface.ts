
export interface AIProvider {
  generateText(prompt: string): Promise<string>;
}

export class AIError extends Error {
  constructor(public message: string, public status?: number) {
    super(message);
    this.name = 'AIError';
  }
}
