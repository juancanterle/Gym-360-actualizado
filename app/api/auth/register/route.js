import { NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function POST(request) {
  try {
    const { nombre, apellido, email, telefono, password, sucursal_id } = await request.json()

    // Verificar si el email ya existe
    const existingUser = await query("SELECT id FROM miembros WHERE email = ?", [email])

    if (existingUser.length > 0) {
      return NextResponse.json({
        success: false,
        error: "El email ya está registrado",
      })
    }

    // Encriptar contraseña con Base64
    const hashedPassword = Buffer.from(password).toString("base64")

    // Insertar nuevo miembro
    const result = await query(
      `INSERT INTO miembros (nombre, apellido, email, telefono, password, sucursal_id, estado, fecha_registro) 
       VALUES (?, ?, ?, ?, ?, ?, 'activo', NOW())`,
      [nombre, apellido, email, telefono, hashedPassword, sucursal_id],
    )

    // Crear membresía inicial
    await query(
      `INSERT INTO membresias (miembro_id, plan_id, fecha_inicio, fecha_fin, estado) 
       VALUES (?, 1, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), 'activa')`,
      [result.insertId],
    )

    const user = {
      id: result.insertId,
      nombre,
      apellido,
      email,
      tipo: "cliente",
      sucursal_id,
    }

    return NextResponse.json({
      success: true,
      user,
      redirectUrl: "/dashboard/cliente",
    })
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json({
      success: false,
      error: "Error interno del servidor",
    })
  }
}
