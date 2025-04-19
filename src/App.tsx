import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import routes from "./Routes";

export default function App () {
  return (
    <Routes>
      <Route element={<Layout/>}>
        {
          routes.map(({path, element}, i) => (
            <Route key={i} path={path} element={element}/>
          ))
        }
      </Route>
    </Routes>
  )
}