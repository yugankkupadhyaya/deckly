'use server';

import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { currentUser } from '@clerk/nextjs/server';
import { client } from '../../lib/prisma';
import { ContentItem, ContentType, Slide } from '../../lib/types';

/* ===============================
   OPENAI CLIENT (Single Instance)
================================= */

const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
});

/* ===============================
   UTILITY
================================= */

function extractJson(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/i, '')
    .trim();
}

/* ===============================
   GENERATE OUTLINE (UNCHANGED PROMPT)
================================= */

export const generateCreativePrompt = async (userPrompt: string) => {
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
    const completion = await openai.chat.completions.create({
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

const existingLayouts = [
  {
    id: uuidv4(),
    slideName: 'Blank card',
    type: 'blank-card',
    className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Title',
          content: '',
          placeholder: 'Untitled Card',
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Accent left',
    type: 'accentLeft',
    className: 'min-h-[300px]',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      restrictDropTo: true,
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Resizable column',
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: 'image' as ContentType,
              name: 'Image',
              content:
                'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Title',
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Column',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Heading1',
                  content: '',
                  placeholder: 'Heading1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Paragraph',
                  content: '',
                  placeholder: 'start typing here',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Heading1',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Accent Right',
    type: 'accentRight',
    className: 'min-h-[300px]',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Resizable column',
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Column',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Heading1',
                  content: '',
                  placeholder: 'Heading1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Paragraph',
                  content: '',
                  placeholder: 'start typing here',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Heading1',
            },
            {
              id: uuidv4(),
              type: 'image' as ContentType,
              name: 'Image',
              restrictToDrop: true,
              content:
                'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Title',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Image and text',
    type: 'imageAndText',
    className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Image and text',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Column',
              content: [
                {
                  id: uuidv4(),
                  type: 'image' as ContentType,
                  name: 'Image',
                  className: 'p-3',
                  content:
                    'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  alt: 'Title',
                },
              ],
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Column',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Heading1',
                  content: '',
                  placeholder: 'Heading1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Paragraph',
                  content: '',
                  placeholder: 'start typing here',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Heading1',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Text and image',
    type: 'textAndImage',
    className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Text and image',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: '',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Heading1',
                  content: '',
                  placeholder: 'Heading1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Paragraph',
                  content: '',
                  placeholder: 'start typing here',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Heading1',
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Column',
              content: [
                {
                  id: uuidv4(),
                  type: 'image' as ContentType,
                  name: 'Image',
                  className: 'p-3',
                  content:
                    'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  alt: 'Title',
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Two columns',
    type: 'twoColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Title',
          content: '',
          placeholder: 'Untitled Card',
        },
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Text and image',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: 'Paragraph',
              content: '',
              placeholder: 'Start typing...',
            },
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: 'Paragraph',
              content: '',
              placeholder: 'Start typing...',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Two columns with headings',
    type: 'twoColumnsWithHeadings',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Title',
          content: '',
          placeholder: 'Untitled Card',
        },
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Text and image',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Column',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading3' as ContentType,
                  name: 'Heading3',
                  content: '',
                  placeholder: 'Heading 3',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Paragraph',
                  content: '',
                  placeholder: 'Start typing...',
                },
              ],
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Column',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading3' as ContentType,
                  name: 'Heading3',
                  content: '',
                  placeholder: 'Heading 3',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Paragraph',
                  content: '',
                  placeholder: 'Start typing...',
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Three column',
    type: 'threeColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Column',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Title',
          content: '',
          placeholder: 'Untitled Card',
        },
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Text and image',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: '',
              content: '',
              placeholder: 'Start typing...',
            },
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: '',
              content: '',
              placeholder: 'Start typing...',
            },
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: '',
              content: '',
              placeholder: 'Start typing...',
            },
          ],
        },
      ],
    },
  },
];

/* ===============================
   IMAGE GENERATION (UNCHANGED PROMPT)
================================= */

const generateImageUrl = async (prompt: string): Promise<string> => {
  try {
    const improvedPrompt = `
Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

Description: ${prompt}

Important Notes:
- The image must be in a photorealistic style and visually compelling.
- Ensure all text, signs, or visible writing in the image are in English.
- Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
- Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
- Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.

Example use cases: business presentations,educational slides, professional designs
`;

    const response = await openai.images.generate({
      model: 'gpt-image-1', // fixed (image model)
      prompt: improvedPrompt,
      size: '1024x1024',
    });

    return response.data?.[0]?.url || 'https://via.placeholder.com/1024';
  } catch (error) {
    console.error('Error generating image', error);
    return 'https://via.placeholder.com/1024';
  }
};

/* ===============================
   RECURSIVE IMAGE FINDER
================================= */

const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images: ContentItem[] = [];

  if (layout.type === 'image') {
    images.push(layout);
  }

  if (Array.isArray(layout.content)) {
    layout.content.forEach((child) => {
      images.push(...findImageComponents(child as ContentItem));
    });
  } else if (layout.content && typeof layout.content === 'object') {
    images.push(...findImageComponents(layout.content as ContentItem));
  }

  return images;
};

const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);

  for (const component of imageComponents) {
    component.content = await generateImageUrl(component.alt || 'Place Holder image');
  }
};

/* ===============================
   GENERATE LAYOUTS JSON
================================= */

export const generateLayoutsJson = async (outlineArray: string[]) => {
  const prompt = `You are a highly creative AI that generates
JSON-based layouts for presentations. I will
provide you with an array of outlines, and for
each outline, you must generate a unique and
creative layout. Use the existing layouts as
examples for structure and design, and generate
unique designs based on the provided outline.

### Guidelines:
1. Write layouts based on the specific outline
   provided.
2. Use diverse and engaging designs, ensuring
   each layout is unique.
3. Adhere to the structure of existing layouts
   but add new styles or components if needed.
4. Fill placeholder data into content fields
   where required.
5. Generate unique image placeholders for the
   'content' property of image components and also
   alt text according to the outline.
6. Ensure proper formatting and schema alignment
   for the output JSON.

### Example Layouts:
${JSON.stringify(existingLayouts, null, 2)}

### Outline Array:
${JSON.stringify(outlineArray)}

For each entry in the outline array, generate:
- A unique JSON layout with creative designs.
- Properly filled content, including
  placeholders for image components.
- Clear and well-structured JSON data.
For Images
- The alt text should describe the image clearly
  and concisely.
- Focus on the main subject(s) of the image and
  any relevant details such as colors, shapes,
  people, or objects.
- Ensure the alt text aligns with the context of
  the presentation slide it will be used on (e.g.,
  professional, educational, business-related).
- Avoid using terms like "image of" or "picture
  of," and instead focus directly on the content
  and meaning.

Output the layouts in JSON format. Ensure there
are no duplicate layouts across the array.

You MUST respond with ONLY valid JSON.
DO NOT include explanations, markdown, or extra text.

Return EXACTLY this format:

{
  "layouts": [
    // array of layout objects
  ]
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1-0528:free',
      messages: [
        { role: 'system', content: 'you generate json layout for presentations' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 5000,
      temperature: 0.7,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      return { status: 400, error: 'No content generated' };
    }

    const cleanResponse = extractJson(responseContent);
    const parsed = JSON.parse(cleanResponse);

    await Promise.all(parsed.layouts.map((layout: Slide) => replaceImagePlaceholders(layout)));

    return { status: 200, data: parsed.layouts };
  } catch (error) {
    console.error('Layout generation error', error);
    return { status: 500, error: 'Layout generation failed' };
  }
};

/* ===============================
   MAIN CONTROLLER
================================= */

export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return { status: 400, error: 'Project Id is required' };
    }

    const user = await currentUser();
    if (!user) {
      return { status: 404, error: 'User not authenticated' };
    }

    const project = await client.project.findFirst({
      where: { id: projectId, isDeleted: false },
    });

    if (!project || !project.outlines?.length) {
      return { status: 400, error: 'Project does not have any outlines' };
    }

    const layouts = await generateLayoutsJson(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }

    await client.project.update({
      where: { id: projectId },
      data: { slides: layouts.data, themeName: theme },
    });

    return { status: 200, data: layouts.data };
  } catch (error) {
    console.error('ERROR', error);
    return { status: 500, error: 'Internal server error', data: [] };
  }
};
