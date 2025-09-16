const { executeQuery } = require("../../../lib/database")

export async function GET(request) {
  try {
    const query = `
      SELECT id, nombre, direccion, capacidad_maxima, activa
      FROM sucursales 
      WHERE activa = TRUE
      ORDER BY nombre
    `

    const sucursales = await executeQuery(query)

    return Response.json({
      success: true,
      data: sucursales,
    })
  } catch (error) {
    console.error("Error obteniendo sucursales:", error)
    return Response.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
