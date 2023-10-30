const ipfsClient = require('ipfs-http-client');
const fs = require('fs');

class IPFSHandler {
    constructor() {
        this.ipfs = ipfsClient.create({ host: 'localhost', port: '5001', protocol: 'http' });
    }

    async addFileToIPFS(filePath) {
        try {
            const file = fs.readFileSync(filePath);
            const fileAdded = await this.ipfs.add({ path: filePath, content: file });
            return fileAdded.cid.toString();
        } catch (error) {
            console.error('Error while adding file to IPFS:', error);
            return null;
        }
    }

    async addPersonaToIPFS(persona) {
        try {
            const personaData = JSON.stringify(persona);
            const fileAdded = await this.ipfs.add(personaData);
            return fileAdded.cid.toString();
        } catch (error) {
            console.error('Error while adding persona to IPFS:', error);
            return null;
        }
    }

    async getFileFromIPFS(cid) {
        try {
            const stream = this.ipfs.cat(cid);
            let data = '';

            for await (const chunk of stream) {
                data += chunk.toString();
            }

            return data;
        } catch (error) {
            console.error('Error while fetching file from IPFS:', error);
            return null;
        }
    }
}

module.exports = IPFSHandler;
