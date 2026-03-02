import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getContactPage } from "@/lib/sanityQueries";
import { JotformEmbed } from "@/components/JotformEmbed";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconByType: Record<string, typeof MapPin> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

const defaultContactInfo = [
  { type: "address", title: "Address", content: "700 Nipissing Rd Unit 8\nMilton, ON L9T 4Z9" },
  { type: "phone", title: "Phone", content: "(905) 555-0123" },
  { type: "email", title: "Email", content: "info@miltonquran.org" },
  { type: "hours", title: "Office Hours", content: "Monday – Friday: 9:00 AM – 5:00 PM\nSaturday: 9:00 AM – 1:00 PM\nSunday: Closed" },
];

const Contact = () => {
  const { data: contactPageData } = useQuery({
    queryKey: ["contactPage"],
    queryFn: getContactPage,
  });

  const pageTitle = contactPageData?.title ?? "Contact Us";
  const pageSubtitle = contactPageData?.subtitle ?? "We'd love to hear from you. Reach out with questions about our programs or to schedule a visit.";
  const formTitle = contactPageData?.formTitle ?? "Send us a Message";
  const jotformUrl = contactPageData?.jotformUrl;
  const contactInfo = (contactPageData?.contactInfo?.length ? contactPageData.contactInfo : defaultContactInfo) as Array<{ type: string; title?: string; content?: string }>;

  return (
    <main className="py-16 md:py-24">
      <div className="container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{pageTitle}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {pageSubtitle}
          </p>
        </motion.div>

        {/* Full-width form at top */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">{formTitle}</h2>
          <JotformEmbed
            formUrlOrId={jotformUrl}
            minHeight={720}
            title="Contact form"
            emptyMessage="No contact form is configured. Add a Jotform URL in Sanity (Contact Page)."
            borderless
          />
        </motion.section>

        {/* Contact Info cards below */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: 0.15 } } }}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
        >
          {contactInfo.map((item) => {
            const Icon = iconByType[item.type] ?? MapPin;
            return (
              <div key={item.type} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{item.title ?? item.type}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{item.content}</p>
                </div>
              </div>
            );
          })}
        </motion.section>
      </div>
    </main>
  );
};

export default Contact;
