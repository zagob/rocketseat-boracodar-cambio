import "@/styles/globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
