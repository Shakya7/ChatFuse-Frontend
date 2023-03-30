import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPhone,
  faSearch,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChatWindowHeader() {
  const theme = useSelector((state) => state.settings.darkMode);
  const navigate = useNavigate();

  return (
    <header className="h-16 flex items-center backdrop-blur-lg w-full fixed px-4 relative">
      <div className="flex gap-3 items-center">
        <FontAwesomeIcon
          className={`${
            theme ? "text-stone-300" : "text-stone-800"
          } cursor-pointer`}
          onClick={() => {
            if(window.location.pathname.includes("chat"))
                navigate("/");
            else if(window.location.pathname.includes("channel"))
                navigate("/channel");
        }}
          icon={faArrowLeft}
        />
        <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] bg-red-300 rounded-full" />
        <div className={`${theme ? "text-stone-300" : "text-stone-800"}`}>
          <p>Team name</p>
          <p>24 Members</p>
        </div>
      </div>
      <div
        className={`flex gap-3 absolute right-5 ${
          theme ? "text-stone-400" : "text-stone-600"
        }`}
      >
        <FontAwesomeIcon icon={faPhone} />
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    </header>
  );
}

export default ChatWindowHeader;
