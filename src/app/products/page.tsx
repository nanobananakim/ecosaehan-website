import { findImage } from "../image-utils";
import { ProductsPage } from "../site";

const PRODUCT_CATEGORIES = ["palm-mat", "cargo-tension-bar", "tree-band", "tree-tie", "house-band"];

export default function Products() {
  const categoryImages = Object.fromEntries(
    PRODUCT_CATEGORIES.map(slug => [slug, findImage("images/products", slug)])
  );
  return <ProductsPage categoryImages={categoryImages} />;
}
