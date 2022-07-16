import { useMetaMask } from "metamask-react";
import daiLogo from "../dai-logo.png";
import hdtLogo from "../hdt-logo.png";
import { useEffect, useState } from "react";
import { splitNumber } from "../utils.js";

import React from "react";
import { rewardAddress } from "../blockchain/Addresses";

import {
  claim,
  getAssetBalance,
  getCurrentAssetBalance,
  getUserInfo,
  toBNNumber,
  getClaimAmount,
} from "../blockchain/TokenPool";

export default function Claim(props) {
  const { account } = useMetaMask();
  const [assetBalance, setAssetBalance] = useState(0);
  const [currentAssetBalance, setCurrentAssetBalance] = useState(0);
  const [userStatus, setUserStatus] = useState(0);
  const [poolBalance, setPoolBalance] = useState("100%");
  const [amountDeposited, setAmountDeposited] = useState(0);
  const [boughtAmount, setBoughtAmount] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);

  useEffect(() => {
    getAssetBalance().then((value) => {
      setAssetBalance(value);
    });

    getCurrentAssetBalance().then((value) => {
      setCurrentAssetBalance(value);
    });

    getUserInfo().then((value) => {
      setAmountDeposited(toBNNumber(value.deposited));
      setUserStatus(value.userStatus);
    });
    getClaimAmount().then((value) => {
      setBoughtAmount(toBNNumber(value[0]));
      setRewardAmount(toBNNumber(value[1]));
    });
    if (userStatus > 0) {
      props.showSpinner(false);
    }

    const setPoolBalancePct = () => {
      let poolPct = (currentAssetBalance / assetBalance) * 100;
      if (isNaN(poolPct)) {
        poolPct = 0;
      }

      setPoolBalance(parseFloat(poolPct).toFixed(2) + "%");
    };
    setPoolBalancePct();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [account, assetBalance, currentAssetBalance, userStatus]);

  const handleSubmitDeposit = async (event) => {
    event.preventDefault();

    if (userStatus === 1) {
      props.showSpinner(true);

      try {
        const result = await claim();
        const receipt = await result.wait();
        console.log(result);
        if (receipt.status === 1) {
          alert(
            "You successfuly claimed " +
              boughtAmount +
              " HDT + " +
              rewardAmount +
              " HDT as Reward" +
              "\nContract Address  " +
              rewardAddress
          );
          setUserStatus(2);
          props.showSpinner(false);
        }
      } catch (e) {
        alert("Transaction failed, try again.");
        props.showSpinner(false);
      }
      props.showSpinner(false);
    }
  };
  let btnClass =
    "font-dosis uppercase font-semibold tracking-widest mt-4 p-4 text-gray-100 text-lg w-full duration-200 hover:ring-2  hover:ring-purple-500 ring-offset-4 ring-offset-purple-100 rounded-full bg-gradient-to-bl from-[#a201ff] to-fuchsia-900 drop-shadow-2xl";

  btnClass =
    props.remainig > 0 ? btnClass + "bg-red-900 cursor-not-allowed" : btnClass;

  const claimBtn = (
    <button disabled={props.remainig > 0} type="submit" className={btnClass}>
      Claim HDT Tokens
    </button>
  );

  const claimedBtn = (
    <button
      disabled={userStatus === 2}
      type="button"
      className="font-dosis	uppercase font-semibold tracking-widest mt-4 p-4 text-gray-100 text-lg w-full duration-200 rounded-full bg-gradient-to-bl from-[#6d5d76] to-[#874da8] drop-shadow-2xl"
    >
      Claimed Before
    </button>
  );

  return (
    <section className="mx-auto mt-4 pb-4 bg-white rounded-4xl z-10 relative  shadow-2xl  w-11/12 sm:w-10/12 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 ">
      <div className="flex items-center justify-between  text-gray-400 text-sm rounded-xl mx-auto px-4 py-4">
        <div className="bg-gray-200 rounded-2xl w-fit px-1.5 py-4">
          <span
            className="text-center text-sm px-4 py-3 cursor-pointer rounded-xl  bg-gray-200"
            onClick={props.toggleFormState}
          >
            Deposit
          </span>
          <span className="text-center text-sm px-4 py-3 cursor-pointer rounded-xl bg-brand-color text-gray-100">
            &nbsp;&nbsp;Claim&nbsp;&nbsp;
          </span>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmitDeposit}>
        <div className="py-4 px-4 text-gray-500 mx-auto text-xs">
          <span className="block text-sm pl-2 font-light">Deposited</span>
          <div className="px-2 py-2 bg-white my-2 border rounded-2xl focus-within:border-brand-color ">
            <div className="flex items-center justify-between">
              <img
                src={daiLogo}
                alt=""
                className="rounded-full w-12 ml-2 py-2"
              />

              <div className="text-2xl pr-4">{amountDeposited}</div>
            </div>
          </div>
        </div>

        <span className="flex items-center justify-center text-gray-400 animate-bounce mt-2">
          <i className="fa-solid fa-down-long fa-2x"></i>
          <i className="fa-solid fa-up-long fa-2x"></i>
        </span>
        <div className="pb-4 px-4 text-gray-500 mx-auto text-xs">
          <span className="block text-sm pl-2 font-light">Receive</span>
          <div className="px-2 py-2 bg-white mt-2 border rounded-2xl focus-within:border-brand-color ">
            <div className="flex items-center justify-between">
              <img
                src={hdtLogo}
                alt=""
                className="rounded-full w-12 ml-2 py-2"
              />

              <div className="text-2xl pr-4">
                {splitNumber(boughtAmount + rewardAmount)}
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 px-4 mx-4 text-gray-500 mt-4 text-xs bg-gray-200 rounded-4xl">
          <span className="block text-sm pl-2 font-light">
            HDT Pool Balance
          </span>
          <div className="flex mt-2 items-center bg-white justify-between border rounded-2xl p-2 ">
            {/* <div className="text-right text-2xl mr-2 block bg-white w-full rounded-2xl py-2 pl-8  text-gray-900 focus:outline-none">
              <span className="text-gray-400 block" id="inputReceive">
                0.0
              </span>
            </div> */}
            <div className=" w-full ">
              <div className="flex justify-between items-center ">
                <span className="text-xs text-brand-color ">
                  {splitNumber(currentAssetBalance)}&nbsp;$HDT
                </span>
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
          {userStatus === 1 ? claimBtn : claimedBtn}
        </div>
      </form>
    </section>
  );
}
