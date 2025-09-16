"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, Clock, MapPin } from "lucide-react"

export function ClienteDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Mi Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido Pedro González - Miembro GYM001</p>
      </div>

      {/* Estado de Membresía */}
      <Card>
        <CardHeader>
          <CardTitle>Mi Membresía</CardTitle>
          <CardDescription>Estado actual de tu plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="default">Plan Premium</Badge>
                <Badge variant="outline">Activa</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Válida hasta: 31 de Diciembre, 2024</p>
              <p className="text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 inline mr-1" />
                Sucursal Centro
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">$49.99</p>
              <p className="text-sm text-muted-foreground">Mensual</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mis Reservas */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Próximas Clases</CardTitle>
          <CardDescription>Clases reservadas para esta semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { clase: "Yoga Matutino", fecha: "Hoy", hora: "08:00", entrenador: "María García", estado: "confirmada" },
              { clase: "CrossFit", fecha: "Mañana", hora: "18:00", entrenador: "Juan Pérez", estado: "confirmada" },
              {
                clase: "Pilates",
                fecha: "Miércoles",
                hora: "10:00",
                entrenador: "María García",
                estado: "en_lista_espera",
              },
            ].map((reserva, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">{reserva.clase}</h4>
                    <p className="text-sm text-muted-foreground">
                      {reserva.fecha} - {reserva.hora} | {reserva.entrenador}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={reserva.estado === "confirmada" ? "default" : "secondary"}>
                    {reserva.estado === "confirmada" ? "Confirmada" : "Lista de Espera"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Cancelar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Reservar Nueva Clase
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estado de Pagos */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Pagos</CardTitle>
          <CardDescription>Historial y próximos vencimientos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { fecha: "01/01/2024", monto: "$49.99", estado: "pagado", metodo: "Tarjeta" },
              { fecha: "01/02/2024", monto: "$49.99", estado: "pagado", metodo: "Tarjeta" },
              { fecha: "01/03/2024", monto: "$49.99", estado: "pendiente", metodo: "Tarjeta" },
            ].map((pago, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{pago.fecha}</h4>
                    <p className="text-sm text-muted-foreground">{pago.metodo}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{pago.monto}</span>
                  <Badge variant={pago.estado === "pagado" ? "default" : "destructive"}>
                    {pago.estado === "pagado" ? "Pagado" : "Pendiente"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mi Actividad */}
      <Card>
        <CardHeader>
          <CardTitle>Mi Actividad</CardTitle>
          <CardDescription>Resumen de asistencias este mes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Visitas este mes</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Clases asistidas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
