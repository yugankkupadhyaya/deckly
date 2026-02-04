'use server';
import OpenAi from 'openai';
import { OpenRouter } from '@openrouter/sdk';
import { statsBuffer } from 'framer-motion';
import { error } from 'console';

export const generateCreativePrompt = async (userPrompt: string) => {
  const openrouter = new OpenRouter({ apiKey: process.env.OPEN_ROUTER_API_KEY });

  const finalPrompt = `
Create a coherent and relevant outline for the following
prompt: ${userPrompt}.
The outline should consist of at least 6 points, with
each point written as a single sentence.
Ensure the outline is well-structured and directly
related to the topic.
Return the output in the following JSON format:

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

Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations  outside the JSON.
`;
  try {
    const completion = await openrouter.chat.send({
      model: 'openai/gpt-oss-120b:free',
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
      maxTokens: 1000,
      temperature: 0.0,
    });

    const responseContent = completion.choices[0].message?.content;
    if (responseContent && typeof responseContent === 'string') {
      try {
        const jsonResponse = JSON.parse(responseContent);
        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.error('Invalid JSON received ', responseContent, error);
        return { status: 500, error: 'Invalid JSON received from AI' };
      }
    }
    return { status: 400, error: 'No content generated' };
  } catch (error) {
    console.error('error', error);
    return { status: 500, error: 'iNTERNAL SERVER ERROR' };
  }
};
