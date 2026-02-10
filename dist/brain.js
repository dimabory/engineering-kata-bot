"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brain = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("./config");
const types_1 = require("./types");
const prompt_1 = require("./prompt");
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.config.GEMINI_API_KEY);
class Brain {
    constructor() {
        this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }
    getTopic(date = new Date()) {
        const schedule = [
            types_1.TopicType.NONE, // 0: Sunday
            types_1.TopicType.HARD_ENGINEERING, // 1: Monday
            types_1.TopicType.DEEP_THINKING, // 2: Tuesday
            types_1.TopicType.HARD_ENGINEERING, // 3: Wednesday
            types_1.TopicType.DEEP_THINKING, // 4: Thursday
            types_1.TopicType.HARD_ENGINEERING, // 5: Friday
            types_1.TopicType.NONE // 6: Saturday
        ];
        return schedule[date.getDay()];
    }
    async generateChallenge(topic) {
        if (topic === types_1.TopicType.NONE) {
            throw new Error('No challenge generation on weekends.');
        }
        if (config_1.config.DRY_RUN) {
            return {
                title: "Mock Challenge Title",
                body: "This is a mock challenge body for dry run purposes.",
                tag: topic
            };
        }
        const prompt = `
      ${prompt_1.SYSTEM_PROMPT}

      Current Context:
      Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.
      The assigned topic is: ${topic}
    `;
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return this.parseResponse(text);
    }
    parseResponse(text) {
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
exports.Brain = Brain;
