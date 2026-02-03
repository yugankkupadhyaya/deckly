'use server';
import OpenAi from 'openai';
export const generateCreativePrompt = async (userPrompt: string) => {
  const openai = new OpenAi({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
  });

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
  } catch (error) {}
};
