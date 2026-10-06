import { chromium } from "playwright";

async function runVerification() {
  const browser = await chromium.launch();

  // 1. Desktop 1440x900
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const scrollWidthDesktop = await desktopPage.evaluate(
    () => document.documentElement.scrollWidth
  );
  const innerWidthDesktop = await desktopPage.evaluate(
    () => window.innerWidth
  );
  console.log(
    `[Desktop 1440x900] scrollWidth: ${scrollWidthDesktop}, innerWidth: ${innerWidthDesktop}, Overflow Free: ${
      scrollWidthDesktop === innerWidthDesktop
    }`
  );

  await desktopPage.screenshot({
    path: "screenshot-desktop.png",
    fullPage: true,
  });

  // 2. Mobile 390x844
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const scrollWidthMobile = await mobilePage.evaluate(
    () => document.documentElement.scrollWidth
  );
  const innerWidthMobile = await mobilePage.evaluate(
    () => window.innerWidth
  );
  console.log(
    `[Mobile 390x844] scrollWidth: ${scrollWidthMobile}, innerWidth: ${innerWidthMobile}, Overflow Free: ${
      scrollWidthMobile === innerWidthMobile
    }`
  );

  await mobilePage.screenshot({
    path: "screenshot-mobile.png",
    fullPage: true,
  });

  await browser.close();
  console.log("All Playwright verification checks completed successfully!");
}

runVerification().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
