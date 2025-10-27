import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI({api_key:"AIzaSyC1o5kH4nAZuR2B0TCiEpyYji9kLXhY4_I"});

export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const prompt = req.query.prompt || "Hello from Vercel!";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    res.status(200).json({ output: result.response.text() });
  } catch (err) {
    
    res.status(500).json({ error: err});
  }
}
