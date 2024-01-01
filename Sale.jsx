import { useState } from "react";
import { ethers } from "ethers";
const Sale = ({ contract, account }) => {
  const [memos, setMemos] = useState({});
  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMemos({
      ...memos,
      [name]: value,
      from: account,
      timestamp: new Date().getDate(),
    });
  };
  const buy = async (e) => {
    e.preventDefault();
    const { name, message } = memos;
    const amount = { value: ethers.parseEther((0.0002).toString()) };
    const transaction = await contract.buy(name, message, amount);
    await transaction.wait();
    alert("transaction was successful");
  };
  return (
    <h3>
      <form onSubmit={buy} onChange={change}>
        <input type="text" name="name" />
        <input type="text" name="message" />
        <button type="submit"> pay </button>
      </form>
    </h3>
  );
};

export default Sale;
