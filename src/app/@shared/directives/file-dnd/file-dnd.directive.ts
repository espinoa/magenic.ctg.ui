import { Directive, HostListener, Output, Input, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { FileService } from '@shared/services/file/file.service';

@Directive({
  selector: 'div.dropzone [fileDnd]'
})
export class FileDndDirective {
  @Output() fileChangeEmiter = new EventEmitter<File | File[]>();
  // List of allowable inputs
  @Input() allowedExtensions: string[];
  // Enable multiple file support
  @Input() multiple: false;

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer,
    private fileService: FileService
  ) { }

  @HostListener('window:dragover', ['$event']) onDragover(event) {
    this.setDragClass(event);
  }

  @HostListener('window:dragend', ['$event']) 
  @HostListener('window:dragleave', ['$event']) onDragendDragleave(event) {
    this.setDragClass(event, false);
  }

  @HostListener('window:drop', ['$event']) public onDrop(event) {
    this.setDragClass(event, false);
    let validFiles = this.fileService.processFile(event.dataTransfer.files, this.allowedExtensions);
    // Emit all the files when multiple file support is enable else emit single file only.
    this.multiple ? this.fileChangeEmiter.emit(validFiles) : this.fileChangeEmiter.emit(validFiles[0]);
  }

  private setDragClass(event, isDragOver = true){
    event.preventDefault();
    event.stopPropagation();
    // Set CSS class "file-drag-over" to enable styling.
    this.renderer.setElementClass(this.elementRef.nativeElement, 'file-drag-over', isDragOver);
  }

}
