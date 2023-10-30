const NLPHandler = require('./NLPHandler');
const web3Util = require('./web3Util');

class PersonaTokenizer {
    constructor() {
        this.nlpHandler = new NLPHandler();
        // Assuming web3Util is a class, if it's utility functions then adjust accordingly
        this.web3 = new web3Util(); 
    }

    /**
     * Extract features like topics and sentiment from a conversation.
     * @param {Object} conversation - The conversation data.
     * @returns {Object} Features including topics and sentiments.
     */
    extractFeatures(conversation) {
        const topics = this.nlpHandler.extractTopics(conversation);
        const sentiment = this.nlpHandler.analyzeSentiment(conversation);
        
        return {
            topics: topics,
            sentiment: sentiment
        };
    }

    /**
     * Update the user's persona based on extracted features.
     * @param {Object} persona - The user's existing persona.
     * @param {Object} features - The extracted features from a conversation.
     * @returns {Object} Updated persona.
     */
    updatePersona(persona, features) {
        // For this example, assuming features.topics is a dictionary with topics as keys and their count as values.
        for (let topic in features.topics) {
            if (persona.topicsOfInterest[topic]) {
                persona.topicsOfInterest[topic] += features.topics[topic];
            } else {
                persona.topicsOfInterest[topic] = features.topics[topic];
            }
        }
        persona.sentiments.push(features.sentiment);
        
        return persona;
    }

    /**
     * Tokenize the persona and store on the blockchain.
     * @param {Object} persona - The user's persona to tokenize.
     * @returns {string} Token ID or some indication of success/failure.
     */
    tokenizePersona(persona) {
        persona.updateMetadataAfterConversations();
        const metadata = JSON.stringify(persona.tokenMetadata);

        try {
            const tokenId = this.web3.mintTokenWithMetadata(metadata);
            return tokenId;
        } catch (error) {
            console.error('Failed to tokenize persona:', error);
            return null;
        }
    }

    /**
     * Tokenize all conversations by first processing and updating the persona 
     * and then tokenizing the final persona.
     * @param {Array} conversations - Array of all user conversations.
     * @returns {string} Token ID or some indication of success/failure.
     */
    tokenizeAllConversations(conversations) {
        let persona = {
            topics: [],
            sentiments: []
        };

        for (const conversation of conversations) {
            const features = this.extractFeatures(conversation);
            persona = this.updatePersona(persona, features);
        }

        const tokenId = this.tokenizePersona(persona);
        return tokenId;
    }
}

module.exports = PersonaTokenizer;