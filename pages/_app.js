import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default store.withRedux(MyApp);
