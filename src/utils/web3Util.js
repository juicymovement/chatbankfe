const Web3 = require('web3');

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Browser environment and MetaMask is installed.
    web3 = new Web3(window.ethereum);
} else {
    // Server-side or user doesn't have MetaMask. Use a provider.
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/YOUR_INFURA_API_KEY'
    );
    web3 = new Web3(provider);
}

module.exports = web3;
