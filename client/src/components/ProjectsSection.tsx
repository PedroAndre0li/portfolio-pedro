/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 * Cards de projetos reais com imagens geradas, badges e links para demos
 */
import { motion } from "framer-motion";
import { ExternalLink, Scale, Ticket, ShoppingCart, LayoutDashboard, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const JURI_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/mYNSXf50IEt7sbThZtH47S/sandbox/9ipueQZc9u7VvtMWhKumfP-img-4_1771506592000_na1fn_anVyaS1wcmV2aWV3.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVlOU1hmNTBJRXQ3c2JUaFp0SDQ3Uy9zYW5kYm94LzlpcHVlUVpjOXU3VnZ0TVdoS3VtZlAtaW1nLTRfMTc3MTUwNjU5MjAwMF9uYTFmbl9hblZ5YVMxd2NtVjJhV1YzLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=BHvXQu6Dmo-3i5roqCIFpKty6iOHjy24FfLPLFy8H2SXbHs-Eo~W55uYdLO651-ZbIsK2LYh5aKaa3-lhZctM6mPPQWGqi16ymBaVGE-FhUYpjM5hf10L3uiopkdLTkFtNrzV~8xF7f1OsmJzYauNQbzPEKRy78suRIVoYKhNx-KsYSA1-hrcv6u7f6NCc5hurb~qEqfWTr~-2Iz6vK44~ppDQz7BB4Mg9oOWEcNHcpKVYkRps-1ODkp1SFS~t6ZXWYEYJJyO78b3yhqayeFUON5Ycuc6XO0zjr5SUPVK1YNCSj9RgOGAO4l39cMSAupBMPBzYCN~DOciKnso7yFng__";
const LOTOMAX_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/mYNSXf50IEt7sbThZtH47S/sandbox/9ipueQZc9u7VvtMWhKumfP-img-5_1771506588000_na1fn_bG90b21heC1wcmV2aWV3.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVlOU1hmNTBJRXQ3c2JUaFp0SDQ3Uy9zYW5kYm94LzlpcHVlUVpjOXU3VnZ0TVdoS3VtZlAtaW1nLTVfMTc3MTUwNjU4ODAwMF9uYTFmbl9iRzkwYjIxaGVDMXdjbVYyYVdWMy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=LfucFTfDUF--NpEyRVzGX8Ac5C5Vc71Xp7yw16cwieaNfk8hWGk1IiwF5K5u1gTor9pEzJoICuIrSnjy~935d-YaleDaEnbA3CRQy55iAlzwECS4Hi9QbD6bhHYWOBMGc8o~R6UhD6pMmzUwIxqB~yjfK6jkwycHVzIqG-u1SJB~OOa8WdLxyzpoXYAL6D-YiDFBeELcTOQ6w3w2pvLt~qzZAjcYB6cfkD9rXZ-t56be8knLyB0q-Vy5Owj-YXh1k0zsQKITx4NiNs5u1Twf1cJknmuC532JNPDotKvuequbx56rCr683CXjO2~XaLI8XIe1dZnunlQLQkXVJJlbbg__";
const MARKETPLACE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/mYNSXf50IEt7sbThZtH47S/sandbox/9ipueQZc9u7VvtMWhKumfP-img-2_1771506580000_na1fn_bWFya2V0cGxhY2UtcHJldmlldw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVlOU1hmNTBJRXQ3c2JUaFp0SDQ3Uy9zYW5kYm94LzlpcHVlUVpjOXU3VnZ0TVdoS3VtZlAtaW1nLTJfMTc3MTUwNjU4MDAwMF9uYTFmbl9iV0Z5YTJWMGNHeGhZMlV0Y0hKbGRtbGxkdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OqLLOWaY-70bieUGeNlnT3I-QOJ2eDC9jm~KDl6KsZX7BL-4HgVDEc6CGNybGnv~VcyNtw8axdoxWP1w6FbTFkvcgmiVsEVmtRyAQCc72cmDVCmVURs42Ub~GVKA1cWRBQihpjeJuaY7F951~6P7S~qO2U574KUyUimj5HVQJaaoHX4eMldeOI~z2EVAqfZ-FR-v47lcLvYuPMDNe0EpzO6Zl1g-bFNVpmM8BOQCjggusZ85bOZUaGrraU439cDmoF5wPpPemd3Uogx0C6FYW4BqWI5RvU5SV3wXT008gYI5PkqeBGQcmW29-b1jyltzeNvYLX2SpuZR1-Bd-Q2BcA__";
const DASHBOARD_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/mYNSXf50IEt7sbThZtH47S/sandbox/9ipueQZc9u7VvtMWhKumfP-img-3_1771506582000_na1fn_ZGFzaGJvYXJkLXByZXZpZXc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbVlOU1hmNTBJRXQ3c2JUaFp0SDQ3Uy9zYW5kYm94LzlpcHVlUVpjOXU3VnZ0TVdoS3VtZlAtaW1nLTNfMTc3MTUwNjU4MjAwMF9uYTFmbl9aR0Z6YUdKdllYSmtMWEJ5WlhacFpYYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=quaRLyzQOnO1IOtpPzlO6A5iiAYrRF~gNHxi2t8Evbg3r7g1jrj8jsC4T62cJoAQSgk0khcvwvS9rppocNg9dIwON2-UE87wj9V5fW7FkUtFAWlMKtmXYEny-OktWSotyCAE~SXCfWffleNzbARvD~zpFL7Qd-IrvAx3sEe9FvK0audCCGNHu5ROeEv-QDBGz7m2prMZrNpqWoHZUREhyWlhl5Y7u5nffhrXwkoSzHjTtyKtuQlP6f52kB7-prJ7cvsU~-rpjesXQIp~319wFcYVMKxq08iShFQHuzyI7F1-QY~qGdbu4gV9Iy-Z49DJe2TuaGlEqt0nHsC7ricjcQ__";

const projects = [
  {
    id: "juri",
    title: "Júri",
    subtitle: "Software Jurídico",
    description:
      "Sistema especializado para escritórios de advocacia e empresas de cobrança. Gestão completa de processos, clientes, prazos e financeiro em um único painel.",
    image: JURI_IMG,
    icon: Scale,
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    status: "Em Produção",
    statusColor: "text-green-400 bg-green-400/10 border-green-400/30",
    accentColor: "border-primary/40 hover:border-primary/70",
    glowColor: "hover:shadow-primary/20",
    category: "Software Empresarial",
    features: ["Gestão de Processos", "Controle Financeiro", "Agenda de Prazos", "Relatórios"],
    href: null,
  },
  {
    id: "lotomax",
    title: "LotoMax",
    subtitle: "Ecossistema de Loterias",
    description:
      "Plataforma inteligente para gestão completa de loterias. Controle de sorteios, rede de agentes, distribuição de prêmios e relatórios em tempo real.",
    image: LOTOMAX_IMG,
    icon: Ticket,
    tags: ["React", "Node.js", "Redis", "WebSocket"],
    status: "Em Andamento",
    statusColor: "text-accent bg-accent/10 border-accent/30",
    accentColor: "border-accent/40 hover:border-accent/70",
    glowColor: "hover:shadow-accent/20",
    category: "Fintech / Loteria",
    features: ["Gestão de Sorteios", "Rede de Agentes", "Resultados em Tempo Real", "Dashboard Financeiro"],
    href: null,
  },
  {
    id: "marketplace",
    title: "Marketplace",
    subtitle: "Vitrine E-commerce",
    description:
      "Módulo de marketplace completo com catálogo de produtos, carrinho funcional e fluxo de checkout. Demonstração interativa disponível.",
    image: MARKETPLACE_IMG,
    icon: ShoppingCart,
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    status: "Demo Interativa",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    accentColor: "border-primary/40 hover:border-primary/70",
    glowColor: "hover:shadow-primary/20",
    category: "E-commerce",
    features: ["Catálogo de Produtos", "Carrinho Funcional", "Checkout Simulado", "Filtros e Busca"],
    href: "/marketplace",
  },
  {
    id: "dashboard",
    title: "SaaS Dashboard",
    subtitle: "Painel Administrativo",
    description:
      "Painel de controle para clínicas de estética e escritórios de advocacia em Goiânia. KPIs, agendamentos, financeiro e relatórios.",
    image: DASHBOARD_IMG,
    icon: LayoutDashboard,
    tags: ["React", "Recharts", "TypeScript", "Tailwind"],
    status: "Demo Interativa",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    accentColor: "border-primary/40 hover:border-primary/70",
    glowColor: "hover:shadow-primary/20",
    category: "SaaS / Gestão",
    features: ["KPIs em Tempo Real", "Gestão de Clientes", "Controle Financeiro", "Agendamentos"],
    href: "/dashboard",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projetos" className="py-24 relative">
      <div className="section-divider mb-24 -mt-24" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
            — Portfólio
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Projetos Realizados
              <br />
              <span className="gradient-text">e em Andamento</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Cada projeto foi construído pensando em resultado real para o negócio, não apenas em código bonito.
            </p>
          </div>
          <div className="accent-line mt-6 w-24" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const CardContent = (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl bg-card border ${project.accentColor} overflow-hidden card-hover ${project.glowColor} transition-all duration-300 cursor-pointer`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-mono bg-background/80 backdrop-blur-sm text-muted-foreground border border-border rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold border rounded-full ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                        <p className="text-xs text-muted-foreground">{project.subtitle}</p>
                      </div>
                    </div>
                    {project.href && (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-mono bg-secondary text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.href && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-primary font-semibold">
                        Ver Demo <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return project.href ? (
              <Link key={project.id} href={project.href}>
                {CardContent}
              </Link>
            ) : (
              <div key={project.id}>{CardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
