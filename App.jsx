import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./ContractJson/Sale.json";
import Sale from "./components/Sale";

import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("");
  useEffect(() => {
    const format = async () => {
      const contractAddress = "0x6ECEeA36a39d6FA7e9a0E1062D8Ff6EcdD58Ccca";
      const contractAbi = abi;
      try {
        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        ethereum.on("accountsChanged", () => {
          location.reload();
        });
        setAccount(account);
        const provider = ethers.getDefaultProvider("sepolia");
        const wallet = new ethers.Wallet(
          // privateKey-goes-here,
          provider
        );
        const signer = wallet.connect(provider);

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          wallet
        );
        setState({ provider, signer, contract });
      } catch (error) {
        alert(error);
      }
    };

    format();
  }, []);
  return (
    <>
      {account ? <h3>wallet : {account}</h3> : <button>connect</button>}
      <Sale {...state} account={account[0]} />
    </>
  );
}

export default App;
