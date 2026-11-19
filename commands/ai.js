const fetch = require('node-fetch');

const MODEL = process.env.AI_MODEL || 'openrouter/auto';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function aiCommand(sock, chatId, message) {
    const raw = message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        message.message?.imageMessage?.caption || '';

    const query = raw.replace(/^\.(ai|gpt|gemini)\s*/i, '').trim();
    if (!query) {
        return sock.sendMessage(chatId, {
            text: '🤖 *FAISAL AI*\n\nApna sawal likhein:\n.ai Assalam o alaikum, aap kese hain?\n\nAI key setup ke liye README dekhein.',
        }, { quoted: message });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return sock.sendMessage(chatId, {
            text: '⚙️ AI abhi configure nahi hai. Owner ko OPENROUTER_API_KEY .env file mein set karni hogi. Apni API key kisi chat mein share na karein.',
        }, { quoted: message });
    }

    try {
        await sock.sendMessage(chatId, { react: { text: '🤖', key: message.key } });
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + apiKey,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://github.com/faisalart92/LuckyTechHub-Bot',
                'X-Title': 'FAISAL AI WhatsApp Bot'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are FAISAL AI, a helpful and honest WhatsApp assistant. Reply naturally in the same language as the user. You understand Urdu, Roman Urdu and English. Keep answers clear and concise. Never claim to be human.'
                    },
                    { role: 'user', content: query }
                ],
                temperature: 0.7,
                max_tokens: 900
            }),
            timeout: 45000
        });

        const data = await response.json();
        if (!response.ok) {
            const detail = data?.error?.message || ('HTTP ' + response.status);
            throw new Error(detail);
        }

        const answer = data?.choices?.[0]?.message?.content;
        if (!answer || typeof answer !== 'string') throw new Error('AI returned an empty response');

        await sock.sendMessage(chatId, { text: '✨ *FAISAL AI*\n\n' + answer.trim() }, { quoted: message });
    } catch (error) {
        console.error('FAISAL AI error:', error.message);
        await sock.sendMessage(chatId, {
            text: '❌ AI se jawab nahi mil saka. Thori dair baad dobara koshish karein. Agar masla rahe to API key, model aur hosting logs check karein.'
        }, { quoted: message });
    }
}

module.exports = aiCommand;
