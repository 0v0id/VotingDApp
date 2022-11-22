const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config();

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    goerli: {
     provider: function() {return new HDWalletProvider({privateKeys:["d8ae0697abe34fbff3894ef6d9e202f94c2d883c83574b29296e6790d8ec749d"], providerOrUrl:`https://goerli.infura.io/v3/${process.env.INFURA_ID}`})},
     network_id: "5",
    }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14",
    }
  },
};
