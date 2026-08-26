import { listImages } from "../../image-utils";
import { ProductDetailPage } from "../../site";

export default function TreeBand() {
  return <ProductDetailPage type="tree-band" images={listImages("images/products/cotton-band")} />;
}
