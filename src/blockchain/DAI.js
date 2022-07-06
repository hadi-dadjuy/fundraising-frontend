import erc20 from "./abis/IERC20";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const abi = erc20["abi"];

export const getDAIContract = async (address) => {
  let provider = await detectEthereumProvider();

  if (provider) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = await new ethers.Contract(address, abi, signer);
      return contract;
    } catch (e) {
      return false;
    }
  } else {
    console.log("Please install MetaMask!");
  }
};

export const getBalance = async (address, account) => {
  const contract = await getDAIContract(address);

  const accBalance = await contract.balanceOf(account);
  const exp = ethers.BigNumber.from(10).pow(18);

  return accBalance.div(exp).toNumber();
};
