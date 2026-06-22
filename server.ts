import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialization for Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  
  // Proxy NASA APOD
  app.get("/api/nasa/apod", async (req, res) => {
    try {
      const { date } = req.query;
      const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ""}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch NASA APOD data" });
    }
  });

  // Proxy NASA Mars Rover
  app.get("/api/nasa/mars-rover", async (req, res) => {
    try {
      const { rover, sol, camera } = req.query;
      const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
      const cameraParam = camera ? `&camera=${camera}` : "";
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${cameraParam}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Mars Rover data" });
    }
  });

  // AI Space Advisor Endpoint
  app.post("/api/ai/advisor", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          systemInstruction: "You are the Celestial Explorer Space Advisor. You provide concise, engaging, and accurate astronomical information. You use formatting like bolding and bullet points to make facts scannable. Use your expertise to explain space phenomena, mission details, and celestial bodies. If provided with context (like a specific APOD or Mars photo description), integrate it into your answer.",
        },
      });

      res.json({ text: response.text || "No response generated." });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "AI Advisor is momentarily offline." });
    }
  });

  // NASA EPIC (Earth) Proxy
  app.get("/api/nasa/epic", async (req, res) => {
    try {
      const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
      const response = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch EPIC data" });
    }
  });

  // NASA DONKI (Space Weather) Proxy
  app.get("/api/nasa/donki", async (req, res) => {
    try {
      const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
      // Get last 30 days of CMEs
      const today = new Date();
      const past = new Date();
      past.setDate(today.getDate() - 30);
      const start = past.toISOString().split('T')[0];
      
      const response = await fetch(`https://api.nasa.gov/DONKI/CME?startDate=${start}&api_key=${apiKey}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch solar telemetry" });
    }
  });

  // NASA Exoplanet Archive Proxy (Simplified discovery list)
  app.get("/api/nasa/exoplanets", async (req, res) => {
    try {
      // Using a filtered query to keep payload manageable
      const query = "select+pl_name,hostname,discoverymethod,disc_year,pl_orbper+from+pscomppars+where+disc_year=2024+order+by+disc_pubdate+desc";
      const response = await fetch(`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exoplanet data" });
    }
  });

  // NASA TechPort Proxy
  app.get("/api/nasa/techport", async (req, res) => {
    try {
      const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
      const response = await fetch(`https://api.nasa.gov/techport/api/projects?api_key=${apiKey}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch TechPort data" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
