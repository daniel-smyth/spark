const connectors = {
  injected: {}, // Metamask.
  magic: {
    apiKey: "pk_live_202FF20E4C57E3EA", // Your magic API key.
    chainId: 1, // The chain ID you want to allow on magic
  },
  walletconnect: {}, // Wallet connect.
  walletlink: {
    appName: "thirdweb - demo",
    url: "https://thirdweb.com",
    darkMode: false,
  }, // Coinbase.
};

export default connectors;
