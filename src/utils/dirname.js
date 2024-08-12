
import { fileURLToPath } from "url";
import { dirname } from "path";

// Obtener la URL del módulo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Exportar __dirname
export default __dirname