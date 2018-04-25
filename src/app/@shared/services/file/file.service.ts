import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

  constructor() { }

  processFile(files: File[], allowedExtensions: string[]): File[]{
    let validFiles: File[] = [];
    
    if (files.length > 0) {
      allowedExtensions = allowedExtensions.map(x => x.replace('.',''));
    
      for (let file of files) {
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        if (allowedExtensions.lastIndexOf(ext) != -1) {
          validFiles.push(file);
        }
      }
    }
    return validFiles;
  }
}
