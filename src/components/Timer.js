import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.countDownId = null;
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
    };
  }

  componentDidMount() {
    this.countDownId = setInterval(this.timerInit, 1000);
  }

  componentWillUnmount() {
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }
  }

  timerInit = () => {
    const startDate = parseInt(this.props.startDate);

    const now = new Date().getTime();
    if (!startDate) {
      this.setState({ expired: true });
      return;
    }

    const countDownStartDate = new Date(startDate).getTime();
    const distance = countDownStartDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // For countdown is finished
    if (distance < 0) {
      clearInterval(this.countDownId);
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      });
      return;
    }
    this.setState({ days, hours, minutes, seconds, expired: false });
  };

  render() {
    const { days, hours, minutes, seconds, expired } = this.state;

    return (
      <>
        <div className="flex flex-wrap   my-10 mx-auto z-30 relative gap-4 rounded-3xl   w-11/12 sm:w-10/12 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4">
          <div className="text-2xl col-span-4 font-extrabold tracking-widest	uppercase text-gray-100 w-full text-center font-dosis font-extrabold ">
            Sale ends in
          </div>

          <div className=" flex-1  mb-2 rounded-3xl p-2    bg-gradient-to-bl from-[#a201ff] to-fuchsia-900 drop-shadow-2xl">
            <div className=" text-white text-center  p-1 text-lg font-dosis font-extrabold">
              Days
            </div>
            <div className="text-gray-100 text-center  px-auto py-4 text-5xl font-bold  font-dosis font-extrabold">
              {days}
            </div>
          </div>

          <div className=" flex-1  mb-2 rounded-3xl p-2  bg-gradient-to-bl from-[#a201ff] to-fuchsia-900  drop-shadow-2xl">
            <div className=" text-white text-center p-1 text-lg font-dosis font-extrabold">
              Hours
            </div>
            <div className="text-gray-100 text-center  px-auto py-4 text-5xl font-bold  font-dosis font-extrabold  ">
              {hours}
            </div>
          </div>

          <div className="flex-1   mb-2 rounded-3xl p-2  bg-gradient-to-bl from-[#a201ff] to-fuchsia-900  drop-shadow-2xl">
            <div className=" text-white text-center p-1 text-lg font-dosis font-extrabold">
              Minutes
            </div>
            <div className="text-gray-100   text-center px-auto py-4 text-5xl font-bold font-dosis font-extrabold">
              {minutes}
            </div>
          </div>

          <div className="w-fill flex-1   mb-2 rounded-3xl p-2   bg-gradient-to-bl from-[#a201ff] to-fuchsia-900  drop-shadow-2xl">
            <div className=" text-white text-center  p-1 text-lg font-dosis font-extrabold">
              Seconds
            </div>
            <div className=" text-gray-100 text-center  px-auto py-4 text-5xl font-bold font-dosis font-extrabold">
              {seconds}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Timer;
