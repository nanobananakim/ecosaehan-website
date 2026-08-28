import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "에코새한 | 사람이 걷는 길부터, 나무가 뿌리내리는 곳까지",
  description: "친환경 천연섬유 보행매트로 공공기관에 신뢰할 수 있는 자재를 공급합니다.",
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
