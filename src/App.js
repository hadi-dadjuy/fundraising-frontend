import Navbar from "./components/Navbar";
import Deposit from "./components/Deposit";
import Claim from "./components/Claim";

import HParticles from "./components/HParticles";
import Timer from "./components/Timer";
import { useMetaMask } from "metamask-react";
import { getSaleRemainingTime } from "./blockchain/TokenPool";
import { useEffect, useState } from "react";
import { tokenPoolAddress } from "./blockchain/Addresses";
import { Spinner } from "./components/Spinner";

export default function App() {
  const [period, setPeriod] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [isDeposit, setIsDeposit] = useState(true);
  const setSpinnerState = (value) => {
    setSpinner(value);
  };

  const setFormState = () => {
    setIsDeposit(!isDeposit);
  };

  useEffect(() => {
    getSaleRemainingTime(tokenPoolAddress).then((value) => {
      console.log(value);
      setPeriod(value);
      // setBalance(value);
      // expected output: "Success!"
    }); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [period]);

  const { status } = useMetaMask();
  if (status === "initializing")
    console.log("Synchronisation with MetaMask ongoing...");

  return (
    <div
      className="container-full mx-auto bg-gray-300 min-h-screen relative overflow-hidden 
    bg-gradient-to-tr from-[#9A28DC] to-fuchsia-700 "
    >
      <Spinner status={spinner} />
      <Navbar />
      {isDeposit === true ? (
        <Deposit showSpinner={setSpinnerState} toggleFormState={setFormState} />
      ) : (
        <Claim
          showSpinner={setSpinnerState}
          toggleFormState={setFormState}
          remainig={period}
        />
      )}

      <Timer startDate={new Date().getTime() + period * 1000} />
      <div className="absolute w-full h-full">
        <HParticles />
      </div>
    </div>
  );
}
