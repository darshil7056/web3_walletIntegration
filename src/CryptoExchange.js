import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

function CryptoExchange() {
  const { Moralis } = useMoralis();

  const [Data, setData] = useState({
    amount: "",
  });
  const [dex, setDex] = useState("");
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...Data, [name]: value });
    console.log(name, value);
  };
  // let dex;
  // const baseFunction = async () => {
  //   await Moralis.initPlugins();
  //   const dexdata = Moralis.Plugins.oneInch;
  //   setDex(dexdata);
  //   const result = await dexdata.getSupportedTokens({ chain: "polygon" });
  // //  console.log(result.tokens);
  //   const eth = await result.tokens[
  //     "0x1ba17c639bdaecd8dc4aac37df062d17ee43a1b8"
  //   ];
  //   console.log(eth)
  // };

  // useEffect(() => {
  //   baseFunction();
  // }, []);

  // await Moralis.enable();
  // if(!Moralis.User.current())
  //   await Moralis.authenticate();

  // const swap = async () => {
  //   const NATIVE_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  //   const ONEINCH_ADDRESS = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";
  //   const options = {
  //     chain: "eth",
  //     fromTokenAddress: NATIVE_ADDRESS,
  //     toTokenAddress: ONEINCH_ADDRESS,
  //     amount: Number(Moralis.Units.ETH("0.01")),
  //     fromAddress: Moralis.User.current().get("ethAddress"),
  //     slippage: 1,
  //   };
  //   var receipt = await dex.swap(options);
  //   console.log(receipt);
  // };
  (async function(){

    await Moralis.initPlugins();
  let dex = Moralis.Plugins.oneInch;

  
    if(!Moralis.User.current())
      await Moralis.authenticate();
})();

  async function getQuote() {
    const quote = await Moralis.Plugins.oneInch.quote({
      chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a", // The token you want to swap
      toTokenAddress: "0x1ba17c639bdaecd8dc4aac37df062d17ee43a1b8", // The token you want to receive
      amount: "1",
    });
    console.log(quote,"quote");
  };
  return (
    <>
      <div>
        {/* <button onClick={swap}>CryptoExchange</button> */}
        <button onClick={getQuote}>GetQuote</button>
      </div>
      <div className="subContainer">
        <input
          name="amount"
          placeholder="Enter Amount..."
          value={Data.amount}
          onChange={handleChange}
        ></input>
      </div>
    </>
  );
}

export default CryptoExchange;
