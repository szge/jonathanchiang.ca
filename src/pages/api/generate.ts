import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { TechnicalTopicType, PromptModeType } from "@/src/containers/Ideas";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const mode = req.body.mode as PromptModeType || "technical";
  const topic = req.body.topic as TechnicalTopicType || "Any topic";

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": generatePrompt(mode, topic)}
      ],
      temperature: 1,
    });
    res.status(200).json({ result: completion.data.choices[0].message });
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(mode: PromptModeType = "technical", topic: TechnicalTopicType = "Any topic") {
  let topic_prompt = "";
  switch (topic) {
    case "Supervised":
      topic_prompt = "Your idea must be related to supervised learning."
      break;
    case "Unsupervised":
      topic_prompt = "Your idea must be related to unsupervised learning."
      break;
    case "Deep learning":
      topic_prompt = "Your idea must be related to deep learning."
      break;
    case "Reinforcement learning":
      topic_prompt = "Your idea must be related to reinforcement learning."
      break;
    case "NLP":
      topic_prompt = "Your idea must be related to natural language processing."
      break;
    case "Computer vision":
      topic_prompt = "Your idea must be related to computer vision."
      break;
    case "Robotics":
      topic_prompt = "Your idea must be related to robotics."
      break;
    case "Medical":
      topic_prompt = "Your idea must be related to medical AI."
      break;
    case "Neuromorphic computing":
      topic_prompt = "Your idea must be related to neuromorphic computing."
      break;
    case "CNNs":
      topic_prompt = "Your idea must be related to convolutional neural networks."
      break;
    case "RNNs":
      topic_prompt = "Your idea must be related to recurrent neural networks."
      break;
    case "LSTM":
      topic_prompt = "Your idea must be related to LSTMs."
      break;
    case "Transformer":
      topic_prompt = "Your idea must be related to the transformer architecture."
      break;
    case "Generative":
      topic_prompt = "Your idea must be related to generative AI."
      break;
  }

  return `What is one novel approach or technique that could be developed to ensure that advanced AI systems align with human values and goals, while maintaining safety and avoiding unintended consequences?
  Consider a ${mode} aspect of AI alignment, rather than ${mode === "philosophical" ? "technical" : "philosophical"}.

  ${
    mode === "technical"
      ? topic_prompt
      : ""
  }

  Propose a novel approach that goes beyond existing research, proposes many new ideas, and introduces new technical terms.
  Summarize your idea in a few sentences.
  Your idea should be extraordinarily crazy and unconventional.
  `;
}
