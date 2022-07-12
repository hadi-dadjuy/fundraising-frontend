import { useMetaMask } from "metamask-react";
import daiLogo from "../dai-logo.png";
import hdtLogo from "../hdt-logo.png";
import { useEffect, useState, useRef } from "react";
import React from "react";
import {
  daiAddress,
  rewardAddress,
  vaultAddress,
} from "../blockchain/addresses";

import { getBalance, approve } from "../blockchain/ERC20";
import { deposit, claim, endSale, withdraw } from "../blockchain/Vault";

export default function Main(props) {
  const { account } = useMetaMask();
  const [daiBalance, setDaiBalance] = useState(0);
  const [poolBalance, setPoolBalance] = useState("67%");
  const inputPay = useRef(null);
  const inputReceive = useRef(null);

  useEffect(() => {
    getBalance(daiAddress, account).then((value) => {
      setDaiBalance(value);
      // expected output: "Success!"
    }); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [account]);

  const handleSubmitDeposit = async (event) => {
    event.preventDefault();
    // const input = parseFloat(inputPay.current.value);

    // if (isNaN(input)) {
    //   alert("Enter a valid number.");
    // } else if (input > daiBalance) {
    //   alert("Not enough balance.");
    // } else if (input < 0) {
    //   alert("Amount entered is negative.");
    // } else {
    //   const value = parseFloat(input);
    //   if (value < 1) {
    //     alert("Amount entered is less than minimum value ( 1 DAI ).");
    //   }

    //   let result = await approve(daiAddress, vaultAddress, value);
    //   let receipt = await result.wait();
    //   if (receipt.status === 1) {
    //     result = await deposit(value);
    //     receipt = await result.wait();
    //     if (receipt.status === 1) {
    //       console.log("Done");
    //     }
    //   }
    // }

    const result = await claim();
    const receipt = await result.wait();
    if (receipt.status === 1) {
      console.log("Done");
    }
  };

  return (
    <section className="mx-auto mt-12 pb-4 bg-white rounded-4xl z-10 relative  shadow-2xl  w-11/12 sm:w-10/12 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 ">
      <div className="flex items-center justify-between  text-gray-400 text-sm rounded-xl mx-auto px-4 py-4">
        <div className="bg-gray-200 rounded-2xl w-fit px-1.5 py-4">
          <span className="text-center text-sm px-4 py-3 cursor-pointer rounded-xl bg-brand-color text-gray-100">
            Deposit
          </span>
          <span className="text-center text-sm px-4 py-3 cursor-pointer rounded-xl  bg-gray-200">
            Withdraw
          </span>
        </div>
        <div className=" w-1/2 pl-4 ">
          <div className="flex justify-between items-center ">
            <span className="text-xs text-brand-color ">HDT Pool Balance</span>
            <span className="text-xs text-brand-color ">{poolBalance}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-brand-color h-2.5 rounded-full"
              style={{ width: poolBalance }}
            ></div>
          </div>
        </div>
      </div>

      <hr />
      <form onSubmit={handleSubmitDeposit}>
        <div className="py-4 px-4 text-gray-500 mx-auto text-xs">
          <span className="block text-sm pl-2 font-light">Pay</span>
          <div className="p-4 bg-white mt-2 border rounded-2xl focus-within:border-brand-color ">
            <div className="flex items-center justify-between">
              <img
                src={daiLogo}
                alt=""
                className="rounded-full w-12 ml-2 py-2"
              />

              <div className="">
                <input
                  type="number"
                  min="0"
                  step="0.0001"
                  name="inputPay"
                  ref={inputPay}
                  placeholder="0.0"
                  className=" text-right text-3xl pr-2 bg-white rounded-2xl py-2 pl-8 w-full text-gray-900 outline-none "
                />
              </div>
            </div>
            <div className="flex justify-between items-center py-1">
              <div className="text-right pl-2">Balance:</div>
              <div className="text-right pr-2">~ {daiBalance}</div>
            </div>
          </div>
        </div>
        <span className="flex items-center justify-center text-gray-400 animate-bounce mt-1">
          <i className="fa-solid fa-down-long fa-2x"></i>
          <i className="fa-solid fa-up-long fa-2x"></i>
        </span>

        <div className="py-4 px-4 mx-4 text-gray-500 mt-4 text-xs bg-gray-200 rounded-4xl">
          <span className="block text-sm pl-2 font-light">Receive</span>
          <div className="flex mt-2 items-center bg-white justify-between border rounded-2xl p-2 ">
            <img className="rounded-full w-12" src={hdtLogo} alt="" />
            <div className="text-right text-2xl mr-2 block bg-white w-full rounded-2xl py-2 pl-8  text-gray-900 focus:outline-none">
              <span className="text-gray-400 block" id="inputReceive">
                0.0
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="font-dosis uppercase font-semibold tracking-widest mt-4 p-4 text-gray-100 text-lg w-full duration-200 hover:ring-2 
        hover:ring-purple-500 ring-offset-4 ring-offset-purple-100 rounded-full bg-gradient-to-bl from-[#a201ff] to-fuchsia-900 drop-shadow-2xl"
          >
            Enter Amount
          </button>
        </div>
      </form>
    </section>
  );
}
