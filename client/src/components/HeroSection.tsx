/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 * Hero assimétrico: texto à esquerda (60%), visual à direita (40%)
 * Texto autêntico de Pedro Andreoli preservado integralmente
 */
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Code2, TrendingUp, Clock, Building2 } from "lucide-react";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/mYNSXf50IEt7sbThZtH47S/sandbox/9ipueQZc9u7VvtMWhKumfP-img-1_1771506579000_na1fn_aGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVlOU1hmNTBJRXQ3c2JUaFp0SDQ3Uy9zYW5kYm94LzlpcHVlUVpjOXU3VnZ0TVdoS3VtZlAtaW1nLTFfMTc3MTUwNjU3OTAwMF9uYTFmbl9hR1Z5YnkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CqVjUcG0a4MQKC~lhH6gBN09gL7mh8WjhABYy79bCfxvYqYp6imNWs1uBZoi0X-AszwnHPMTy-4tKyAd-AbF0Pk5RmKqbAXf58vxpKZY3~lhdyZYLQ4QT8YVy6Up7RYgEAYNXdFQ~LAZgCUJcXk153ib-rzOMAj5kPtgRKyB-M42nZWyB1jkPwS1lwMCukRXElqvbjDYCm7spxXhNZJHgwqFeEBbfY5mA14PjXyAf-aj5zOGCgeGLivDhXoQYxilnRo7jYjNW1PiUelA2KKDJ1~3WAVcNi0zi266bRMe7MrC96XYX8DZXfgFYu1zRGlkRaBVBfRQUhncnAx13W8hGQ__";

const highlights = [
  { icon: TrendingUp, label: "Foco em Vendas", color: "text-primary" },
  { icon: Clock, label: "Economia de Tempo", color: "text-accent" },
  { icon: Building2, label: "Mentalidade Empreendedora", color: "text-primary" },
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
  { value: 15, suffix: "+", label: "Projetos Entregues" },
  { value: 3, suffix: " anos", label: "de Experiência" },
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
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Main Content (3/5) */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 space-y-8"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 w-fit">
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
                <span className="text-xs text-green-400 font-semibold tracking-wide uppercase">
                  Disponível para Projetos
                </span>
              </div>
              <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-green-500/30 to-transparent" />
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <p className="text-sm font-mono text-muted-foreground mb-2 tracking-widest uppercase">
                Desenvolvedor Full-Stack
              </p>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-none tracking-tight">
                <span className="text-foreground">Pedro</span>
                <br />
                <span className="gradient-text">Andreoli</span>
              </h1>
            </motion.div>

            {/* Authentic Text */}
            <motion.div
              variants={itemVariants}
              className="relative pl-5 border-l-2 border-accent/60"
            >
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                Meu nome é Pedro Nascimento Andreoli, sou apaixonado em tecnologia e tenho certeza que{" "}
                <span className="text-accent font-semibold">você não vai se arrepender de me contratar.</span>
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Não penso em criar sites e softwares, penso em{" "}
                <span className="text-foreground font-semibold">vendas, economia de tempo e empreendedorismo.</span>{" "}
                Se você quer alguém que faça seu site com{" "}
                <span className="text-primary font-semibold">cabeça de que a empresa é dele</span>, sou eu.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Segue abaixo alguns projetos realizados e em andamentos.
              </p>
            </motion.div>

            {/* Highlights */}
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

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projetos"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                Ver Projetos
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary/60 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Code2 className="w-4 h-4 text-primary" />
                Falar Comigo
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Stats (2/5) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            <StatCard stat={stats[0]} index={0} inView={inView} />
            <StatCard stat={stats[1]} index={1} inView={inView} />
            <StatCard stat={stats[2]} index={2} inView={inView} />

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="p-5 rounded-xl bg-card/60 border border-border backdrop-blur-sm"
            >
              <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
                Stack Principal
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js", "Tailwind"].map((tech) => (
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
