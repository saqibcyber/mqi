import { useRef } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { getAboutPage, type AboutTeacher, type AboutGraduate } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const scrollByAmount = 320;

const About = () => {
  const { data: aboutPage } = useQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPage,
  });

  const teachersRef = useRef<HTMLDivElement | null>(null);
  const graduatesRef = useRef<HTMLDivElement | null>(null);

  const pageTitle = aboutPage?.title ?? "About Us";
  const pageSubtitle = aboutPage?.subtitle;
  const instituteText = aboutPage?.instituteText ?? "";

  const heroImageUrl =
    aboutPage?.heroImage?.asset?.url && urlFor(aboutPage.heroImage).width(1200).height(800).fit("max").url();

  const teachers = (aboutPage?.teachers ?? []) as AboutTeacher[];
  const graduates = (aboutPage?.graduates ?? []) as AboutGraduate[];

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const delta = direction === "left" ? -scrollByAmount : scrollByAmount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <main className="py-16 md:py-24">
      <div className="container max-w-6xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{pageTitle}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          {pageSubtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {pageSubtitle}
            </p>
          )}
        </motion.div>

        {heroImageUrl && (
          <div className="rounded-2xl overflow-hidden shadow-sm border border-border/50 mb-12 md:mb-16 aspect-[2/1] max-h-[400px]">
            <img src={heroImageUrl} alt="Milton Quran Institute" className="w-full h-full object-cover" />
          </div>
        )}

        {instituteText && (
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line mb-12 md:mb-16 max-w-3xl">
            {instituteText}
          </p>
        )}

        {/* Teachers */}
        {teachers.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Teachers</h2>
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRow(teachersRef, "left")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollRow(teachersRef, "right")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ›
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Meet the dedicated instructors guiding our students on their Qur&apos;anic journey.
            </p>
            <div
              ref={teachersRef}
              className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin"
            >
              {teachers.map((t) => {
                const photoUrl = t.photo?.asset?.url ? urlFor(t.photo).width(360).height(360).fit("crop").url() : null;
                return (
                  <Card
                    key={t.name}
                    className="min-w-[280px] max-w-[300px] flex-shrink-0 border-border/60 bg-card/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      {photoUrl && (
                        <div className="w-28 h-28 rounded-full overflow-hidden border border-border/60">
                          <img src={photoUrl} alt={t.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-foreground">{t.name}</h3>
                        {t.role && <p className="text-sm text-primary mt-0.5">{t.role}</p>}
                        {t.oneLineDescription && (
                          <p className="text-sm text-muted-foreground mt-1">{t.oneLineDescription}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Graduates */}
        {graduates.length > 0 && (
          <section>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Graduates</h2>
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRow(graduatesRef, "left")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollRow(graduatesRef, "right")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ›
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A glimpse of the students who have completed their studies with us.
            </p>
            <div
              ref={graduatesRef}
              className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin"
            >
              {graduates.map((g) => {
                const photoUrl = g.photo?.asset?.url ? urlFor(g.photo).width(360).height(360).fit("crop").url() : null;
                return (
                  <Card
                    key={g.name}
                    className="min-w-[260px] max-w-[280px] flex-shrink-0 border-border/60 bg-card/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      {photoUrl && (
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-border/60">
                          <img src={photoUrl} alt={g.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-foreground">{g.name}</h3>
                        {g.title && <p className="text-sm text-primary mt-0.5">{g.title}</p>}
                        {g.yearOfGraduation && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Class of {g.yearOfGraduation}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {aboutPage?.additionalContent && aboutPage.additionalContent.length > 0 && (
          <section className="mt-14">
            <div className="prose prose-lg max-w-none prose-p:text-muted-foreground">
              <PortableText value={aboutPage.additionalContent as React.ComponentProps<typeof PortableText>['value']} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default About;

