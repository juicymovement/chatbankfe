const axios = require('axios');

class NLPHandler {
    constructor() {
        this.apiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions'; // or the appropriate endpoint
        this.headers = {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        };
    }

    async getInsightsFromGPT(inputText) {
        try {
            const response = await axios.post(this.apiEndpoint, {
                prompt: inputText,
                max_tokens: 150  // or your desired limit
            }, { headers: this.headers });
            
            if (response.data && response.data.choices && response.data.choices.length > 0) {
                return this.formatInsights(response.data.choices[0].text);
            }
        } catch (error) {
            console.error('Error while fetching insights from GPT:', error);
            return null;
        }
    }

    formatInsights(rawInsight) {
        // Modify this as per the structure you want.
        return rawInsight.trim();
    }
}

module.exports = NLPHandler;
