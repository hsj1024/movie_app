import { Route, Routes } from "react-router-dom";
import Search from "./Search";
import Detail from "./Detail";
import Youtube from "./Youtube";

function App() {
  // router
  // / -> 검색페이지
  // /detail/{id} -> 상세페이지
  // /youtube/{id} -> 유튜브 영상 페이지

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/youtube/:id" element={<Youtube />} />
    </Routes>
  );
}

export default App;
