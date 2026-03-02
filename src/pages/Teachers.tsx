import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getTeachers, getTeachersPage } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { User } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Teachers = () => {
  const { data: teachersPageData } = useQuery({
    queryKey: ["teachersPage"],
    queryFn: getTeachersPage,
  });
  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const pageTitle = teachersPageData?.title ?? "Our Teachers";
  const intro = teachersPageData?.intro ?? "Meet our dedicated team of instructors who bring passion and expertise to Qur'anic education.";

  return (
    <main className="py-16 md:py-24">
      <div className="container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{pageTitle}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {intro}
          </p>
        </motion.div>

        {teachers.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center py-16 rounded-xl border border-border/50 bg-muted/30"
          >
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No teachers have been added yet. Add teachers in Sanity Studio.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teachers.map((teacher, i) => {
              const imageUrl = teacher.image?.asset?.url
                ? urlFor(teacher.image).width(400).height(400).fit("fill").url()
                : null;
              return (
                <motion.div
                  key={teacher._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.05 } } }}
                >
                  <Card className="h-full border-border/50 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-muted/50 relative overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={teacher.name ?? "Teacher"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground text-lg">{teacher.name}</h3>
                      {teacher.role && (
                        <p className="text-sm text-primary font-medium mt-0.5">{teacher.role}</p>
                      )}
                      {teacher.shortDescription && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{teacher.shortDescription}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Teachers;
