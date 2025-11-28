"use client";

import { useState } from "react";
import { BarChart3, Calendar, CreditCard, DollarSign, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/custom/navbar";
import { NotificationsPanel } from "@/components/custom/notifications-panel";
import { TeamManagement } from "@/components/custom/team-management";
import { Comandas } from "@/components/custom/comandas";
import { Chat } from "@/components/custom/chat";
import { AppointmentsManager } from "@/components/custom/appointments-manager";
import { Appointment } from "@/lib/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Estatísticas do Dashboard
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter((a) => a.status === "confirmed").length;
  const completedAppointments = appointments.filter((a) => a.status === "completed").length;
  const pendingAppointments = appointments.filter((a) => a.status === "pending").length;

  // Notificações não lidas (simulado)
  const notificationCount = 3;
  const unreadMessages = 2;

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-purple-200 dark:border-purple-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalAppointments}</p>
                      <p className="text-xs text-gray-500 mt-1">Todos os períodos</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{confirmedAppointments}</p>
                      <p className="text-xs text-gray-500 mt-1">Aguardando atendimento</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">{completedAppointments}</p>
                      <p className="text-xs text-gray-500 mt-1">Atendimentos finalizados</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 dark:border-yellow-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-yellow-600">{pendingAppointments}</p>
                      <p className="text-xs text-gray-500 mt-1">Aguardando confirmação</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Informações do Plano */}
            <Card className="border-purple-200 dark:border-purple-800/30 shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Plano Premium Ativo
                </CardTitle>
                <CardDescription className="text-white/80">
                  Aproveite todos os recursos do Uppi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm opacity-90">Valor Mensal</p>
                    <p className="text-2xl font-bold">R$ 9,90</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm opacity-90">Próximo Pagamento</p>
                    <p className="text-lg font-semibold">15/02/2025</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm opacity-90">Status</p>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Ativo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recursos Disponíveis */}
            <Card className="border-blue-200 dark:border-blue-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-400">Recursos Disponíveis</CardTitle>
                <CardDescription>Tudo que você pode fazer com o Uppi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Agendamentos</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Gerencie horários com notificações automáticas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Comandas</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Controle de vendas e pagamentos integrados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                    <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Equipe</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Adicione funcionários e gerencie acessos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Sincronização</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Integração com Google Calendar e Outlook</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg">
                    <DollarSign className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Notificações</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avisos por email e WhatsApp para clientes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Chat Interno</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Comunicação em tempo real com a equipe</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "appointments":
        return <AppointmentsManager onAppointmentsChange={setAppointments} />;

      case "comandas":
        return <Comandas />;

      case "chat":
        return <Chat />;

      case "team":
        return <TeamManagement />;

      case "notifications":
        return <NotificationsPanel appointments={appointments} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={notificationCount}
        unreadMessages={unreadMessages}
      />

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="mt-12 py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-purple-100 dark:border-purple-800/30">
        <p>Uppi - Transforme seu atendimento com tecnologia 🚀</p>
        <p className="text-xs mt-1">Plano Premium - R$ 9,90/mês</p>
      </footer>
    </div>
  );
}
