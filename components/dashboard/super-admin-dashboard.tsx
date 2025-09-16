"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, DollarSign, TrendingUp, Plus, Settings, Shield } from "lucide-react"
import { AdminManagement } from "./admin-management"

export function SuperAdminDashboard() {
  const [activeView, setActiveView] = useState<"dashboard" | "admins">("dashboard")

  if (activeView === "admins") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setActiveView("dashboard")}>
            ← Volver al Dashboard
          </Button>
        </div>
        <AdminManagement />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-balance">Panel de Control - Propietario</h1>
          <p className="text-muted-foreground">Gestión integral de todas las sucursales GYM360</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Sucursal
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </div>
      </div>

      {/* Métricas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sucursales</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Miembros Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$52,340</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.2%</div>
            <p className="text-xs text-muted-foreground">Crecimiento anual</p>
          </CardContent>
        </Card>
      </div>

      {/* Gestión de Sucursales */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Sucursales</CardTitle>
          <CardDescription>Administra todas las sucursales y sus administradores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                nombre: "Sucursal Centro",
                admin: "Carlos Administrador",
                miembros: 320,
                estado: "activa",
                ingresos: "$15,240",
              },
              {
                nombre: "Sucursal Norte",
                admin: "María Gestora",
                miembros: 285,
                estado: "activa",
                ingresos: "$13,850",
              },
              {
                nombre: "Sucursal Sur",
                admin: "Roberto Manager",
                miembros: 412,
                estado: "activa",
                ingresos: "$18,920",
              },
              {
                nombre: "Sucursal Este",
                admin: "Ana Coordinadora",
                miembros: 230,
                estado: "mantenimiento",
                ingresos: "$4,330",
              },
            ].map((sucursal, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Building2 className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">{sucursal.nombre}</h3>
                    <p className="text-sm text-muted-foreground">Admin: {sucursal.admin}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{sucursal.miembros}</p>
                    <p className="text-xs text-muted-foreground">Miembros</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{sucursal.ingresos}</p>
                    <p className="text-xs text-muted-foreground">Ingresos</p>
                  </div>
                  <Badge variant={sucursal.estado === "activa" ? "default" : "secondary"}>{sucursal.estado}</Badge>
                  <Button variant="outline" size="sm">
                    Gestionar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gestión de Administradores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Gestión de Administradores
          </CardTitle>
          <CardDescription>Crea y gestiona cuentas de administradores para cada sucursal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Administradores activos: 4 de 4 sucursales</p>
              <p className="text-xs text-muted-foreground mt-1">
                Desde aquí puedes crear, editar y gestionar todos los administradores del sistema
              </p>
            </div>
            <Button onClick={() => setActiveView("admins")}>
              <Shield className="h-4 w-4 mr-2" />
              Gestionar Administradores
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Administradores Recientes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { nombre: "Carlos Administrador", sucursal: "Centro", estado: "activo" },
                { nombre: "María Gestora", sucursal: "Norte", estado: "activo" },
                { nombre: "Roberto Manager", sucursal: "Sur", estado: "inactivo" },
                { nombre: "Ana Coordinadora", sucursal: "Este", estado: "activo" },
              ].map((admin, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <p className="text-sm font-medium">{admin.nombre}</p>
                    <p className="text-xs text-muted-foreground">Sucursal {admin.sucursal}</p>
                  </div>
                  <Badge variant={admin.estado === "activo" ? "default" : "secondary"} className="text-xs">
                    {admin.estado}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
