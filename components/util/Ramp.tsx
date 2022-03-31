import React from "react";
import OnramperWidget from "@onramper/widget";

export default function WidgetContainer() {
  const wallets = {
    BTC: { address: "btcAddr" },
    ETH: { address: "0x0C7eC38622a148c8805B46967D1a9AF60d70c55F" },
    BNB: { address: "bnbAddress", memo: "cryptoTag" },
  };

  return (
    <div
      style={{
        width: "440px",
        height: "595px",
      }}
    >
      <OnramperWidget
        API_KEY={"pk_test_qnX_XK0zNtNU9AwKsmyVSSNEl8adsDfns7RJTaPgDo00"}
        // color={defaultColor}
        // fontFamily={fontFamily}
        //   defaultAddrs={wallets}
        // defaultAmount={defaultAmount}
        // defaultCrypto={defaultCrypto}
        // defaultFiat={defaultFiat}
        // defaultFiatSoft={defaultFiatSoft}
        // defaultPaymentMethod={defaultPaymentMethod}
        // filters={{
        //   onlyCryptos: onlyCryptos,
        //   excludeCryptos: excludeCryptos,
        //   onlyPaymentMethods: onlyPaymentMethods,
        //   excludePaymentMethods: excludePaymentMethods,
        //   excludeFiat: excludeFiat,
        //   onlyGateways: onlyGateways,
        //   onlyFiat: onlyFiat,
        // }}
        // isAddressEditable={isAddressEditable}
        // amountInCrypto={amountInCrypto}
        //   redirectURL={""}
        //   darkMode={"true"}
      />
    </div>
  );
}
