import { listImages } from "../../image-utils";
import { ProductDetailPage } from "../../site";

export default function CargoTensionBar() {
  return <ProductDetailPage type="cargo-tension-bar" images={listImages("images/products/elastic-band")} />;
}
