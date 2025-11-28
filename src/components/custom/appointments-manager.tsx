"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Check, X, Clock, Mail, Phone, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Appointment, Client } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

type AppointmentsManagerProps = {
  onAppointmentsChange: (appointments: Appointment[]) => void;
};

export function AppointmentsManager({ onAppointmentsChange }: AppointmentsManagerProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [newAppointment, setNewAppointment] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    service: "",
    date: "",
    time: "",
    notifyEmail: true,
    notifyWhatsapp: false,
  });

  const addAppointment = () => {
    if (newAppointment.clientName && newAppointment.service && newAppointment.date && newAppointment.time) {
      // Criar ou atualizar cliente
      const clientId = Date.now().toString();
      const client: Client = {
        id: clientId,
        name: newAppointment.clientName,
        email: newAppointment.clientEmail || undefined,
        phone: newAppointment.clientPhone || undefined,
        notificationPreferences: {
          email: newAppointment.notifyEmail,
          whatsapp: newAppointment.notifyWhatsapp,
          phone: newAppointment.clientPhone || undefined,
        },
        createdAt: new Date(),
      };

      const appointment: Appointment = {
        id: Date.now().toString(),
        clientId,
        clientName: newAppointment.clientName,
        service: newAppointment.service,
        date: newAppointment.date,
        time: newAppointment.time,
        status: "pending",
        notificationSent: false,
        createdAt: new Date(),
      };

      const updatedAppointments = [...appointments, appointment];
      setAppointments(updatedAppointments);
      setClients([...clients, client]);
      onAppointmentsChange(updatedAppointments);

      setNewAppointment({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        service: "",
        date: "",
        time: "",
        notifyEmail: true,
        notifyWhatsapp: false,
      });
    }
  };

  const updateAppointmentStatus = (id: string, status: "confirmed" | "cancelled" | "completed") => {
    const updatedAppointments = appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt));
    setAppointments(updatedAppointments);
    onAppointmentsChange(updatedAppointments);
  };

  const getClient = (clientId: string) => {
    return clients.find((c) => c.id === clientId);
  };

  return (
    <Card className="border-blue-200 dark:border-blue-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <CalendarIcon className="w-5 h-5" />
          Agendamentos
        </CardTitle>
        <CardDescription>Gerencie agendamentos com notificações automáticas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Appointment Form */}
        <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Novo Agendamento</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Nome do cliente"
              value={newAppointment.clientName}
              onChange={(e) => setNewAppointment({ ...newAppointment, clientName: e.target.value })}
            />
            <Input
              placeholder="Serviço"
              value={newAppointment.service}
              onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email (opcional)"
              value={newAppointment.clientEmail}
              onChange={(e) => setNewAppointment({ ...newAppointment, clientEmail: e.target.value })}
            />
            <Input
              type="tel"
              placeholder="WhatsApp (opcional)"
              value={newAppointment.clientPhone}
              onChange={(e) => setNewAppointment({ ...newAppointment, clientPhone: e.target.value })}
            />
            <Input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            />
            <Input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            />
          </div>

          {/* Notification Preferences */}
          <div className="space-y-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notificar cliente por:</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="notify-email"
                  checked={newAppointment.notifyEmail}
                  onCheckedChange={(checked) =>
                    setNewAppointment({ ...newAppointment, notifyEmail: checked as boolean })
                  }
                />
                <label htmlFor="notify-email" className="text-sm flex items-center gap-1 cursor-pointer">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="notify-whatsapp"
                  checked={newAppointment.notifyWhatsapp}
                  onCheckedChange={(checked) =>
                    setNewAppointment({ ...newAppointment, notifyWhatsapp: checked as boolean })
                  }
                />
                <label htmlFor="notify-whatsapp" className="text-sm flex items-center gap-1 cursor-pointer">
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </label>
              </div>
            </div>
          </div>

          <Button onClick={addAppointment} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Agendamento
          </Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {appointments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhum agendamento ainda</p>
              <p className="text-sm mt-2">Cliente será notificado 30 minutos antes do horário</p>
            </div>
          ) : (
            appointments.map((apt) => {
              const client = getClient(apt.clientId);
              return (
                <div
                  key={apt.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{apt.clientName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{apt.service}</p>
                      {client && (
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          {client.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {client.email}
                            </span>
                          )}
                          {client.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {client.phone}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <Badge
                      className={
                        apt.status === "confirmed"
                          ? "bg-green-500"
                          : apt.status === "cancelled"
                          ? "bg-red-500"
                          : apt.status === "completed"
                          ? "bg-purple-500"
                          : "bg-yellow-500"
                      }
                    >
                      {apt.status === "confirmed"
                        ? "Confirmado"
                        : apt.status === "cancelled"
                        ? "Cancelado"
                        : apt.status === "completed"
                        ? "Concluído"
                        : "Pendente"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(apt.date).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {apt.time}
                    </span>
                    {client && (client.notificationPreferences.email || client.notificationPreferences.whatsapp) && (
                      <span className="flex items-center gap-1 text-purple-600">
                        <Bell className="w-4 h-4" />
                        Notificação ativa
                      </span>
                    )}
                  </div>
                  {apt.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateAppointmentStatus(apt.id, "confirmed")}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Confirmar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAppointmentStatus(apt.id, "cancelled")}
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                  {apt.status === "confirmed" && (
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(apt.id, "completed")}
                      className="w-full bg-purple-500 hover:bg-purple-600"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Marcar como Concluído
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
