/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 * Seção de contato com CTA direto e informações de contato
 */
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Zap, ArrowRight } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "(62) 98293-3475",
    href: "https://wa.me/5562982933475",
    color: "text-green-400",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "pedroandreoli5@gmail.com",
    href: "mailto:pedroandreoli5@gmail.com",
    color: "text-primary",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Goiânia, GO — Brasil",
    href: null,
    color: "text-accent",
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/PedroAndre0li", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "www.linkedin.com/in/pedro-nascimento-andreoli-b41a17282", color: "hover:text-primary" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/5562982933475", color: "hover:text-green-400" },
];

export default function ContactSection() {
  return (
    <section id="contato" className="py-24 relative">
      <div className="section-divider mb-24 -mt-24" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
                — Vamos Conversar
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Pronto para
                <br />
                <span className="gradient-text">Transformar</span>
                <br />
                seu Negócio?
              </h2>
              <div className="accent-line mt-6 w-24" />
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Se você quer um desenvolvedor que trata seu projeto como se fosse o próprio negócio dele,
              que pensa em vendas e resultado antes de escrever a primeira linha de código — me chama.
            </p>

            {/* Value Props */}
            <div className="space-y-3">
              {[
                "Resposta em até 2 horas úteis",
                "Orçamento sem compromisso",
                "Foco em resultado, não em horas trabalhadas",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <a
              href="https://wa.me/556282933475"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Contact Cards */}
            {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border card-hover group"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide">{label}</p>
                      <p className="text-foreground font-semibold mt-0.5">{value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide">{label}</p>
                      <p className="text-foreground font-semibold mt-0.5">{value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <span className="text-xs text-muted-foreground font-mono">Redes:</span>
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className={`w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground ${color} transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Availability Card */}
            <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
                <span className="text-sm font-semibold text-green-400">Disponível para Novos Projetos</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Atualmente aceitando projetos de desenvolvimento web, sistemas SaaS e consultoria estratégica.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
