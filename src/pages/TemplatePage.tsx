import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  getPageBySlug,
  getProgramsForListing,
  type PageSection,
  type PageSectionHero,
  type PageSectionFormEmbed,
  type PageSectionCta,
  type PageSectionProgramListing,
} from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { JotformEmbed } from "@/components/JotformEmbed";
import type { ProgramForListing } from "@/lib/sanityQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SectionHero({ section }: { section: PageSectionHero }) {
  const imageUrl = section.image?.asset?.url
    ? urlFor(section.image).width(1400).height(600).fit("max").url()
    : null;
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
      {imageUrl && (
        <>
          <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
        </>
      )}
      {!imageUrl && <div className="absolute inset-0 bg-primary/10" />}
      <div className="container relative z-10 py-16 md:py-24">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{section.title}</h1>
          {section.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
          )}
          {section.ctaButtons && section.ctaButtons.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {section.ctaButtons.map((btn) =>
                btn.to.startsWith("http") ? (
                  <Button key={btn.to} asChild className="rounded-full">
                    <a href={btn.to} target="_blank" rel="noopener noreferrer">{btn.label}</a>
                  </Button>
                ) : (
                  <Button key={btn.to} asChild className="rounded-full">
                    <Link to={btn.to}>{btn.label}</Link>
                  </Button>
                )
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SectionRichText({ section }: { section: { heading?: string; content?: unknown[] } }) {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        {section.heading && (
          <h2 className="text-2xl font-bold text-foreground mb-6">{section.heading}</h2>
        )}
        {section.content && section.content.length > 0 && (
          <div className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
            <PortableText value={section.content} />
          </div>
        )}
      </div>
    </section>
  );
}

function SectionImage({ section }: { section: { image?: { asset?: { url: string } }; caption?: string } }) {
  const url = section.image?.asset?.url ? urlFor(section.image).width(1200).url() : null;
  if (!url) return null;
  return (
    <section className="py-8 md:py-12">
      <div className="container max-w-4xl">
        <figure>
          <img src={url} alt={section.caption ?? ""} className="w-full rounded-xl object-cover" />
          {section.caption && (
            <figcaption className="mt-2 text-sm text-center text-muted-foreground">{section.caption}</figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}

function SectionImageGallery({ section }: { section: { heading?: string; images?: { asset?: { url: string } }[] } }) {
  const images = section.images ?? [];
  if (images.length === 0) return null;
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        {section.heading && (
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{section.heading}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => {
            const url = img?.asset?.url ? urlFor(img).width(600).height(400).fit("max").url() : null;
            return url ? <img key={i} src={url} alt="" className="w-full h-48 object-cover rounded-lg" /> : null;
          })}
        </div>
      </div>
    </section>
  );
}

function SectionProgramListing({
  section,
  programs,
}: {
  section: PageSectionProgramListing;
  programs: ProgramForListing[];
}) {
  const limit = section.limit ?? programs.length;
  const list = programs.slice(0, limit);
  if (list.length === 0) return null;
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        {section.heading && (
          <h2 className="text-2xl font-bold text-foreground mb-2">{section.heading}</h2>
        )}
        {section.subheading && (
          <p className="text-muted-foreground mb-8">{section.subheading}</p>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {list.map((prog) => {
            const slug = prog.slug;
            const categorySlug = prog.category?.slug ?? "programs";
            const href = `/programs/${categorySlug}/${slug}`;
            const imageUrl = prog.mainImage?.asset?.url
              ? urlFor(prog.mainImage).width(600).height(320).fit("max").url()
              : null;
            return (
              <Link key={prog._id} to={href}>
                <Card className="h-full border-border/50 hover:shadow-lg transition-all overflow-hidden">
                  {imageUrl && (
                    <img src={imageUrl} alt={prog.title} className="w-full h-40 object-cover" />
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground">{prog.title}</h3>
                    {prog.shortDescription && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{prog.shortDescription}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionFormEmbed({ section }: { section: PageSectionFormEmbed }) {
  const title = section.sectionTitle ?? "Form";
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
        <JotformEmbed
          formUrlOrId={section.jotformUrl}
          minHeight={500}
          title={title}
          emptyMessage="Add a Jotform URL in Sanity for this section."
        />
      </div>
    </section>
  );
}

function SectionCta({ section }: { section: PageSectionCta }) {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
        {section.subtitle && <p className="mt-2 text-muted-foreground">{section.subtitle}</p>}
        {section.buttons && section.buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {section.buttons.map((btn) =>
              btn.to.startsWith("http") ? (
                <Button key={btn.to} asChild className="rounded-full">
                  <a href={btn.to} target="_blank" rel="noopener noreferrer">{btn.label}</a>
                </Button>
              ) : (
                <Button key={btn.to} asChild className="rounded-full">
                  <Link to={btn.to}>{btn.label}</Link>
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const TemplatePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading } = useQuery({
    queryKey: ["templatePage", slug],
    queryFn: () => getPageBySlug(slug ?? ""),
    enabled: !!slug,
  });
  const { data: programs = [] } = useQuery({
    queryKey: ["programsForListing"],
    queryFn: getProgramsForListing,
  });

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!page || !page.slug) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <Button asChild><Link to="/">Go home</Link></Button>
      </div>
    );
  }

  const sections = page.sections ?? [];

  return (
    <main>
      {sections.map((section: PageSection, index: number) => {
        const key = section._key ?? `section-${index}`;
        switch (section._type) {
          case "sectionHero":
            return <SectionHero key={key} section={section as PageSectionHero} />;
          case "sectionRichText":
            return <SectionRichText key={key} section={section} />;
          case "sectionImage":
            return <SectionImage key={key} section={section} />;
          case "sectionImageGallery":
            return <SectionImageGallery key={key} section={section} />;
          case "sectionProgramListing":
            return (
              <SectionProgramListing
                key={key}
                section={section as PageSectionProgramListing}
                programs={programs as ProgramForListing[]}
              />
            );
          case "sectionFormEmbed":
            return <SectionFormEmbed key={key} section={section as PageSectionFormEmbed} />;
          case "sectionCta":
            return <SectionCta key={key} section={section as PageSectionCta} />;
          default:
            return null;
        }
      })}
    </main>
  );
};

export default TemplatePage;
