import { Request, Response } from 'express';
import fetch from 'node-fetch';

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const SITE_URL = process.env.SITE_URL || "https://helloworld-api.up.railway.app";
const SITE_NAME = process.env.SITE_NAME || "Anthony-Ai";

// Fonction pour appeler l'API IA
async function apiIA(API_KEY: string, TOKEN_MESSAGE: any[], MODEL_IA: string): Promise<any> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": SITE_URL,
                "X-Title": SITE_NAME,
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

// Fonction générique pour gérer les requêtes IA
async function handleChatRequest(req: Request, res: Response, model: string, apiKeyEnvVar: string): Promise<void> {
    try {
        const API_KEY = process.env[apiKeyEnvVar];

        if (!API_KEY) {
            res.status(500).json({ error: `Clé API (${apiKeyEnvVar}) non définie dans les variables d'environnement.` });
            return;
        }

        const { TOKEN_MESSAGE } = req.body;
        if (!TOKEN_MESSAGE || !Array.isArray(TOKEN_MESSAGE)) {
            res.status(400).json({ error: "TOKEN_MESSAGE est requis et doit être un tableau." });
            return;
        }

        const responseData = await apiIA(API_KEY, TOKEN_MESSAGE, model);
        res.json(responseData.choices?.[0]?.message || { error: "Réponse invalide de l'IA." });

    } catch (error: any) {
        res.status(500).json({ error: error.message || "Erreur serveur" });
    }
}

// Définition des routes spécifiques
export const chatMistral = (req: Request, res: Response) => handleChatRequest(req, res, "cognitivecomputations/dolphin3.0-r1-mistral-24b:free", "API_KEY_MISTRAL");
export const chatDeepseek8B = (req: Request, res: Response) => handleChatRequest(req, res, "deepseek/deepseek-r1-distill-llama-8b", "API_KEY_DEEPSEEK_8B");
export const chatDeepseek32B = (req: Request, res: Response) => handleChatRequest(req, res, "deepseek/deepseek-r1-distill-qwen-32b", "API_KEY_DEEPSEEK_32B");
export const chatGPT4Turbo = (req: Request, res: Response) => handleChatRequest(req, res, "openai/gpt-4-turbo", "API_KEY_GPT4_TURBO");
