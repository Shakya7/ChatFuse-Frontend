import {BrowserRouter, Routes, Route} from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import MainLayout from "./components/MainLayout";
import HomeScreenWindow from "./components/HomeScreenWindow";

const COLOR_CODES={
  navbar: "#16141b //  [main] #18141b",

  chat_info: "#1d1a24 // #261f2d",

  chatlist: "#29252e",
  chatlist_icons: "#524954",
  chatlist_search: "#1d1923",
  chatlist_text: "#b59dac",

  icon_hover_selected: "#81a5c2 (blue)"

}

function App() {
  //const [screenWidth,setScreenWidth]=useState(window.innerWidth);

  // useEffect(()=>{
  //   function handleResize() {
  //     setScreenWidth(window.innerWidth);
  //   }
  //   console.log(screenWidth);
  //   window.addEventListener('resize', handleResize);

  // },[screenWidth])

  /*
   return (
    <BrowserRouter>
      <Screen_Size.Provider value={screenWidth}>
        <div style={{width:"100vw"}}>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route path="/chat/:id" element={<ChatWindow/>}/>
            </Route>
            <Route path="/mobile" element={<ChatList/>}>
              <Route path="/chat/:id" element={<ChatWindow/>}/>
            </Route>
          </Routes>
        </div>
      </Screen_Size.Provider>
    </BrowserRouter>
  );
  */
  
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<HomeScreenWindow/>}/>
              <Route path="/chat/:id" element={<ChatWindow/>}/>
            </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
