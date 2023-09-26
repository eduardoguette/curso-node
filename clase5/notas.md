###### Overview

- Recursos: Cada recurso se identifica con una URL

- Verbos HTTP: Para definir las operaciones que se pueden realizar sobre un recurso
  GET, POST, PUT, DELETE

[POST]    : Crear un recurso (No es idempotente)
[GET]     : Obtener un recurso (Es idempotente)
[PUT]     : Actualizar un recurso y si no existe crearlo (Es idempotente)
[DELETE]  : Eliminar un recurso (Es idempotente)
[PATH]    : Actualizar parcialmente un recurso (Es idempotente)

- Reprensentaciones: Pueden representarse en diferentes formatos, como por ejemplo JSON, XML, HTML, Imagenes, etc

- Stateless: El cliente deberia poder decidir la representación del recurso

- Separación de conceptos: Permite que el ciente y servidor evolucionen independientemente

- Interfaz uniforme:

###### Notas:

- No todas las APIS son JSON
