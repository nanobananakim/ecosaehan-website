import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "에코새한 | 사람이 걷는 길부터, 나무가 뿌리내리는 곳까지",
  description: "사람이 걷는 길엔 친환경 야자매트, 나무가 뿌리내리는 곳엔 흙이 되어 돌아가는 수목천연밴드. 자연을 생각하는 에코새한의 친환경 자재입니다.",
  icons: {
    icon: "/favicon.ico"
  },
  verification: {
    other: {
      "naver-site-verification": "982105dca0e01bb05074c5718dc5a4c63bb88203"
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
