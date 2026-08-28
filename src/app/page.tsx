import { listImages } from "./image-utils";
import { HomePage } from "./site";

export default function Home() {
  return <HomePage slides={listImages("images/hero-slides")} />;
}
