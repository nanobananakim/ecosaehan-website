import { listImages } from "../../image-utils";
import { ProductDetailPage } from "../../site";

export default function TreeTie() {
  return <ProductDetailPage type="tree-tie" images={listImages("images/products/support-band")} />;
}
