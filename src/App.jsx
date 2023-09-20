import { useState, useEffect } from "react";
import Divider from "./assets/pattern-divider-desktop.svg";
import DividerMobile from "./assets/pattern-divider-mobile.svg";
import Dice from "./assets/icon-dice.svg";

const App = () => {
  const [data, setData] = useState("");
  const [id, setId] = useState("");

  //fetches advice from api on mount using random numbers generated as ids
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 224).toString();
    setId(randomId);
    getAdvice(randomId);
  }, []);

  //Receives data from api endpoint and picks out the advice
  const getAdvice = async (id) => {
    try {
      const response = await fetch(`https://api.adviceslip.com/advice/${id}`);

      if (!response.ok) {
        throw new Error("Network was not ok");
      }
      const data = await response.json();
      setData(data.slip.advice);
     
    } catch (err) {
      console.error("Error fetching advice:", err);
    }
  };

  const handleButtonClick = () => {
    const randomId = Math.floor(Math.random() * 224).toString();
    setId(randomId);
    getAdvice(randomId);
  };

  
  return (
    <main className="relative flex flex-col justify-center items-center gap-6 p-6 lg:px-12 min-w-[320px] w-[70%] max-w-[35rem] h-[fit-content]  text-white bg-grayishBlue/50 rounded-2xl">
      <div className="text-[0.75rem] text-neonGreen uppercase tracking-[.3em] p-4">
        <h3>Advice #{id}</h3>
      </div>
      <div className="font-bold p-2 text-center text-[22px] md:text-[28px]">
        <p className="w-[fit-content]">&#8220;{data}&#8220;</p>
      </div>
      <div></div>
      <div className="p-8">
        <img
          className="block max-w-full md:hidden"
          src={DividerMobile}
          alt="divider"
        />
        <img
          className="hidden max-w-full md:block"
          src={Divider}
          alt="divider"
        />
      </div>
      <div
        className="absolute bottom-[-1.5rem] grid place-items-center aspect-square rounded-[50%] h-auto p-4 bg-neonGreen hover:drop-shadow-[-1px_1px_12px_hsl(150,100%,66%)] hover:drop-shadow-neonGreen"
        onClick={handleButtonClick}
      >
        <a href="#" className="w-full">
          <img className="block max-w-full" src={Dice} alt="Dice" />
        </a>
      </div>
    </main>
  );
};

export default App;
