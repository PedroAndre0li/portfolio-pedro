/**
 * DESIGN: Restauração do layout original de Pedro Andreoli
 * Ajuste exclusivo de cronologia para 2 anos de experiência (2024-2026)
 */
import { motion } from "framer-motion";
import { BookOpen, Scale, Ticket, Rocket } from "lucide-react";

const timeline = [
  {
    id: 1,
    year: "2024",
    title: "Início da Jornada",
    description: "Início dos estudos em ADS na PUC-GO e primeiros projetos como freelancer desenvolvendo sites e aplicações web em Goiânia."
  },
  {
    id: 2,
    year: "2025",
    title: "Primeiro SaaS",
    description: "Desenvolvimento do Júri, software especializado para escritórios de advocacia, focando em automação e gestão de processos."
  },
  {
    id: 3,
    year: "2025",
    title: "Expansão",
    description: "Criação do LotoMax, ecossistema inteligente para gestão de loterias com foco em lógica de dados e rede de agentes."
  },
  {
    id: 4,
    year: "2024-2026",
    title: "Consolidação",
    description: "Atuação como desenvolvedor full-stack estratégico e fundação de empresa própria focada em transformação digital."
  }
];

export default function AboutPage() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-extrabold text-foreground mb-4">
            Minha <span className="gradient-text">Trajetória</span>
          </h2>
          <div className="accent-line w-24" />
        </motion.div>

        <div className="grid gap-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 items-start group"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center font-bold text-primary group-hover:border-primary/50 transition-colors">
                  {item.id}
                </div>
                {index !== timeline.length - 1 && (
                  <div className="w-px h-full bg-border mt-4" />
                )}
              </div>
              <div className="flex-1 pb-12">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-accent font-bold uppercase tracking-wider">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
