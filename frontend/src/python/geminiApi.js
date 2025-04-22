import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBqVOV8quNcRTp03PgY7IjOmVsjHhDpEd8");

// Function to summarize medical reports
export const getChatbotResponse = async (query) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are an AI chatbot for a healthcare assistant platform. Respond to user queries empathetically. User Query: "${query}"`;

        const result = await model.generateContent(prompt);

        if (!result || !result.response?.text) {
            throw new Error("Invalid response from Gemini API");
        }

        return result.response.text;
    } catch (error) {
        console.error("Error generating chatbot response:", error);
        return "I'm sorry, but I couldn't process your request. Please try again.";
    }
};


// Function to summarize medical reports
export const summarizeMedicalReport = async (report) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are an AI assistant for summarizing medical reports. Please summarize the following report in layman’s terms:
                        Report: "${report}"`;

        const result = await model.generateContent(prompt);
        return result.response.text; // Return summarized report
    } catch (error) {
        console.error("Error summarizing medical report:", error);
        return "I'm sorry, but I couldn't process your request. Please try again.";
    }
};
