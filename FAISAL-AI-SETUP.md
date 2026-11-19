# FAISAL AI WhatsApp Bot setup

This project uses Baileys for WhatsApp Web multi-device connectivity. It is an unofficial WhatsApp Web client, not the official WhatsApp Business Cloud API. Use responsibly and follow WhatsApp terms; avoid bulk or unsolicited messaging.

## AI setup
1. Create an API key in your OpenRouter account.
2. In your hosting service, add the environment variable `OPENROUTER_API_KEY`.
3. Optional: set `AI_MODEL` to a model available to your account. Default: `openrouter/auto`.
4. Restart the bot.
5. Send `.ai your question`, `.gpt your question`, or `.gemini your question` in a chat.

Never put a real API key in GitHub, screenshots, or WhatsApp messages. API providers may charge for usage; check the selected model's pricing and free limits before use. This bot does not promise unlimited free AI.

## Existing chatbot
The existing `.chatbot on/off` command is group-only and responds when the bot is mentioned or a user replies to the bot. AI command `.ai` can be used in private chats and groups.

## Local run
Install dependencies with `npm install`, configure the required environment variables in your hosting dashboard or a local `.env` file, then run `npm start`.
