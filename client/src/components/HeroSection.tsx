/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 * Hero ajustada para refletir 2 anos de experiência e foco em resultados.
 */
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Code2, TrendingUp, Clock, Building2 } from "lucide-react";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/mYNSXf50IEt7sbThZtH47S/sandbox/9ipueQZc9u7VvtMWhKumfP-img-1_1771506579000_na1fn_aGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVlOU1hmNTBJRXQ3c2JUaFp0SDQ3Uy9zYW5kYm94LzlpcHVlUVpjOXU3VnZ0TVdoS3VtZlAtaW1nLTFfMTc3MTUwNjU3OTAwMF9uYTFmbl9hR1Z5YnkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CqVjUcG0a4MQKC~lhH6gBN09gL7mh8WjhABYy79bCfxvYqYp6imNWs1uBZoi0X-AszwnHPMTy-4tKyAd-AbF0Pk5RmKqbAXf58vxpKZY3~lhdyZYLQ4QT8YVy6Up7RYgEAYNXdFQ~LAZgCUJcXk153ib-rzOMAj5kPtgRKyB-M42nZWyB1jkPwS1lwMCukRXElqvbjDYCm7spxXhNZJHgwqFeEBbfY5mA14PjXyAf-aj5zOGCgeGLivDhXoQYxilnRo7jYjNW1PiUelA2KKDJ1~3WAVcNi0zi266bRMe7MrC96XYX8DZXfgFYu1zRGlkRaBVBfRQUhncnAx13W8hGQ__";

const highlights = [
  { icon: TrendingUp, label: "Foco em Vendas", color: "text-primary" },
  { icon: Clock, label: "Economia de Tempo", color: "text-accent" },
  { icon: Building2, label: "Mentalidade de Dono", color: "text-primary" },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { value: 6, suffix: "+", label: "Projetos em Portfólio" },
  { value: 2, suffix: " anos", label: "de Experiência Prática" },
  { value: 100, suffix: "%", label: "Foco em Resultado" },
];

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 2000, inView);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
      className="p-6 rounded-xl bg-card/60 border border-border backdrop-blur-sm card-hover"
    >
      <div className="flex items-end gap-1">
        <span className="text-4xl font-extrabold gradient-text">{count}</span>
        <span className="text-2xl font-bold text-accent mb-0.5">{stat.suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
      <div className="accent-line mt-3 w-12" />
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "4rem" }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 space-y-8"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 w-fit">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-semibold tracking-wide uppercase">
                  Desenvolvedor e Empreendedor
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm font-mono text-muted-foreground mb-2 tracking-widest uppercase">
                Estudante de ADS na PUC-GO
              </p>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-none tracking-tight">
                <span className="text-foreground">Pedro</span>
                <br />
                <span className="gradient-text">Andreoli</span>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative pl-5 border-l-2 border-accent/60"
            >
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                Com <span className="text-accent font-semibold">2 anos de experiência prática</span> no mercado, transformo tecnologia em valor de negócio. 
                Meu foco não é apenas código, é <span className="text-foreground font-semibold">vendas, economia de tempo e eficiência.</span>
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Atualmente na PUC-GO, desenvolvo sistemas personalizados com a mentalidade de quem entende que o software precisa servir ao crescimento da empresa. 
                Se você busca alguém focado em entregar resultados reais, você encontrou.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {highlights.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60 border border-border text-sm font-medium"
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-foreground/80">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projetos"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200"
              >
                Ver Projetos
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contato"
                className="flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary/60 transition-all duration-200"
              >
                <Code2 className="w-4 h-4 text-primary" />
                Falar Comigo
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            <StatCard stat={stats[0]} index={0} inView={inView} />
            <StatCard stat={stats[1]} index={1} inView={inView} />
            <StatCard stat={stats[2]} index={2} inView={inView} />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="p-5 rounded-xl bg-card/60 border border-border backdrop-blur-sm"
            >
              <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
                Stack & Ferramentas
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "React", "Node.js", "TypeScript", "n8n", "PostgreSQL"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
