import { listImages } from "../../image-utils";
import { ProductDetailPage } from "../../site";

export default function PalmMat() {
  return <ProductDetailPage type="palm-mat" images={listImages("images/products/coir-mat")} />;
}
