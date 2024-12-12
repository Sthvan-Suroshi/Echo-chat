import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/base/Navbar";
import HeroSection from "@/components/base/HeroSection";
import FeatureSection from "@/components/base/FeatureSection";
import DashboardPreview from "@/components/base/DashboardPreview";
import Footer from "@/components/base/FooterCard";

export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1b4b] via-[#272b91] to-[#9747FF]">
      <div className="relative">
        <Navbar user={session?.user} />
        <main>
          <HeroSection />
          <DashboardPreview />
          <FeatureSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
