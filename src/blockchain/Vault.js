import vault from "./abis/Vault";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { ConstructorFragment } from "ethers/lib/utils";

const abi = vault["abi"];

export const getVaultContract = async (address) => {
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

export const getTimer = async (address) => {
  const contract = await getVaultContract(address);
  const salePeriod = await contract.getSalePeriod();
  console.log(salePeriod.toNumber());
  return salePeriod.toNumber();
};
