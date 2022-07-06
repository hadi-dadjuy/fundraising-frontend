import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Timer from "./components/Timer";
import { useMetaMask } from "metamask-react";
import { getTimer } from "./blockchain/Vault";
import { useEffect, useState } from "react";

export default function App() {
  const [period, setPeriod] = useState(0);
  const addresses = {
    dai: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
    reward: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
    vault: "0x9A676e781A523b5d0C0e43731313A708CB607508",
  };

  useEffect(() => {
    getTimer(addresses.vault).then((value) => {
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

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

  return (
    <div
      className="container-full mx-auto bg-gray-300 min-h-screen relative overflow-hidden 
    bg-gradient-to-tr from-[#9A28DC] to-fuchsia-700 "
    >
      <Navbar />
      <Main addresses={addresses} />
      <Timer startDate={new Date().getTime() + period * 1000} />
      <div className="absolute w-full h-full">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#ffffff",
                },
                polygon: {
                  nb_sides: 5,
                },
              },
              opacity: {
                value: 0.1,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.1,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab",
                },
              },
              modes: {
                grab: {
                  distance: 140,
                  line_linked: {
                    opacity: 0.9,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            retina_detect: true,
          }}
        />
      </div>
    </div>
  );
}
