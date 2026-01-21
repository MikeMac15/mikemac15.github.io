// app/page.tsx
import RootLayout from "./layout";
import Home from "./mainPage";

export default function Page() {
  return <RootLayout children={<Home />} />;
}
