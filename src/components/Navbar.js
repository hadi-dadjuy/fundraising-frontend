import { useMetaMask } from "metamask-react";
// import logo from "../logo.webp";

const Navbar = (props) => {
  const { account, connect } = useMetaMask();
  const activeLinkStyle = " font-black border-b-4 border-b-white text-white";
  let rightButton = (
    <button
      onClick={connect}
      type="button"
      className="block bg-gray-300 hover:bg-brand-color hover:text-gray-100 text-gray-700 shadow-md ring-2  
      ring-purple-500 ring-offset-4 ring-offset-purple-100 duration-200 rounded-full text-xl   px-4 py-2 relative z-40"
    >
      <i className="fa-solid fa-wallet"></i>
      &nbsp;&nbsp;
      <span className="font-dosis  font-semibold tracking-wide">
        Connect Wallet
      </span>
    </button>
  );
  if (account != null) {
    rightButton = (
      <div>
        <span className="text-lg md:text-2xl align-baseline text-gray-200 relative z-40  ">
          {account.substring(0, 7)}...
          {account.substring(account.length - 7, account.length)}
        </span>
        &nbsp;&nbsp;
        <a href="#" className="text-black reounded-full relative z-40">
          <i className="fa-solid fa-arrow-right-from-bracket text-lg md:text-2xl cursor-pointer"></i>
        </a>
      </div>
    );
  }

  return (
    <header className="flex flex-wrap items-center justify-between  p-4">
      {/* <div>
        <a href="#">
          <img className="h-10" src={logo} alt="Website's Logo" />
        </a>
      </div> */}
      <div className="flex gap-x-1 relative z-40 mt-2">
        <div
          className={
            "font-dosis font-semibold tracking-wide text-lg md:text-2xl px-4 hover:text-white text-gray-300 duration-200 " +
            activeLinkStyle
          }
        >
          <a href="#">IBCO</a>
        </div>
        <div
          className="font-dosis font-semibold tracking-wide text-lg md:text-2xl sm:text-xl px-4 hover:text-white
        text-gray-300 duration-200"
        >
          <a href="#">Faucet</a>
        </div>
        <div
          className="font-dosis font-semibold tracking-wide text-lg md:text-2xl sm:text-xl px-4
         hover:text-white text-gray-300 duration-200 "
        >
          <a href="#">Stake</a>
        </div>
      </div>
      <div>{rightButton}</div>
    </header>
  );
};
export default Navbar;
