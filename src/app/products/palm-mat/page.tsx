import { listImages } from "../../image-utils";
import { PalmMatPage } from "../../site";

export default function PalmMat() {
  return <PalmMatPage images={listImages("images/products/coir-mat")} />;
}
