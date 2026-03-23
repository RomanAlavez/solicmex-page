export default function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")          // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/\s+/g, "-")      // reemplaza espacios por guiones
    .replace(/[^\w-]+/g, "");  // elimina caracteres especiales
}
