import { listImages } from "../../image-utils";
import { ProductDetailPage } from "../../site";

export default function HouseBand() {
  return <ProductDetailPage type="house-band" images={listImages("images/products/house-band")} />;
}
