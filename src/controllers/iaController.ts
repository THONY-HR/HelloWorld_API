import { Request, Response } from 'express';

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const SITE_URL = "https://helloworld-api.up.railway.app";
const SITE_NAME = "Anthony-Ai";

// Fonction pour appeler l'API IA
async function apiIA(API_KEY: string, SITE_URL: string, SITE_NAME: string, TOKEN_MESSAGE: any[],MODEL_IA: string): Promise<any> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": SITE_URL, // Optionnel : URL du site pour le ranking sur openrouter.ai
                "X-Title": SITE_NAME, // Optionnel : Titre du site pour le ranking sur openrouter.ai
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL_IA,
                messages: TOKEN_MESSAGE
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de l'appel à l'API IA:", error);
        throw error;
    }
}

// Contrôleur pour gérer les requêtes de chat
export const chatMistral = async (req: Request, res: Response): Promise<void> => {
    try {
        const API_KEY = "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";
        const MODEL_IA = "cognitivecomputations/dolphin3.0-r1-mistral-24b:free";
        const { TOKEN_MESSAGE } = req.body;

        if (!API_KEY || !SITE_URL || !SITE_NAME || !TOKEN_MESSAGE) {
            res.status(400).json({ error: "Tous les paramètres (API_KEY, SITE_URL, SITE_NAME, TOKEN_MESSAGE) sont requis." });
            return;
        }

        const responseData = await apiIA(API_KEY, SITE_URL, SITE_NAME, TOKEN_MESSAGE,MODEL_IA);

        res.json(responseData.choices[0].message);

    } catch (error: any) {
        res.status(500).json({ error: error.message || "Erreur serveur" });
    }
};

// Contrôleur pour gérer les requêtes de chat
export const chatDeepseek8B = async (req: Request, res: Response): Promise<void> => {
    try {
        const API_KEY = "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";
        const MODEL_IA = "deepseek/deepseek-r1-distill-llama-8b";
        const { TOKEN_MESSAGE } = req.body;

        if (!API_KEY || !SITE_URL || !SITE_NAME || !TOKEN_MESSAGE) {
            res.status(400).json({ error: "Tous les paramètres (API_KEY, SITE_URL, SITE_NAME, TOKEN_MESSAGE) sont requis." });
            return;
        }

        const responseData = await apiIA(API_KEY, SITE_URL, SITE_NAME, TOKEN_MESSAGE,MODEL_IA);

        res.json(responseData.choices[0].message);

    } catch (error: any) {
        res.status(500).json({ error: error.message || "Erreur serveur" });
    }
};

// Contrôleur pour gérer les requêtes de chat
export const chatDeepseek32B = async (req: Request, res: Response): Promise<void> => {
    try {
        const API_KEY = "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";
        const MODEL_IA = "deepseek/deepseek-r1-distill-qwen-32b";
        const { TOKEN_MESSAGE } = req.body;

        if (!API_KEY || !SITE_URL || !SITE_NAME || !TOKEN_MESSAGE) {
            res.status(400).json({ error: "Tous les paramètres (API_KEY, SITE_URL, SITE_NAME, TOKEN_MESSAGE) sont requis." });
            return;
        }

        const responseData = await apiIA(API_KEY, SITE_URL, SITE_NAME, TOKEN_MESSAGE,MODEL_IA);

        res.json(responseData.choices[0].message);

    } catch (error: any) {
        res.status(500).json({ error: error.message || "Erreur serveur" });
    }
};