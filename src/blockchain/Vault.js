import vault from "./abis/Vault";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { ConstructorFragment } from "ethers/lib/utils";
import { vaultAddress } from "./addresses";

const abi = vault["abi"];

export const getVaultContract = async () => {
  let provider = await detectEthereumProvider();

  if (provider) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = await new ethers.Contract(vaultAddress, abi, signer);
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
const toWei = (value) => {
  value = String(
    ethers.FixedNumber.fromString(String(value)).mulUnsafe(
      ethers.FixedNumber.fromString(String(10 ** 18))
    )
  );
  return value.substring(0, value.length - 2);
};
