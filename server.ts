import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent as required by skill guidelines
let ai: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Chat features will return warning messages.");
      return null;
    }
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// AI Forensic Assistant API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, activeLanguage, contextData } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request format. 'messages' array is required." });
    }

    const client = getGeminiClient();
    if (!client) {
      return res.json({ 
        text: activeLanguage === "it" 
          ? "La chiave API Gemini non è configurata. Per favore inseriscila nei Segreti dell'app (Settings > Secrets)." 
          : "The Gemini API Key is not configured. Please add it to your app's Secrets panel (Settings > Secrets)." 
      });
    }

    // System instruction tuned to the forensic theme
    const systemInstruction = `You are FORA Assistant, a highly advanced AI Forensic Consultant specialized in digital crime scene reconstruction and scientific forensic engineering.
Your tone should be professional, objective, scientific, and highly reassuring, as fits an expert witness testifying in a court of law.
The user is viewing the FORA system (Forensic Open Reconstruction & Analysis), which supports Blender, Meshroom, and Godot for 1:1 metric 3D and AR reconstructions.

Context about the current workspace case:
- Case ID: ${contextData?.caseInfo?.id || "N/A"}
- Case Title: ${contextData?.caseInfo?.title || "N/A"}
- Location: ${contextData?.caseInfo?.location || "N/A"}
- Investigator/Operator: ${contextData?.caseInfo?.operator || "N/A"}
- Case Description: ${contextData?.caseInfo?.description || "N/A"}

Current registered evidence markers (Reperti):
${JSON.stringify(contextData?.markers || [])}

Current registered ballistic trajectories:
${JSON.stringify(contextData?.trajectories || [])}

Answer in the language of the user's query (defaults to Italian, but respond in English, Spanish, or any other language as requested by the user).
Explain forensic concepts, crime scene mapping, bullet trajectories, and standard legal procedures in Italy (like Law 397/2000 regarding defensive investigations) in a clear, accurate, and scientifically sound way.
Keep explanations concise, focused on evidence and reconstruction, and guide the user on how they can place markers and draw trajectories in the 3D canvas above.`;

    // Map message list to Gemini contents format
    // Roles in Gemini SDK: 'user' and 'model'
    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Call generateContent
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ 
      error: "Failed to communicate with Gemini API", 
      details: error?.message || String(error) 
    });
  }
});

// Configure Vite middleware or static files serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
