import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getProgramBySlug } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { getJotformUrl } from "@/lib/jotform";
import { JotformEmbed } from "@/components/JotformEmbed";

const ProgramDetail = () => {
  const { programSlug } = useParams();
  const [formOpen, setFormOpen] = useState(false);
  const { data: program, isLoading } = useQuery({
    queryKey: ["program", programSlug],
    queryFn: () => getProgramBySlug(programSlug ?? ""),
    enabled: !!programSlug,
  });

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Program not found</h1>
        <Link to="/programs"><Button>Back to Programs</Button></Link>
      </div>
    );
  }

  const categoryTitle = program.category?.title ?? "";
  const imageUrl = program.mainImage?.asset?.url
    ? urlFor(program.mainImage).width(1200).height(600).fit("max").url()
    : null;

  const quickInfoItems = [
    { icon: Users, label: "Audience", value: program.audience },
    { icon: DollarSign, label: "Fees", value: program.fees },
  ].filter((info) => info.value);

  const jotformUrlOrId = program.jotformUrl ?? program.jotformId;
  const hasForm = !!getJotformUrl(jotformUrlOrId);

  return (
    <main className="py-12 md:py-20">
      <div className="container max-w-4xl">
        <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Programs
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">{categoryTitle}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">{program.title}</h1>
          <div className="geometric-divider w-16 mb-8" />

          {imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-8 aspect-[2/1]">
              <img src={imageUrl} alt={program.title} className="w-full h-full object-cover" />
            </div>
          )}

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{program.overview}</p>

          {quickInfoItems.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {quickInfoItems.map((info) => (
                <Card key={info.label} className="border-border/50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <info.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-medium text-foreground">{info.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {program.scheduleContent && Array.isArray(program.scheduleContent) && program.scheduleContent.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Schedule</h2>
              <div className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-headings:font-semibold">
                <PortableText value={program.scheduleContent} />
              </div>
            </section>
          )}

          {program.curriculum && program.curriculum.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Curriculum</h2>
              <ul className="space-y-2">
                {program.curriculum.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold shrink-0 mt-0.5">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {program.faqs && program.faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {program.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* Registration form – inline, expand/collapse */}
          {hasForm ? (
            <section className="mt-12">
              <Collapsible open={formOpen} onOpenChange={setFormOpen}>
                <Card className="border-primary/20 bg-primary/5">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-6 text-left flex items-center justify-between gap-4 rounded-lg hover:bg-primary/10 transition-colors">
                      <div>
                        <h2 className="text-xl font-bold text-foreground">Ready to Enroll?</h2>
                        <p className="text-sm text-muted-foreground mt-1">Complete the registration form to secure your spot.</p>
                      </div>
                      {formOpen ? <ChevronUp className="h-5 w-5 shrink-0" /> : <ChevronDown className="h-5 w-5 shrink-0" />}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <JotformEmbed
                        formUrlOrId={jotformUrlOrId}
                        minHeight={480}
                        title={`Register: ${program.title}`}
                        emptyMessage="No registration form is configured."
                      />
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </section>
          ) : (
            <Card className="mt-12 border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No registration form is configured for this program.</p>
                <Button asChild className="rounded-full font-semibold">
                  <Link to="/contact">Contact Us to Enroll</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default ProgramDetail;
