import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-classroom.jpg";
import { useQuery } from "@tanstack/react-query";
import { getHomepage, getAboutPage, type AboutTeacher } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { urlFor } from "@/lib/sanity";

const defaultProgramCategories = [
  { title: "Courses", description: "Flexible courses in Qur'an recitation, Tajweed, Arabic, and Islamic Studies for all ages and levels.", icon: "BookOpen", to: "/programs" },
  { title: "Full Time School", description: "Comprehensive Hifz and Islamic Studies programs with structured daily schedules and qualified instructors.", icon: "GraduationCap", to: "/programs" },
  { title: "Summer Programs", description: "Engaging summer intensives combining Qur'anic learning with enrichment activities for youth.", icon: "Sun", to: "/programs" },
];

const defaultWhyChooseUs = [
  { icon: "Award", title: "Qualified Instructors", description: "Certified scholars with Ijazah in Qur'anic recitation" },
  { icon: "Users", title: "Small Class Sizes", description: "Personalized attention for every student" },
  { icon: "BookOpen", title: "Structured Curriculum", description: "Progressive learning paths tailored to each level" },
  { icon: "Heart", title: "Supportive Community", description: "A welcoming environment for families" },
  { icon: "Clock", title: "Flexible Scheduling", description: "Weekend, evening, and full-time options" },
  { icon: "Shield", title: "Safe Environment", description: "Background-checked staff and secure facilities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  const { data: homepage } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });
  const { data: aboutPage } = useQuery({
    queryKey: ["aboutPageForHome"],
    queryFn: getAboutPage,
  });

  const heroEyebrow = homepage?.heroEyebrow ?? "— Milton Quran Institute —";
  const heroTitle = homepage?.heroTitle ?? "Nurturing Hearts Through Qur'anic Education";
  const heroSubtitle = homepage?.heroSubtitle ?? "Join a vibrant learning community dedicated to excellence in Qur'anic studies, Arabic language, and Islamic education for all ages.";
  const heroCtaButtons = homepage?.heroCtaButtons?.length ? homepage.heroCtaButtons : [
    { label: "Explore Programs", to: "/programs", variant: "primary" as const },
    { label: "Get in Touch", to: "/contact", variant: "accent" as const },
  ];
  const programsSectionTitle = homepage?.programsSectionTitle ?? "Our Programs";
  const programsSectionSubtitle = homepage?.programsSectionSubtitle ?? "Discover our range of programs designed to meet learners at every stage of their Qur'anic journey.";
  const programCategories = homepage?.programCategories?.length ? homepage.programCategories : defaultProgramCategories;
  const whyChooseUsSectionTitle = homepage?.whyChooseUsSectionTitle ?? "Why Choose Us";
  const whyChooseUsSectionSubtitle = homepage?.whyChooseUsSectionSubtitle ?? "We are committed to providing the highest quality Qur'anic education in a nurturing environment.";
  const whyChooseUsItems = homepage?.whyChooseUsItems?.length ? homepage.whyChooseUsItems : defaultWhyChooseUs;
  const ctaTitle = homepage?.ctaTitle ?? "Begin Your Qur'anic Journey Today";
  const ctaSubtitle = homepage?.ctaSubtitle ?? "Enroll in one of our programs and join a community dedicated to learning, growth, and spiritual development.";
  const footerNote = homepage?.footerNote;
  const ctaButtons = homepage?.ctaButtons?.length ? homepage.ctaButtons : [
    { label: "View Programs", to: "/programs", variant: "primary" as const },
    { label: "Support Us", to: "/donate", variant: "accent" as const },
  ];

  const aboutSectionTitle = aboutPage?.title ?? "About Us";
  const aboutSectionSubtitle = aboutPage?.subtitle ?? "";
  const aboutTextFull = aboutPage?.instituteText ?? "";
  const homeTeachers = (aboutPage?.teachers ?? []) as AboutTeacher[];
  const showAboutSection = !!aboutPage;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Milton Qur'an Institute classroom" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/50" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl text-white space-y-6"
          >
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-accent font-sans font-medium mb-1">
              {heroEyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {heroCtaButtons.map((btn) => (
                <Link key={btn.to} to={btn.to}>
                  <Button
                    size="lg"
                    className={
                      btn.variant === "accent"
                        ? "rounded-full font-semibold px-8 bg-accent text-accent-foreground hover:bg-accent/85"
                        : "rounded-full font-semibold px-8 bg-primary text-primary-foreground hover:bg-primary/85"
                    }
                  >
                    {btn.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{programsSectionTitle}</h2>
            <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">{programsSectionSubtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {programCategories.map((cat, i) => {
              const Icon = getIcon(cat.icon);
              return (
                <div key={cat.title}>
                  <Link to={cat.categorySlug ? `/programs?category=${cat.categorySlug}` : (cat.to ?? "/programs")}>
                    <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                      <CardContent className="p-8 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{cat.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us */}
      {showAboutSection && (
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{aboutSectionTitle}</h2>
              <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
              {aboutSectionSubtitle && (
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {aboutSectionSubtitle}
                </p>
              )}
            </motion.div>

            {aboutTextFull && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line mb-10">
                {aboutTextFull}
              </p>
            )}

            {homeTeachers.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Teachers</h3>
                <div className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin">
                  {homeTeachers.map((t) => {
                    const photoUrl = t.photo?.asset?.url
                      ? urlFor(t.photo).width(280).height(280).fit("crop").url()
                      : null;
                    return (
                      <Card
                        key={t.name}
                        className="min-w-[260px] max-w-[280px] flex-shrink-0 border-border/60 bg-card/80 backdrop-blur-sm"
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                          {photoUrl && (
                            <div className="w-20 h-20 rounded-full overflow-hidden border border-border/60">
                              <img
                                src={photoUrl}
                                alt={t.name}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-foreground">{t.name}</p>
                            {t.role && <p className="text-xs text-primary mt-0.5">{t.role}</p>}
                            {t.oneLineDescription && (
                              <p className="text-sm text-muted-foreground mt-1">{t.oneLineDescription}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8">
              <Link to="/about">
                <Button variant="outline" className="rounded-full font-semibold px-6">
                  Learn more about us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 geometric-border">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{whyChooseUsSectionTitle}</h2>
            <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">{whyChooseUsSectionSubtitle}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsItems.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.title}>
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-card/80 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container text-center space-y-6">
          {footerNote && (
            <p className="text-secondary-foreground/90 text-sm max-w-xl mx-auto">{footerNote}</p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground">{ctaTitle}</h2>
          <p className="text-secondary-foreground/80 max-w-xl mx-auto text-lg">{ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {ctaButtons.map((btn) => (
              <Link key={btn.to} to={btn.to}>
                <Button
                  size="lg"
                  className={
                    btn.variant === "accent"
                      ? "rounded-full font-semibold px-8 bg-accent text-accent-foreground hover:bg-accent/85"
                      : "rounded-full font-semibold px-8 bg-primary text-primary-foreground hover:bg-primary/85"
                  }
                >
                  {btn.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
