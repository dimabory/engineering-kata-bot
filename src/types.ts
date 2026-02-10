
export interface Challenge {
  title: string;
  body: string;
  tag: string;
}

export enum TopicType {
  HARD_ENGINEERING = 'Hard Engineering',
  DEEP_THINKING = 'Deep Thinking',
  NONE = 'None', // Weekends
}
