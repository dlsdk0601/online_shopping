import "../styles/flex-slider.css";
import "../styles/font-awesome.css";
import "../styles/lightbox.css";
import "../styles/owl-carousel.css";
import "../styles/templatemo-hexashop.css";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps, AppType } from "next/app";
import { App } from "../layout/App";

const NextApp: AppType = (props: AppProps) => {
  return <App {...props} />;
};

// SSR 은 일단 비활성화한다. 필요에 따라서 활성화시킨다.
// noinspection JSUnusedGlobalSymbols
export default dynamic(() => Promise.resolve(NextApp), { ssr: false });
