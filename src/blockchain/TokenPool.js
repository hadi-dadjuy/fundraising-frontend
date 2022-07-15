import vault from "./abis/TokenPool_Schema";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { tokenPoolAddress } from "./Addresses";

const abi = vault["abi"];

export const getVaultContract = async () => {
  let provider = await detectEthereumProvider();

  if (provider) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = await new ethers.Contract(tokenPoolAddress, abi, signer);
      return contract;
    } catch (e) {
      return false;
    }
  } else {
    console.log("Please install MetaMask!");
  }
};

export const getSaleRemainingTime = async () => {
  const contract = await getVaultContract();
  const salePeriod = await contract.getSaleRemainingTime();
  return salePeriod.toNumber();
};

export const deposit = async (value) => {
  const contract = await getVaultContract();
  return await contract.deposit(toWei(value));
};

export const claim = async () => {
  const contract = await getVaultContract();
  return await contract.claim();
};
export const endSale = async () => {
  const contract = await getVaultContract();
  return await contract.endSale();
};

export const withdraw = async (acc) => {
  const contract = await getVaultContract();
  return await contract.withdraw(acc);
};

export const getAssetBalance = async () => {
  const contract = await getVaultContract();
  const balance = await contract.getAssetBalance();
  return toBNNumber(balance);
};

export const getAssetRewardBalance = async () => {
  const contract = await getVaultContract();
  const balance = await contract.getAssetRewardBalance();
  return toBNNumber(balance);
};

export const getCurrentAssetBalance = async () => {
  const contract = await getVaultContract();

  const balance = await contract.currentAssetBalance();
  return toBNNumber(balance);
};

export const getUserInfo = async () => {
  const contract = await getVaultContract();

  const info = await contract.getUserInfo();
  return info;
};

export const getUserStatus = async () => {
  const contract = await getVaultContract();
  const result = await contract.getUserStatus();
  return result;
};

export const getCurrentRewardBalance = async () => {
  const contract = await getVaultContract();

  const balance = await contract.currentRewardBalance();
  return toBNNumber(balance);
};
const toWei = (value) => {
  value = String(
    ethers.FixedNumber.fromString(String(value)).mulUnsafe(
      ethers.FixedNumber.fromString(String(10 ** 18))
    )
  );
  return value.substring(0, value.length - 2);
};

export const toBNNumber = (value) => {
  return ethers.BigNumber.from(
    value.div(ethers.BigNumber.from(10).pow(18))
  ).toNumber();
};
