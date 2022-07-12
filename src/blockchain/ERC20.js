import erc20 from "./abis/IERC20";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const abi = erc20["abi"];

export const getContract = async (address) => {
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
  const contract = await getContract(address);
  const accBalance = await contract.balanceOf(account);
  const exp = ethers.BigNumber.from(10).pow(18);

  let balance = accBalance + "";
  let sub1 = balance.substring(0, balance.length - 18);
  let sub2 = balance.substring(balance.length - 18, balance.length - 15);
  let result = sub1 + "." + sub2;
  return result;
};

export const approve = async (address, account, value) => {
  const contract = await getContract(address);
  const approval = await contract.approve(account, toWei(value));
  return approval;
};

const toWei = (value) => {
  value = String(
    ethers.FixedNumber.fromString(String(value)).mulUnsafe(
      ethers.FixedNumber.fromString(String(10 ** 18))
    )
  );
  return value.substring(0, value.length - 2);
};
