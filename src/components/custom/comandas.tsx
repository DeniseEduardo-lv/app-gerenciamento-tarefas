"use client";

import { useState } from "react";
import { CreditCard, Plus, Trash2, DollarSign, Check, X, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Comanda, ComandaItem } from "@/lib/types";

export function Comandas() {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [activeComanda, setActiveComanda] = useState<Comanda | null>(null);
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: "1",
    unitPrice: "",
  });

  const createComanda = (clientName: string) => {
    const comanda: Comanda = {
      id: Date.now().toString(),
      clientId: Date.now().toString(),
      clientName,
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      status: "open",
      createdAt: new Date(),
    };
    setComandas([...comandas, comanda]);
    setActiveComanda(comanda);
  };

  const addItemToComanda = () => {
    if (!activeComanda || !newItem.description || !newItem.unitPrice) return;

    const quantity = parseInt(newItem.quantity);
    const unitPrice = parseFloat(newItem.unitPrice);
    const item: ComandaItem = {
      id: Date.now().toString(),
      description: newItem.description,
      quantity,
      unitPrice,
      total: quantity * unitPrice,
    };

    const updatedComanda = {
      ...activeComanda,
      items: [...activeComanda.items, item],
    };

    updatedComanda.subtotal = updatedComanda.items.reduce((sum, i) => sum + i.total, 0);
    updatedComanda.total = updatedComanda.subtotal - updatedComanda.discount;

    setComandas(comandas.map((c) => (c.id === activeComanda.id ? updatedComanda : c)));
    setActiveComanda(updatedComanda);
    setNewItem({ description: "", quantity: "1", unitPrice: "" });
  };

  const removeItem = (itemId: string) => {
    if (!activeComanda) return;

    const updatedComanda = {
      ...activeComanda,
      items: activeComanda.items.filter((i) => i.id !== itemId),
    };

    updatedComanda.subtotal = updatedComanda.items.reduce((sum, i) => sum + i.total, 0);
    updatedComanda.total = updatedComanda.subtotal - updatedComanda.discount;

    setComandas(comandas.map((c) => (c.id === activeComanda.id ? updatedComanda : c)));
    setActiveComanda(updatedComanda);
  };

  const closeComanda = (paymentMethod: "pix" | "card" | "cash") => {
    if (!activeComanda) return;

    const updatedComanda = {
      ...activeComanda,
      status: "paid" as const,
      paymentMethod,
      closedAt: new Date(),
    };

    setComandas(comandas.map((c) => (c.id === activeComanda.id ? updatedComanda : c)));
    setActiveComanda(null);
  };

  const [newClientName, setNewClientName] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Comanda Ativa */}
      <Card className="border-green-200 dark:border-green-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <ShoppingCart className="w-5 h-5" />
            Comanda Ativa
          </CardTitle>
          <CardDescription>Adicione itens e finalize o pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!activeComanda ? (
            <div className="space-y-3">
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Nenhuma comanda ativa</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Nome do cliente"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (newClientName.trim()) {
                      createComanda(newClientName);
                      setNewClientName("");
                    }
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cliente Info */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800/30">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{activeComanda.clientName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comanda #{activeComanda.id.slice(-6)}
                </p>
              </div>

              {/* Add Item Form */}
              <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Adicionar Item</h4>
                <Input
                  placeholder="Descrição do item"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Qtd"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    min="1"
                  />
                  <Input
                    type="number"
                    placeholder="Preço (R$)"
                    value={newItem.unitPrice}
                    onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
                    step="0.01"
                  />
                </div>
                <Button onClick={addItemToComanda} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {activeComanda.items.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Nenhum item adicionado</p>
                ) : (
                  activeComanda.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{item.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.quantity}x R$ {item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-green-600">
                          R$ {item.total.toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total */}
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal:</span>
                  <span className="font-semibold">R$ {activeComanda.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span>Desconto:</span>
                  <span className="font-semibold">R$ {activeComanda.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold border-t border-white/30 pt-3">
                  <span>Total:</span>
                  <span>R$ {activeComanda.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Buttons */}
              {activeComanda.items.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Finalizar Pagamento:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => closeComanda("pix")}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                    >
                      PIX
                    </Button>
                    <Button
                      onClick={() => closeComanda("card")}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      Cartão
                    </Button>
                    <Button
                      onClick={() => closeComanda("cash")}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      Dinheiro
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Histórico de Comandas */}
      <Card className="border-purple-200 dark:border-purple-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
            <CreditCard className="w-5 h-5" />
            Histórico de Comandas
          </CardTitle>
          <CardDescription>Comandas finalizadas e pagas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {comandas.filter((c) => c.status === "paid").length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhuma comanda finalizada ainda</p>
            </div>
          ) : (
            comandas
              .filter((c) => c.status === "paid")
              .reverse()
              .map((comanda) => (
                <div
                  key={comanda.id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{comanda.clientName}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {comanda.items.length} {comanda.items.length === 1 ? "item" : "itens"}
                      </p>
                    </div>
                    <Badge className="bg-green-500">
                      {comanda.paymentMethod === "pix" ? "PIX" : comanda.paymentMethod === "card" ? "Cartão" : "Dinheiro"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {comanda.closedAt?.toLocaleString("pt-BR")}
                    </span>
                    <span className="font-bold text-green-600">R$ {comanda.total.toFixed(2)}</span>
                  </div>
                </div>
              ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
