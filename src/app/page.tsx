import AppBanner from "@/components/layout/app_banner";
import AppHeader from "@/components/layout/app_header";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <AppHeader />
      <AppBanner />
    </div>
  );
}
