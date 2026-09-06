import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  /**
   * Sube el archivo al bucket con el enlace prefirmado (PUT).
   * Los headers deben ser exactamente los que devolvió getUploadUrl, o la
   * firma no coincide y S3 responde 403.
   */
  async uploadSourceCode(
    url: string,
    file: File,
    headers: Record<string, string>
  ): Promise<void> {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: file
    });

    if (!response.ok) {
      throw new Error(`No se pudo subir el archivo al bucket (${response.status}).`);
    }
  }
}
