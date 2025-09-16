import { NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function POST(request) {
  try {
    const { nombre, apellido, email, telefono, password, sucursal_id } = await request.json()

    console.log("[v0] Datos recibidos para registro:", { nombre, apellido, email, sucursal_id })

    if (!sucursal_id) {
      return NextResponse.json({
        success: false,
        error: "Debe seleccionar una sucursal",
      })
    }

    // Verificar si el email ya existe en miembros
    const existingUser = await query("SELECT id FROM miembros WHERE email = ?", [email])
    if (existingUser.length > 0) {
      return NextResponse.json({
        success: false,
        error: "El email ya está registrado",
      })
    }

    // Verificar que la sucursal exista y esté activa
    const sucursalExists = await query("SELECT id, nombre FROM sucursales WHERE id = ? AND activa = TRUE", [
      sucursal_id,
    ])
    if (sucursalExists.length === 0) {
      return NextResponse.json({
        success: false,
        error: "La sucursal seleccionada no está disponible",
      })
    }

    console.log("[v0] Insertando nuevo miembro...")

    // Insertar nuevo miembro
    const result = await query(
      `INSERT INTO miembros (nombre, apellido, email, telefono, fecha_registro, activo, sucursal_id) 
       VALUES (?, ?, ?, ?, NOW(), TRUE, ?)`,
      [nombre, apellido, email, telefono, sucursal_id],
    )

    const nuevoMiembroId = result.insertId
    console.log("[v0] Miembro insertado con ID:", nuevoMiembroId)

    // Encriptar contraseña con Base64
    const passwordHash = Buffer.from(password).toString("base64")

    // Guardar usuario de login en usuarios_miembros
    await query(
      `INSERT INTO usuarios_miembros (miembro_id, email, password_hash) VALUES (?, ?, ?)`,
      [nuevoMiembroId, email, passwordHash],
    )

    // Crear membresía inicial
    await query(
      `INSERT INTO membresias (miembro_id, plan_id, fecha_inicio, fecha_fin, estado) 
       VALUES (?, 1, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), 'activa')`,
      [nuevoMiembroId],
    )

    const user = {
      id: nuevoMiembroId,
      nombre,
      apellido,
      email,
      tipo: "cliente",
      sucursal_id,
      sucursal_nombre: sucursalExists[0].nombre,
    }

    console.log("[v0] Registro exitoso para usuario:", user.email)

    return NextResponse.json({
      success: true,
      user,
      redirectUrl: "/dashboard/cliente",
    })
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json({
      success: false,
      error: "Error interno del servidor: " + error.message,
    })
  }
}
