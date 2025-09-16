"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Calendar, AlertTriangle } from "lucide-react"

export function AdminSucursalDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard - Sucursal Centro</h1>
        <p className="text-muted-foreground">Gestión y métricas de tu sucursal</p>
      </div>

      {/* Métricas de Sucursal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Miembros Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> nuevos esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,240</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clases Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600">2</span> con alta ocupación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">3</span> vencidos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ocupación de Clases */}
      <Card>
        <CardHeader>
          <CardTitle>Ocupación de Clases - Hoy</CardTitle>
          <CardDescription>Estado actual de las clases programadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { clase: "Yoga Matutino", hora: "08:00", ocupacion: 15, capacidad: 20, estado: "verde" },
              { clase: "CrossFit", hora: "18:00", ocupacion: 12, capacidad: 15, estado: "amarillo" },
              { clase: "Pilates", hora: "10:00", ocupacion: 18, capacidad: 18, estado: "rojo" },
              { clase: "Spinning", hora: "19:00", ocupacion: 22, capacidad: 25, estado: "amarillo" },
            ].map((clase, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      clase.estado === "verde"
                        ? "bg-green-500"
                        : clase.estado === "amarillo"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <div>
                    <h4 className="font-medium">{clase.clase}</h4>
                    <p className="text-sm text-muted-foreground">{clase.hora}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {clase.ocupacion}/{clase.capacidad}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((clase.ocupacion / clase.capacidad) * 100)}% ocupación
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
