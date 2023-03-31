import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ServerSection from "./ServerSection";
import { useSelector } from 'react-redux';
import Server from "./Server";

function ServerLayout() {
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
    <div className="basis-5/6 h-full flex bg-[#29252e] overflow-hidden">
      <div className={`basis-1/5 flex flex-col gap-3 py-2 items-center scrollbar-none overflow-y-auto ${theme?"bg-[#1E1E22]}":"bg-[#E3E4E8]"}`}>
        <Server/>
        <Server/>
        <Server/>
        <Server/>
        <Server/>
        <Server/>
        <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] flex justify-center items-center rounded-[4rem] bg-[#313238] cursor-pointer duration-500 hover:rounded-lg">
          <FontAwesomeIcon className="text-2xl text-stone-500" icon={faPlus} />
        </div>
      </div>
      <ServerSection/>
    </div>
  );
}

export default ServerLayout;
