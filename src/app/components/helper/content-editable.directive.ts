import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableDirective),
      multi: true,
    },
  ],
})
export class ContentEditableDirective implements ControlValueAccessor {
  @Input() contenteditable = true;

  constructor(private elementRef: ElementRef) {}

  private onChange: (value: string) => void = () => {};

  @HostListener('input')
  onInput(): void {
    const value = this.elementRef.nativeElement.innerHTML;
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.elementRef.nativeElement.innerHTML = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {}

  setDisabledState(isDisabled: boolean): void {
    this.contenteditable = !isDisabled;
  }

  formatBlock(tag: string): void {
    document.execCommand('formatBlock', false, tag);
  }

  executeCommand(command: string): void {
    document.execCommand(command, false);
  }

  getContent(): string {
    return this.elementRef.nativeElement.innerHTML;
  }
}
