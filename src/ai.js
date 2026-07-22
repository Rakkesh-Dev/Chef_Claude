import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients...
`


const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    try {
        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        return response.choices[0].message.content
    } catch (err) {
    console.error("Full error:", err);
    console.error("Response:", err.response);
    console.error("Error data:", err.response?.data);
    }
}