### Setup del ambiente de desarrollo

```bash
git clone https://github.com/DPLATA/react_game_app_backend.git
cd react_game_app_backend
npm i
npm run dev
```

### Git workflow

Flujo de trabajo para control de versiones del equipo.

| Tipo de rama | Descripción |
| ------------- | ------------- |
| main  | Rama de despliegues a producción  |
| develop  | Rama de despliegues para ambiente de testing. Acá solo van releases.  |
| feature  | Toda feature sale desde develop y hace merge con develop. En estas ramas se desarrollan features de la aplicación.  |

### Comandos soportados por el proyecto

Para correr estos comandos debes estar en una terminal situada en el directorio raíz del proyecto:


#### Para correr las pruebas

```bash
npm run test
```

#### Para empezar el servidor de desarrollo

```bash
npm run dev
```