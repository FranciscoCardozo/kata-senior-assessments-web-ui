import { ArtifactFormat } from '../enums/artifactFormat.enum';
import { SourceType } from '../enums/sourceType.enum';

/** Cuerpo HTTP crudo que recibe la Lambda invocadora. */
export interface AnalysisRequestBody {
  sourceType?: SourceType | string;
  // Modo GIT
  repoUrl?: string;
  // Modo UPLOAD
  /** Ruta del artefacto ya guardado: s3://bucket/key o una ruta de volumen del ECS. */
  artifactPath?: string;
  artifactFormat?: ArtifactFormat | string;
}
