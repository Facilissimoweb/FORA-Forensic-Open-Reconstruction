export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { messages, activeLanguage, contextData } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request format. 'messages' array is required." });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ 
        text: activeLanguage === "it" 
          ? "La chiave API Groq (GROQ_API_KEY) non è configurata. Per favore inseriscila nei Segreti dell'app (Settings > Secrets) o nelle variabili d'ambiente di Vercel." 
          : "The Groq API Key (GROQ_API_KEY) is not configured. Please add it to your app's Secrets panel (Settings > Secrets) or Vercel environment variables." 
      });
    }

    const currentLocalTime = new Date().toISOString();

    const systemInstruction = `You are the FORA AI Forensic Assistant, an expert digital forensic scientist, crime scene reconstruction specialist, and legal expert in forensic procedures.
Current Local Time: ${currentLocalTime}

Your objective is to assist forensic investigators, judges, and lawyers in analyzing 3D digital crime scenes, mapping evidence, and verifying bullet trajectory alignments with maximum scientific precision and legal accuracy.

You have access to the current forensic dossier metadata:
- Case Info: ${JSON.stringify(contextData?.caseInfo || {})}
- Current Evidence Markers: ${JSON.stringify(contextData?.markers || [])}
- Ballistic Trajectories: ${JSON.stringify(contextData?.trajectories || [])}

When answering, adopt the language requested: "${activeLanguage}".
Explain forensic concepts, crime scene mapping, bullet trajectories, and standard legal procedures in Italy (like Law 397/2000 regarding defensive investigations) in a clear, accurate, and scientifically sound way.
Keep explanations concise, focused on evidence and reconstruction, and guide the user on how they can place markers and draw trajectories in the 3D canvas above.`;

    const formattedMessages = [
      {
        role: "system",
        content: systemInstruction
      },
      ...messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: formattedMessages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const responseText = data?.choices?.[0]?.message?.content || "";

    res.status(200).json({ text: responseText });
  } catch (error: any) {
    console.error("Groq API error on Vercel:", error);
    res.status(500).json({ 
      error: "Failed to communicate with Groq API", 
      details: error?.message || String(error) 
    });
  }
}
