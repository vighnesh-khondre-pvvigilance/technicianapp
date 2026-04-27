// app/(public)/home.tsx

import MainOnboarding from "../../src/components/public/MainOnboarding";
import Screen from "../../src/components/Screen";

export default function Home() {
  return (
    <Screen>
      <MainOnboarding />
    </Screen>
  );
}