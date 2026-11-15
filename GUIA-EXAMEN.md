# 🎓 GUÍA DE EXAMEN - Second Life Energy
**Alumno:** Sebastián Martínez Salazar · **2º DAW-T · Tarde**
**Profe:** Alberto Merino (Tiburcio) · **IES La Guncha**

---

## ⚡ 1. ARRANCAR EL ENTORNO (5 min)

```bash
# Desde la raíz del proyecto
git clone https://github.com/albertomerino3/second-life-energy.git
cd second-life-energy/backend
git checkout -b examen develop

npm install

# Verificar .env.development (ya existe en el repo)
cat .env.development
# DB_NAME=db_second_life_energy
# DB_PASSWORD=examen

# Crear BD en pgAdmin si no existe (nombre: db_second_life_energy)
# Ejecutar migraciones y seeders
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all

# Arrancar servidor
npm run dev
# → Server running at http://localhost:3000


🏗️ 2. ESTRUCTURA DE ARCHIVOS PARA UNA ENTIDAD
Para crear una entidad nueva (ej: Componente) hay que tocar 7 archivos:
#
Archivo
Ruta
1
Migración
database/migrations/20261116000001-create-componentes.js
2
Seeder
database/seeders/20261116000001-seed-componentes.js
3
Modelo
src/models/componente.ts
4
Controlador
src/controllers/componenteController.ts
5
Rutas
src/routes/componenteRoutes.ts
6
Registrar modelo
src/models/index.ts
7
Registrar rutas
src/app.ts


🧱 3. PLANTILLA COMPLETA: CREAR ENTIDAD "COMPONENTE"
3.1 Migración (database/migrations/20261116000001-create-componentes.js)


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('componentes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      descripcion: { type: Sequelize.TEXT, allowNull: true },
      precio: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      unidad: { type: Sequelize.STRING(20), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('componentes');
  }
};


3.2 Modelo (src/models/componente.ts)


import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Componente extends Model {
  declare id: number;
  declare nombre: string;
  declare descripcion?: string;
  declare precio: number;
  declare stock: number;
  declare unidad?: string;
}

Componente.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  precio: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  unidad: { type: DataTypes.STRING(20), allowNull: true }
}, { sequelize, modelName: 'Componente', tableName: 'componentes', timestamps: true });

// Asociación: Un Componente pertenece a muchos Kits (N:N con tabla intermedia kit_components)

3.3 Seeder (database/seeders/20261116000001-seed-componentes.js)

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('componentes', [
      { nombre: 'Resistencia 220Ω', precio: 0.10, stock: 500, unidad: 'unidad', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'LED rojo 5mm', precio: 0.25, stock: 300, unidad: 'unidad', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Protoboard 830 puntos', precio: 4.50, stock: 50, unidad: 'unidad', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('componentes', null, {});
  }
};

3.4 Controlador (src/controllers/componenteController.ts)

import { Request, Response } from 'express';
import { Componente } from '../models/componente';
import { Op } from 'sequelize';

export const getAll = async (req: Request, res: Response) => {
  try {
    const componentes = await Componente.findAll();
    res.json(componentes);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const getById = async (req: Request, res: Response) => {
  const comp = await Componente.findByPk(req.params.id);
  if (!comp) return res.status(404).json({ error: 'No encontrado' });
  res.json(comp);
};

export const create = async (req: Request, res: Response) => {
  try {
    const nuevo = await Componente.create(req.body);
    res.status(201).json(nuevo);
  } catch (e: any) { res.status(400).json({ error: e.message }); }
};

export const update = async (req: Request, res: Response) => {
  const [afectados] = await Componente.update(req.body, { where: { id: req.params.id } });
  if (!afectados) return res.status(404).json({ error: 'No encontrado' });
  res.json(await Componente.findByPk(req.params.id));
};

export const remove = async (req: Request, res: Response) => {
  const borrado = await Componente.destroy({ where: { id: req.params.id } });
  if (!borrado) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Eliminado correctamente' });
};

// Consulta con operador: componentes baratos (< 1€)
export const getBaratos = async (req: Request, res: Response) => {
  const comp = await Componente.findAll({ where: { precio: { [Op.lt]: 1 } } });
  res.json(comp);
};

3.5 Rutas (src/routes/componenteRoutes.ts)

import { Router } from 'express';
import * as ctrl from '../controllers/componenteController';
const router = Router();

router.get('/', ctrl.getAll);
router.get('/baratos', ctrl.getBaratos);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;

3.6 Registrar en src/models/index.ts

import { Componente } from './componente';
export { Componente };

3.7 Registrar en src/app.ts

import componenteRoutes from './routes/componenteRoutes';
app.use('/api/componentes', componenteRoutes);

3.8 Ejecutar migración + seeder

./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all

🔍 4. LOS 5 TIPOS DE CONSULTAS QUE PIDE TIBURCIO
✅ Punto 1: Crear entidad (ya visto arriba)
✅ Punto 2: CRUD completo (ya visto arriba)
✅ Punto 3: Consulta con INCLUDE (relación)

// Obtener todos los ARTÍCULOS incluyendo su CATEGORÍA
import { Article, ArticleCategory } from '../models';

export const getAllConCategoria = async (req, res) => {
  const articles = await Article.findAll({
    include: [{
      model: ArticleCategory,
      as: 'category',
      attributes: ['id', 'name']
    }]
  });
  res.json(articles);
};

✅ Punto 4: Consulta con OPERADORES [Op]

import { Op } from 'sequelize';

// Menor que
where: { precio: { [Op.lt]: 40 } }

// Mayor que
where: { stock: { [Op.gt]: 5 } }

// Entre
where: { precio: { [Op.between]: [10, 50] } }

// Like (contiene)
where: { nombre: { [Op.like]: '%Arduino%' } }

// AND múltiple
where: {
  precio: { [Op.lt]: 50 },
  stock: { [Op.gt]: 0 },
  status: 'published'
}
✅ Punto 5: Consulta COMPLEJA (filtrar por campo de tabla relacionada)

// Kits de la categoría "electrónica básica" con precio < 40€
export const getKitsFiltrados = async (req, res) => {
  const kits = await Article.findAll({
    include: [{
      model: ArticleCategory,
      as: 'category',
      where: { name: 'Kits de electrónica básica' }
    }],
    where: {
      price: { [Op.lt]: 40 },
      status: 'published'
    }
  });
  res.json(kits);
};

🦉 5. CÓMO PROBAR EN BRUNO (PASO A PASO)
5.1 Abrir BRUNO y crear colección
Abrir Bruno → Create Collection → nombre: Examen-Sebastian → guardar en docs/screenshots/
5.2 Crear cada request
Clic en + Add request
Poner nombre (ej: GET Componentes)
Seleccionar método (GET/POST/PUT/DELETE)
URL: http://localhost:3000/api/componentes
Clic Send (naranja)

5.3 Tabla de requests para el examen
Método
URL
Body (JSON)
Qué comprobar
GET
/api/componentes
—
Lista completa en JSON
GET
/api/componentes/1
—
Un solo componente
GET
/api/componentes/baratos
—
Solo precio < 1€
POST
/api/componentes
{"nombre":"Resistor 1k","precio":0.15,"stock":100}
Status 201
PUT
/api/componentes/1
{"precio":0.20}
Status 200 + valor actualizado
DELETE
/api/componentes/1
—
Status 200 + men

5.4 Para POST/PUT (body JSON)
Pestaña Body → tipo JSON
Pegar el JSON en el textarea
Send
5.5 Capturas obligatorias
Pulsa Win + Shift + S → recorta la respuesta de Bruno (donde se ve el 200 OK y el JSON)
Guardar en: docs/screenshots/01-get-componentes.png, 02-post.png, etc.

🩺 6. TROUBLESHOOTING RÁPIDO
Error
Causa
Solución
password authentication failed
Contraseña mal
DB_PASSWORD=examen en .env.development
database does not exist
No creaste BD
pgAdmin → Create Database → db_second_life_energy
ENOENT: migrations
Falta .sequelizerc
Debe apuntar a database/migrations
port 3000 in use
Servidor duplicado
Cierra el otro o cambia PORT=3001
Cannot find module
No instalaste
npm install
404 en Bruno
Ruta no registrada
Revisa app.ts → app.use('/api/xxx', routes)

✅ 7. CHECKLIST DEL DÍA DEL EXAMEN
Clonar repo y git checkout -b examen develop
npm install
Verificar .env.development
Crear BD en pgAdmin si hace falta
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
npm run dev
Crear entidad pedida (7 archivos)
CRUD funcionando
Consultas include + Op
Probar TODO en Bruno
Capturas en docs/screenshots/
git add . && git commit -m "Examen terminado" && git push origin examen
