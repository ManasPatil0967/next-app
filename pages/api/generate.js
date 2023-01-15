import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: Give me one song that accurately matches the vibes of ${req.body.book}.`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give me one song that accurately matches the vibes of ${req.body.book}.\n`,
    temperature: 0.7,
    max_tokens: 100,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;