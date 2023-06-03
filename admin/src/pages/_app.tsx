// import "../styles/tailwind.css";
import "../styles/global.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dynamic from "next/dynamic";
import type { AppProps, AppType } from "next/app";
import { App } from "../layout/App";

const NextApp: AppType = (props: AppProps) => <App {...props} />;

// SSR 은 일단 비활성화한다. 필요에 따라서 활성화시킨다.
const DynamicApp = dynamic(Promise.resolve(NextApp), { ssr: false });
// noinspection JSUnusedGlobalSymbols
export default DynamicApp;
