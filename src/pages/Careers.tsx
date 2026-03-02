import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCareerRoles, getCareersPage } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { getJotformUrl } from "@/lib/jotform";
import { JotformEmbed } from "@/components/JotformEmbed";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Careers = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const { data: careersPageData } = useQuery({
    queryKey: ["careersPage"],
    queryFn: getCareersPage,
  });
  const { data: roles = [] } = useQuery({
    queryKey: ["careerRoles"],
    queryFn: getCareerRoles,
  });

  const role = selectedRole ? roles.find((r) => r._id === selectedRole) : null;
  const pageTitle = careersPageData?.title ?? "Career & Volunteer Opportunities";
  const pageSubtitle = careersPageData?.subtitle ?? "Join our team and make a meaningful impact in the community through Qur'anic education.";
  const hasForm = role ? !!getJotformUrl(role.jotformLink) : false;

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

        {!selectedRole ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {roles.map((r, i) => {
              const Icon = getIcon(r.icon);
              return (
                <motion.div key={r._id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:-translate-y-1" onClick={() => setSelectedRole(r._id)}>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${r.type === "Volunteer" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"}`}>{r.type}</span>
                        {r.location && <span className="text-xs text-muted-foreground">{r.location}</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                      <Button variant="link" className="p-0 h-auto text-primary font-medium">
                        View Details <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
            <button onClick={() => setSelectedRole(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <X className="h-4 w-4" /> Back to all positions
            </button>
            {role && (
              <>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${role.type === "Volunteer" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"}`}>{role.type}</span>
                <h2 className="text-3xl font-bold text-foreground mt-3 mb-2">{role.title}</h2>
                <p className="text-muted-foreground mb-6">{role.description}</p>

                {role.requirements && role.requirements.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Requirements</h3>
                    <ul className="space-y-2 mb-10">
                      {role.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Apply form – inline in page layout */}
                <section className="mt-10">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Apply for this Position</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit your application via the form below.
                  </p>
                  <JotformEmbed
                    formUrlOrId={role.jotformLink}
                    minHeight={720}
                    title={`Apply: ${role.title}`}
                    emptyMessage="No application form is configured for this role."
                    borderless
                  />
                </section>
              </>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Careers;
