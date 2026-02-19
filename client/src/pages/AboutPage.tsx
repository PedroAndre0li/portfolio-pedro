/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 * Página Sobre — Trajetória, expertise e valores de Pedro Andreoli
 */
import { ArrowLeft, Code2, Zap, Users, Target, Award, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";

const expertise = [
  { icon: Code2, title: "Full-Stack Development", desc: "React, Node.js, TypeScript, PostgreSQL e arquitetura moderna" },
  { icon: Target, title: "Foco em Resultado", desc: "Cada projeto é tratado como um negócio próprio com ROI em mente" },
  { icon: Users, title: "Gestão de Projetos", desc: "Comunicação clara, prazos respeitados e entrega de qualidade" },
  { icon: Zap, title: "Performance", desc: "Otimização, UX fluida e sistemas que escalam com seu negócio" },
];

const timeline = [
  {
    year: "2021",
    title: "Início da Jornada",
    desc: "Começou como freelancer desenvolvendo sites e aplicações web para pequenas empresas em Goiânia",
  },
  {
    year: "2022",
    title: "Primeiro SaaS",
    desc: "Desenvolveu Júri, software especializado para escritórios de advocacia com sucesso no mercado",
  },
  {
    year: "2023",
    title: "Expansão",
    desc: "Criou LotoMax, ecossistema inteligente para gestão de loterias com rede de agentes",
  },
  {
    year: "2024-2026",
    title: "Consolidação",
    desc: "Atua como desenvolvedor full-stack estratégico, consultando empresas sobre transformação digital",
  },
];

const skills = [
  { category: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Redis", "WebSocket"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Stripe"] },
  { category: "Soft Skills", items: ["Comunicação", "Liderança", "Problem-Solving", "Mentalidade Ágil"] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </span>
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-foreground">Quem é</span>
              <br />
              <span className="gradient-text">Pedro Andreoli?</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Desenvolvedor Full-Stack apaixonado por tecnologia, com foco em criar soluções que geram impacto real nos negócios. Não apenas codifico — penso como empresário, entendo suas dores e entrego resultados mensuráveis.
            </p>
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div className="py-16 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-extrabold mb-12">Minha Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-extrabold mb-12">Minha Trajetória</h2>
          <div className="space-y-8">
            {timeline.map(({ year, title, desc }, i) => (
              <div key={year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary border-2 border-background flex items-center justify-center font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-24 bg-gradient-to-b from-primary to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-mono text-primary mb-1">{year}</p>
                  <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="py-16 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-extrabold mb-12">Skills & Tecnologias</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map(({ category, items }) => (
              <div key={category}>
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-extrabold mb-12">Meus Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-primary/5 border border-primary/20">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Qualidade</h3>
              <p className="text-sm text-muted-foreground">
                Código limpo, testes, documentação e arquitetura escalável. Não faço gambiarra.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-accent/5 border border-accent/20">
              <Target className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-foreground mb-2">Resultado</h3>
              <p className="text-sm text-muted-foreground">
                Cada projeto é medido por ROI. Penso em vendas, economia de tempo e crescimento.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-green-500/5 border border-green-500/20">
              <Users className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold text-foreground mb-2">Parceria</h3>
              <p className="text-sm text-muted-foreground">
                Seu sucesso é meu sucesso. Comunicação clara, transparência e comprometimento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 border-t border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-4">Vamos Trabalhar Juntos?</h2>
            <p className="text-muted-foreground mb-8">
              Se você procura um desenvolvedor que trata seu projeto como seu próprio negócio, vamos conversar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5562982933475"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all"
              >
                <Zap className="w-4 h-4" />
                Falar no WhatsApp
              </a>
              <a
                href="mailto:pedro@andreoli.dev"
                className="flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary/60 transition-all"
              >
                <Mail className="w-4 h-4" />
                Enviar E-mail
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Code2 className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Pedro Andreoli</span> — Desenvolvedor Full-Stack
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://wa.me/5562982933475" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-400 transition-colors">
                <Zap className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
