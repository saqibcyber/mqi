import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getDonatePage } from "@/lib/sanityQueries";
import { JotformEmbed } from "@/components/JotformEmbed";

const defaultTrustBullets = [
  { title: "Tax Deductible", desc: "All donations are eligible for tax receipts." },
  { title: "100% Transparent", desc: "Funds go directly to programs and operations." },
  { title: "Secure Processing", desc: "Your information is encrypted and protected." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Donate = () => {
  const [activeForm, setActiveForm] = useState<"donate" | "sponsor">("donate");
  const { data: donatePageData } = useQuery({
    queryKey: ["donatePage"],
    queryFn: getDonatePage,
  });

  const pageTitle = donatePageData?.title ?? "Support Our Mission";
  const pageSubtitle = donatePageData?.subtitle ?? "Your generous contribution helps us provide quality Qur'anic education and maintain our programs for the community.";
  const trustBullets = (donatePageData?.trustBullets?.length ? donatePageData.trustBullets : defaultTrustBullets) as Array<{ title?: string; desc?: string }>;
  const donateFormTitle = donatePageData?.donateFormTitle ?? "Make a Donation";
  const sponsorFormTitle = donatePageData?.sponsorFormTitle ?? "Sponsor a Student";
  const hasDonateForm = !!donatePageData?.jotformDonateUrl;
  const hasSponsorForm = !!donatePageData?.jotformSponsorStudentUrl;

  return (
    <main className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{pageTitle}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {pageSubtitle}
          </p>
        </motion.div>

        {/* Trust section */}
        {trustBullets.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {trustBullets.map((item) => (
              <div key={item.title} className="text-center p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Donation forms – toggle between one-time and sponsor */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          {(hasDonateForm || hasSponsorForm) && (
            <div className="inline-flex rounded-full bg-muted p-1 mb-8">
              <button
                type="button"
                onClick={() => setActiveForm("donate")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeForm === "donate"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                One-time Donation
              </button>
              <button
                type="button"
                onClick={() => setActiveForm("sponsor")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeForm === "sponsor"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sponsor a Student
              </button>
            </div>
          )}

          {activeForm === "donate" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{donateFormTitle}</h2>
              <JotformEmbed
                formUrlOrId={donatePageData?.jotformDonateUrl}
                minHeight={900}
                title="General donations"
                emptyMessage="Add a Jotform URL in Sanity (Donate Page → General Donations Jotform URL)."
                borderless
              />
            </div>
          )}

          {activeForm === "sponsor" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{sponsorFormTitle}</h2>
              <JotformEmbed
                formUrlOrId={donatePageData?.jotformSponsorStudentUrl}
                minHeight={900}
                title="Sponsor a student"
                emptyMessage="Add a Jotform URL in Sanity (Donate Page → Sponsor a Student Jotform URL)."
                borderless
              />
            </div>
          )}

          {donatePageData?.additionalContent && donatePageData.additionalContent.length > 0 && (
            <div className="mt-12 prose prose-lg max-w-none prose-p:text-muted-foreground">
              <PortableText value={donatePageData.additionalContent} />
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
};

export default Donate;
