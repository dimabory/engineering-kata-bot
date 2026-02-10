# Engineering Kata Bot

A fully autonomous AI Agent that acts as a Senior Technical Mentor. It proactively initiates daily problem-solving sessions on Reddit to build the user's expertise in Software Architecture, Algorithms, and Systems Thinking.

## Overview

The bot operates on a "Two-Track" schedule:
- **Mon/Wed/Fri (Hard Engineering):** Focuses on technical precision, algorithms, architecture, and patterns.
- **Tue/Thu (Deep Thinking):** Focuses on meta-skills, mental models, systems thinking, and engineering culture.

It uses **Google Gemini 1.5 Pro** to generate challenges and **Snoowrap** to post them to Reddit.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd engineering-kata-bot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Copy `.env.example` to `.env` and fill in your values.
    ```bash
    cp .env.example .env
    ```
    You will need:
    - `GEMINI_API_KEY`: API key for Google Gemini.
    - `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USERNAME`, `REDDIT_PASSWORD`: Reddit API credentials.

## Usage

### Local Development (Dry Run)

To run the bot locally without posting to Reddit (prints to console instead):

```bash
# Ensure DRY_RUN=true in your .env
npm run dev
```

### Production Build

To build the TypeScript code:

```bash
npm run build
```

To run the built code (will post to Reddit if `DRY_RUN=false`):

```bash
npm start
```

## Deployment

This project is configured to run via **GitHub Actions** on a schedule (Mon-Fri at 09:30 Local Time / 07:30 UTC).

1.  Push the code to your GitHub repository.

2.  **Configure Repository Secrets:**
    The GitHub Action needs access to your API keys.
    1.  Go to your repository on GitHub.
    2.  Click **Settings** (top tab).
    3.  In the left sidebar, click **Secrets and variables** > **Actions**.
    4.  Click **New repository secret**.
    5.  Add the following secrets one by one:
        - `GEMINI_API_KEY`: Your Google Gemini API Key.
        - `REDDIT_CLIENT_ID`: Your Reddit App Client ID.
        - `REDDIT_CLIENT_SECRET`: Your Reddit App Client Secret.
        - `REDDIT_USERNAME`: Your Reddit Username.
        - `REDDIT_PASSWORD`: Your Reddit Password.

3.   The workflow `.github/workflows/daily-challenge.yml` will automatically run on schedule.
