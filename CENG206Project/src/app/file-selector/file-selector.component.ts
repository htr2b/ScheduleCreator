import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrl: './file-selector.component.css'
})
export class FileSelectorComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Input() buttonText: string = "Select a CSV file";
  @Input() buttonColor: string = "primary";

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileSelected.emit(file);
  }
}
