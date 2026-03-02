import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-classroom.jpg";
import { useQuery } from "@tanstack/react-query";
import { getHomepage, getTeachers } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { urlFor } from "@/lib/sanity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { User } from "lucide-react";

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
  const teachersSectionTitle = homepage?.teachersSectionTitle ?? "Our Teachers";
  const teachersSectionSubtitle = homepage?.teachersSectionSubtitle ?? "Meet our dedicated instructors who bring excellence to Qur'anic education.";
  const ctaTitle = homepage?.ctaTitle ?? "Begin Your Qur'anic Journey Today";
  const ctaSubtitle = homepage?.ctaSubtitle ?? "Enroll in one of our programs and join a community dedicated to learning, growth, and spiritual development.";
  const ctaButtons = homepage?.ctaButtons?.length ? homepage.ctaButtons : [
    { label: "View Programs", to: "/programs", variant: "primary" as const },
    { label: "Support Us", to: "/donate", variant: "accent" as const },
  ];

  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

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
                <motion.div key={cat.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.15 } } }}>
                  <Link to={cat.to ?? "/programs"}>
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-card/80 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Teachers */}
      {teachers.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{teachersSectionTitle}</h2>
              <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">{teachersSectionSubtitle}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative px-12">
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-4">
                  {teachers.map((teacher) => {
                    const imageUrl = teacher.image?.asset?.url
                      ? urlFor(teacher.image).width(320).height(320).fit("fill").url()
                      : null;
                    return (
                      <CarouselItem key={teacher._id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <Link to="/teachers">
                          <Card className="h-full border-border/50 overflow-hidden hover:shadow-lg transition-all">
                            <div className="aspect-square bg-muted/50 relative overflow-hidden">
                              {imageUrl ? (
                                <img src={imageUrl} alt={teacher.name ?? "Teacher"} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User className="h-12 w-12 text-muted-foreground/50" />
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-foreground">{teacher.name}</h3>
                              {teacher.role && <p className="text-xs text-primary font-medium mt-0.5">{teacher.role}</p>}
                              {teacher.shortDescription && (
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{teacher.shortDescription}</p>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="-left-2 sm:-left-4" />
                <CarouselNext className="-right-2 sm:-right-4" />
              </Carousel>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mt-8">
              <Link to="/teachers">
                <Button variant="outline" className="rounded-full">
                  View All Teachers
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container text-center space-y-6">
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
