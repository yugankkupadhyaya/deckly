'use server';

import OpenAI from 'openai';
import { User } from '@prisma/client';

import { getOutlineLimit } from '../../lib/AiGenerationLimits';
import { onAuthenticateUser } from './user';

function extractJson(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/i, '')
    .trim();
}

export const generateCreativePrompt = async (userPrompt: string) => {
  const client = new OpenAI({
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'deckly',
    },
  });

  const finalPrompt = `
Create a coherent and relevant outline for the following
prompt: ${userPrompt}.
The outline should consist of at least 8 points, with
each point written as a single sentence.
Ensure the outline is well-structured and directly
related to the topic.
You MUST respond with ONLY valid JSON.
DO NOT include explanations, markdown, or extra text.

Return EXACTLY this format:

{
  "outlines": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5",
    "Point 6"
  ]
}
`;

  try {
    const completion = await client.chat.completions.create({
      model: 'deepseek/deepseek-r1-0528:free',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI that generates outlines for presentations.',
        },
        {
          role: 'user',
          content: finalPrompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      return { status: 400, error: 'No content generated' };
    }

    try {
      const cleanResponse = extractJson(responseContent);
      const jsonResponse = JSON.parse(cleanResponse);
      return { status: 200, data: jsonResponse };
    } catch (err) {
      console.error('Invalid JSON received:', responseContent, err);
      return { status: 500, error: 'Invalid JSON received from AI' };
    }
  } catch (err) {
    console.error('OpenRouter error:', err);
    return { status: 500, error: 'INTERNAL SERVER ERROR' };
  }
};
