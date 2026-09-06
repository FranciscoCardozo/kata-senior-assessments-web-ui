export enum SourceType {
  /** El repositorio se clona más adelante dentro del ECS. */
  GIT = 'GIT',
  /** El archivo ya fue subido manualmente y guardado en un storage accesible por el ECS. */
  UPLOAD = 'UPLOAD'
}
