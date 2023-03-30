import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ServerSection from "./ServerSection";
import { useSelector } from 'react-redux';

function ServerLayout() {
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
    <div className="basis-full sm:basis-[29.5%] flex bg-[#29252e] overflow-hidden">
      <div className={`basis-1/5 flex flex-col gap-3 py-2 items-center scrollbar-none overflow-y-auto ${theme?"bg-[#1E1E22]}":"bg-[#E3E4E8]"}`}>
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] rounded-[4rem] bg-red-300 cursor-pointer duration-500 hover:rounded-lg" />
        <div className="w-14 min-w-[3.5rem] h-14 min-h-[3.5rem] flex justify-center items-center rounded-[4rem] bg-[#313238] cursor-pointer duration-500 hover:rounded-lg">
          <FontAwesomeIcon className="text-2xl text-stone-500" icon={faPlus} />
        </div>
      </div>
      <ServerSection/>
    </div>
  );
}

export default ServerLayout;
