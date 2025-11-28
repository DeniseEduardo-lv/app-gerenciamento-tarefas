"use client";

import { Bell, Calendar, CreditCard, MessageSquare, Users, LayoutDashboard, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount: number;
  unreadMessages: number;
};

export function Navbar({ activeTab, onTabChange, notificationCount, unreadMessages }: NavbarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "appointments", label: "Agendamentos", icon: Calendar },
    { id: "comandas", label: "Comandas", icon: CreditCard },
    { id: "chat", label: "Chat", icon: MessageSquare, badge: unreadMessages },
    { id: "team", label: "Equipe", icon: Users },
    { id: "notifications", label: "Notificações", icon: Bell, badge: notificationCount },
  ];

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-purple-100 dark:border-purple-800/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between py-4 border-b border-purple-100 dark:border-purple-800/30">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Uppi
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Plano Premium - R$ 9,90/mês</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={`relative flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {item.badge > 9 ? "9+" : item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
