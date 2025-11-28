"use client";

import { useState, useEffect } from "react";
import { Bell, Clock, CreditCard, Calendar, X, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Notification, Appointment } from "@/lib/types";

type NotificationsPanelProps = {
  appointments: Appointment[];
};

export function NotificationsPanel({ appointments }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Verificar agendamentos próximos (30 minutos antes)
  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const now = new Date();
      const upcomingNotifications: Notification[] = [];

      appointments.forEach((apt) => {
        if (apt.status === "confirmed" && !apt.notificationSent) {
          const [hours, minutes] = apt.time.split(":").map(Number);
          const appointmentDate = new Date(apt.date);
          appointmentDate.setHours(hours, minutes, 0);

          const timeDiff = appointmentDate.getTime() - now.getTime();
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));

          // Notificar 30 minutos antes
          if (minutesDiff <= 30 && minutesDiff > 0) {
            upcomingNotifications.push({
              id: `apt-${apt.id}`,
              type: "appointment",
              title: "Atendimento Próximo!",
              message: `${apt.clientName} - ${apt.service} em ${minutesDiff} minutos`,
              timestamp: now,
              read: false,
              appointmentId: apt.id,
            });
          }
        }
      });

      if (upcomingNotifications.length > 0) {
        setNotifications((prev) => [...upcomingNotifications, ...prev]);
      }
    };

    // Verificar a cada minuto
    const interval = setInterval(checkUpcomingAppointments, 60000);
    checkUpcomingAppointments(); // Verificar imediatamente

    return () => clearInterval(interval);
  }, [appointments]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case "payment":
        return <CreditCard className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <Card className="border-purple-200 dark:border-purple-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
            <CardDescription>Alertas e lembretes importantes</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-red-500">
              {unreadCount} {unreadCount === 1 ? "nova" : "novas"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhuma notificação no momento</p>
            <p className="text-sm mt-2">Você será notificado 30 minutos antes dos atendimentos</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all ${
                notification.read
                  ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  : "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</h4>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => markAsRead(notification.id)}>
                          <Check className="w-4 h-4 text-green-500" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteNotification(notification.id)}>
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3" />
                    {notification.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
