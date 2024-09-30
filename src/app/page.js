"use client"
import { Provider } from "react-redux";
import {store} from "./store/store"
import Final from "./component/Final";
export default function Home() {
  return (
    <Provider store={store}>

   <div>
<Final />
   </div>
    </Provider>
  );
}
