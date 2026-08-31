import { listDocuments } from "../../document-utils";
import { SupportMaterialsPage } from "../../site";

export default function SupportMaterials() {
  return <SupportMaterialsPage files={listDocuments("documents")} />;
}
