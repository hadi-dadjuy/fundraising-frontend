import Navbar from "./components/Navbar";
import Main from "./components/Main";
import HParticles from "./components/HParticles";
import Timer from "./components/Timer";
import { useMetaMask } from "metamask-react";
import { getSaleRemainingTime } from "./blockchain/Vault";
import { useEffect, useState } from "react";
import { vaultAddress } from "./blockchain/addresses";

export default function App() {
  const [period, setPeriod] = useState(0);

  useEffect(() => {
    getSaleRemainingTime(vaultAddress).then((value) => {
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
      <Navbar />
      <Main />
      <Timer startDate={new Date().getTime() + period * 1000} />
      <div className="absolute w-full h-full">
        <HParticles />
      </div>
    </div>
  );
}
