import { findImage, listImages } from "./image-utils";
import { HomePage } from "./site";

const PRODUCT_CATEGORIES = ["palm-mat", "cargo-tension-bar", "tree-band", "tree-tie", "house-band"];

export default function Home() {
  const categoryImages = Object.fromEntries(
    PRODUCT_CATEGORIES.map(slug => [slug, findImage("images/products", slug)])
  );
  return <HomePage slides={listImages("images/hero-slides")} categoryImages={categoryImages} />;
}
