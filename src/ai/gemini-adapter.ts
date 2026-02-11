
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { AIProvider, AIError } from './interface';

export class GeminiAdapter implements AIProvider {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(apiKey: string, modelName: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: unknown) {
      // Map Gemini specific errors to our domain AIError
      let status: number | undefined;
      let message = 'Unknown Gemini error';

      if (error instanceof Error) {
        message = error.message;
        // Check for common properties in GoogleGenerativeAI errors if any
        // Some libraries attach status to the error object
        if ('status' in error && typeof (error as any).status === 'number') {
           status = (error as any).status;
        } else if ('response' in error && (error as any).response?.status) {
           status = (error as any).response.status;
        }
      }
      
      throw new AIError(`Gemini Provider Error: ${message}`, status);
    }
  }
}
