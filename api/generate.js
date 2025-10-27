import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const query= req.query.prompt
    const result = await model.generateContent(query);
    res.status(200).json({ output: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
