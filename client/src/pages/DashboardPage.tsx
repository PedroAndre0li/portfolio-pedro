/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 * Módulo SaaS Dashboard: painel administrativo para clínicas/escritórios
 * Versão otimizada sem Recharts para melhor performance
 */
import { useState } from "react";
import {
  Users, TrendingUp, Calendar, DollarSign, Bell, Settings,
  LayoutDashboard, FileText, Clock, CheckCircle, AlertCircle,
  XCircle, ArrowLeft, ChevronRight, Activity, Star, BarChart2,
  Briefcase, Phone, Menu, X
} from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";

// --- Data ---
const recentAppointments = [
  { id: 1, client: "Ana Paula Silva", service: "Limpeza de Pele", time: "09:00", status: "confirmado", value: 180 },
  { id: 2, client: "Carlos Mendes", service: "Consulta Inicial", time: "10:30", status: "aguardando", value: 120 },
  { id: 3, client: "Fernanda Costa", service: "Botox", time: "11:00", status: "confirmado", value: 650 },
  { id: 4, client: "Roberto Lima", service: "Peeling Químico", time: "14:00", status: "cancelado", value: 280 },
  { id: 5, client: "Juliana Ramos", service: "Microagulhamento", time: "15:30", status: "confirmado", value: 420 },
  { id: 6, client: "Marcos Oliveira", service: "Preenchimento", time: "16:00", status: "aguardando", value: 800 },
];

const kpis = [
  { label: "Clientes Ativos", value: "1.247", change: "+12%", icon: Users, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  { label: "Receita do Mês", value: "R$ 51.200", change: "+21%", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { label: "Agendamentos", value: "138", change: "+8%", icon: Calendar, color: "text-accent", bg: "bg-accent/10 border-accent/20" },
  { label: "Taxa de Retorno", value: "73%", change: "+5%", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Clientes", active: false },
  { icon: Calendar, label: "Agenda", active: false },
  { icon: DollarSign, label: "Financeiro", active: false },
  { icon: FileText, label: "Relatórios", active: false },
  { icon: Briefcase, label: "Serviços", active: false },
];

const statusConfig = {
  confirmado: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10", label: "Confirmado" },
  aguardando: { icon: Clock, color: "text-accent", bg: "bg-accent/10", label: "Aguardando" },
  cancelado: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", label: "Cancelado" },
};

// Simple bar chart component (lightweight)
function SimpleBarChart() {
  const data = [
    { day: "Seg", value: 12 },
    { day: "Ter", value: 18 },
    { day: "Qua", value: 15 },
    { day: "Qui", value: 22 },
    { day: "Sex", value: 28 },
    { day: "Sáb", value: 35 },
  ];
  const maxValue = 35;

  return (
    <div className="flex items-end justify-around h-32 gap-2">
      {data.map(({ day, value }) => (
        <div key={day} className="flex flex-col items-center gap-2">
          <div className="w-8 bg-primary rounded-t" style={{ height: `${(value / maxValue) * 100}px` }} />
          <span className="text-xs text-muted-foreground">{day}</span>
        </div>
      ))}
    </div>
  );
}

// Simple pie chart component (lightweight)
function SimplePieChart() {
  const data = [
    { name: "Consultas", value: 45, color: "bg-primary" },
    { name: "Procedimentos", value: 30, color: "bg-accent" },
    { name: "Retornos", value: 15, color: "bg-green-500" },
    { name: "Avaliações", value: 10, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-3">
      {data.map(({ name, value, color }) => (
        <div key={name} className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-sm text-muted-foreground">{name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
            </div>
            <span className="text-sm font-semibold text-foreground w-8 text-right">{value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Demo Banner */}
      <div className="pt-16">
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2.5">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary font-medium">
                Demo Interativa — SaaS Dashboard para Clínicas de Estética
              </span>
            </div>
            <Link href="/">
              <span className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <ArrowLeft className="w-3 h-3" />
                Portfólio
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border
          flex flex-col transition-transform duration-300 pt-16 lg:pt-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          {/* Logo */}
          <div className="p-5 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">EstéticaPro</p>
                <p className="text-xs text-muted-foreground">Goiânia, GO</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => { setActiveNav(label); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeNav === label
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {label === "Agenda" && (
                  <span className="ml-auto w-5 h-5 bg-accent/20 text-accent text-xs rounded-full flex items-center justify-center font-bold">3</span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div className="p-3 border-t border-sidebar-border space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all">
              <Bell className="w-4 h-4" />
              Notificações
              <span className="ml-auto w-5 h-5 bg-red-500/20 text-red-400 text-xs rounded-full flex items-center justify-center font-bold">5</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all">
              <Settings className="w-4 h-4" />
              Configurações
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
                  <p className="text-xs text-muted-foreground">Quinta-feira, 19 de Fevereiro de 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-green-400 font-medium">Sistema Online</span>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map(({ label, value, change, icon: Icon, color, bg }) => (
                <div key={label} className={`p-4 rounded-xl bg-card border ${bg}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                      {change}
                    </span>
                  </div>
                  <p className="text-xl font-extrabold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Bar Chart */}
              <div className="p-5 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-foreground mb-1">Agendamentos por Dia</h3>
                <p className="text-xs text-muted-foreground mb-4">Esta semana</p>
                <SimpleBarChart />
              </div>

              {/* Pie Chart */}
              <div className="p-5 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-foreground mb-1">Tipos de Atendimento</h3>
                <p className="text-xs text-muted-foreground mb-4">Distribuição do mês</p>
                <SimplePieChart />
              </div>

              {/* Stats */}
              <div className="p-5 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-foreground mb-4">Métricas Rápidas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversão</span>
                    <span className="font-bold text-foreground">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Ticket Médio</span>
                    <span className="font-bold text-foreground">R$ 420</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Clientes Novos</span>
                    <span className="font-bold text-foreground">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Taxa Retorno</span>
                    <span className="font-bold text-foreground">73%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="p-5 bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-foreground">Agendamentos de Hoje</h3>
                  <p className="text-xs text-muted-foreground">19 de Fevereiro, 2026</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                  Ver todos <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2 overflow-y-auto max-h-64">
                {recentAppointments.map((apt) => {
                  const status = statusConfig[apt.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <div key={apt.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {apt.client.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{apt.client}</p>
                        <p className="text-xs text-muted-foreground">{apt.service}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-mono text-muted-foreground">{apt.time}</p>
                        <p className="text-xs font-semibold text-foreground">R$ {apt.value}</p>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bg} flex-shrink-0`}>
                        <StatusIcon className={`w-3 h-3 ${status.color}`} />
                        <span className={`text-xs font-medium ${status.color} hidden sm:inline`}>{status.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Demo Footer */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-start gap-3">
                <BarChart2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Demonstração — SaaS Dashboard por Pedro Andreoli</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Este painel foi construído para demonstrar capacidade técnica em sistemas de gestão. Em produção, integra com banco de dados real, autenticação, notificações em tempo real e relatórios exportáveis. Desenvolvido para clínicas de estética em Goiânia e escritórios de advocacia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
