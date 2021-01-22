import "../styles/globals.css";
import "react-dropdown/style.css";
import "flag-icon-css/css/flag-icon.css";
import "react-phone-number-input/style.css";
import "react-phone-input-2/lib/style.css";
import App from "next/app";
import { appWithTranslation } from "../i18n";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
