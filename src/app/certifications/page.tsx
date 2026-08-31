import { listImagesByNumberDesc } from "../image-utils";
import { CertificationsPage } from "../site";

export default function Certifications() {
  return <CertificationsPage images={listImagesByNumberDesc("images/certifications")} />;
}
