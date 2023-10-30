const IPFSHandler = require('../storage/IPFSHandler');

class ContextParser {
    constructor() {
        this.ipfsHandler = new IPFSHandler();
    }

    async parseContext(conversationId) {
        try {
            const conversationData = await this.getConversationData(conversationId);
            if (!conversationData) {
                console.error('No conversation data found for the given ID:', conversationId);
                return null;
            }

            const context = this.extractContext(conversationData);
            return context;
        } catch (error) {
            console.error('Error while parsing context:', error);
            return null;
        }
    }

    async getConversationData(conversationId) {
        try {
            const conversationData = await this.ipfsHandler.getFileFromIPFS(conversationId);
            return JSON.parse(conversationData);
        } catch (error) {
            console.error('Error while fetching conversation data:', error);
            return null;
        }
    }

    extractContext(conversationData) {
        // This is a simple example. You may want to implement a more sophisticated context extraction algorithm.
        const messages = conversationData.messages;
        const context = messages.map(message => message.text).join(' ');
        return context;
    }
}

module.exports = ContextParser;
