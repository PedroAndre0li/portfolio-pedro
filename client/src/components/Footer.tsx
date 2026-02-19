/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 */
import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
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
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} · Goiânia, GO · Feito com{" "}
            <span className="text-primary">React</span> +{" "}
            <span className="text-accent">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
