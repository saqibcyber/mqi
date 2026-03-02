import { motion } from "framer-motion";
import { Heart } from "lucide-react";
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
  const { data: donatePageData } = useQuery({
    queryKey: ["donatePage"],
    queryFn: getDonatePage,
  });

  const pageTitle = donatePageData?.title ?? "Support Our Mission";
  const pageSubtitle = donatePageData?.subtitle ?? "Your generous contribution helps us provide quality Qur'anic education and maintain our programs for the community.";
  const trustBullets = (donatePageData?.trustBullets?.length ? donatePageData.trustBullets : defaultTrustBullets) as Array<{ title?: string; desc?: string }>;
  const donateFormTitle = donatePageData?.donateFormTitle ?? "Make a Donation";
  const sponsorFormTitle = donatePageData?.sponsorFormTitle ?? "Sponsor a Student";

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

        {/* General Donations – always visible */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">{donateFormTitle}</h2>
          <JotformEmbed
            formUrlOrId={donatePageData?.jotformDonateUrl}
            minHeight={520}
            title="General donations"
            emptyMessage="Add a Jotform URL in Sanity (Donate Page → General Donations Jotform URL)."
          />
        </motion.section>

        {/* Sponsor a Student – always visible */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl font-bold text-foreground mb-4">{sponsorFormTitle}</h2>
          <JotformEmbed
            formUrlOrId={donatePageData?.jotformSponsorStudentUrl}
            minHeight={520}
            title="Sponsor a student"
            emptyMessage="Add a Jotform URL in Sanity (Donate Page → Sponsor a Student Jotform URL)."
          />
        </motion.section>
      </div>
    </main>
  );
};

export default Donate;
