/**
 * DESIGN: "Linha do Tempo Estratégica"
 * Ajustada para refletir exatamente 2 anos de experiência (2024-2026)
 * Foco: Início em ADS, desenvolvimento do Júri e LotoMax.
 */
import { motion } from "framer-motion";
import { BookOpen, Scale, Ticket, Rocket } from "lucide-react";

const timeline = [
  {
    year: "2024",
    title: "Início da Jornada & ADS",
    description: "Início dos estudos em Análise e Desenvolvimento de Sistemas na PUC-GO e primeiros projetos como freelancer em Goiânia.",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    year: "2025",
    title: "Primeiro SaaS: Júri",
    description: "Desenvolvimento e lançamento do Júri, software focado em gestão e automação para escritórios de advocacia.",
    icon: Scale,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    year: "2025",
    title: "Expansão: LotoMax",
    description: "Criação do LotoMax, um ecossistema inteligente para gestão de loterias e rede de agentes.",
    icon: Ticket,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    year: "2026",
    title: "Consolidação & Empresa",
    description: "Atuando como desenvolvedor full-stack e fundando empresa focada em transformar negócios através da tecnologia.",
    icon: Rocket,
    color: "text-green-400",
    bg: "bg-green-400/10"
  }
];

export default function ExperienceTimeline() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold gradient-text mb-4">Minha Trajetória</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma evolução focada em aprender rápido e entregar soluções que realmente funcionam para o mercado.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-border ml-4 md:ml-0 md:left-1/2 md:-translate-x-px space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
            >
              {/* Dot */}
              <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 group-hover:scale-125 transition-transform" />

              {/* Content Card */}
              <div className="w-[calc(100%-2rem)] md:w-[45%] p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors ml-8 md:ml-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${item.bg}`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-sm font-mono font-bold text-primary">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
