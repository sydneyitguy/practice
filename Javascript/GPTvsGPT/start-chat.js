import * as dotenv from 'dotenv';
dotenv.config();

import got from 'got';

const API_KEY = process.env.OPEN_AI_API_KEY;
const SUFFIX = "Continue conversation freely, answer shortly less than 2 sentences.";

async function requestGPT(question) {
  try {
    const response = await got.post('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      json: {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
        temperature: 0.9,
        max_tokens: 2000
      },
      responseType: 'json'
    });

    return response.body.choices[0].message.content;
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
    process.exit(1);
  }
}

let answer = await requestGPT(`Let's discuss something deep and dark. ${SUFFIX}`);
for (let i = 0; i < 100; i++) {
  const party = i % 2 === 0 ? 'AI-A' : 'AI-B';
  console.log(`${party}:\n ${answer}\n`);

  answer = await requestGPT(`${answer} ${SUFFIX}`);
}