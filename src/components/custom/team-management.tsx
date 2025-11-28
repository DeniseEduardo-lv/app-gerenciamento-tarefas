"use client";

import { useState } from "react";
import { Users, Plus, Trash2, UserCheck, UserX, Mail, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types";

export function TeamManagement() {
  const [employees, setEmployees] = useState<User[]>([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "" });

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.email) {
      const employee: User = {
        id: Date.now().toString(),
        name: newEmployee.name,
        email: newEmployee.email,
        role: "employee",
        createdAt: new Date(),
        active: true,
      };
      setEmployees([...employees, employee]);
      setNewEmployee({ name: "", email: "" });
    }
  };

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(employees.map((emp) => (emp.id === id ? { ...emp, active: !emp.active } : emp)));
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <Card className="border-blue-200 dark:border-blue-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Users className="w-5 h-5" />
          Gerenciamento de Equipe
        </CardTitle>
        <CardDescription>Adicione funcionários e gerencie acessos ao sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Owner Info */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Você (Proprietário)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Acesso total ao sistema</p>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">Owner</Badge>
          </div>
        </div>

        {/* Add Employee Form */}
        <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Adicionar Funcionário</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Nome completo"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            />
          </div>
          <Button onClick={addEmployee} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Funcionário
          </Button>
        </div>

        {/* Employees List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            Funcionários ({employees.length})
          </h4>
          {employees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhum funcionário cadastrado</p>
              <p className="text-sm mt-2">Adicione funcionários para dar acesso ao sistema</p>
            </div>
          ) : (
            employees.map((employee) => (
              <div
                key={employee.id}
                className={`p-4 rounded-lg border transition-all ${
                  employee.active
                    ? "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800/30"
                    : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{employee.name}</h4>
                      <Badge variant={employee.active ? "default" : "secondary"} className="text-xs">
                        {employee.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-3 h-3" />
                      {employee.email}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Adicionado em {employee.createdAt.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleEmployeeStatus(employee.id)}
                      className={employee.active ? "text-orange-500 hover:text-orange-700" : "text-green-500 hover:text-green-700"}
                    >
                      {employee.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEmployee(employee.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-1">💡 Dica:</p>
          <p>Funcionários terão acesso para gerenciar agendamentos, comandas e chat. Apenas o proprietário pode adicionar/remover funcionários.</p>
        </div>
      </CardContent>
    </Card>
  );
}
