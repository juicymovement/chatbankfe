
const IPFSHandler = require('../storage/IPFSHandler');
const AccountLinker = require('../account/AccountLinker');
const ConversationExporter = require('../exporter/ConversationExporter');

class ReinitializationMechanism {
    constructor() {
        this.ipfsHandler = new IPFSHandler();
        this.accountLinker = new AccountLinker();
        this.conversationExporter = new ConversationExporter();
    }

    async reinitializeAccount(oldUserId, newUserId, conversations) {
        try {
            // Unlink the old account
            const unlinkResult = await this.accountLinker.unlinkAccount(oldUserId);
            if (!unlinkResult) {
                throw new Error('Failed to unlink the old account');
            }

            // Export the conversations to IPFS
            const cid = await this.conversationExporter.exportConversations(conversations);
            if (!cid) {
                throw new Error('Failed to export conversations to IPFS');
            }

            // Link the new account
            const linkResult = await this.accountLinker.linkAccount(newUserId);
            if (!linkResult) {
                throw new Error('Failed to link the new account');
            }

            // Return the CID of the conversations on IPFS
            return cid;
        } catch (error) {
            console.error('Error while reinitializing account:', error);
            return null;
        }
    }
}

module.exports = ReinitializationMechanism;

