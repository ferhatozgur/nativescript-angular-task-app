import { Directive, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { registerElement } from '@nativescript/angular';

registerElement('Picker', () => require('@nativescript/core').Picker);

@Directive({
  selector: 'Picker[ngModel], Picker[formControlName], picker[ngModel], picker[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickerValueAccessor),
      multi: true,
    },
  ],
})
export class PickerValueAccessor implements ControlValueAccessor {
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  constructor(private elementRef: ElementRef) {
    const picker: any = elementRef.nativeElement;

    picker.on('selectedIndexChange', (event: any) => {
      const selectedIndex = event.value;
      const items = picker.items;
      this.onChangeCallback(items[selectedIndex]);
    });
  }

  writeValue(value: any): void {
    const picker: any = this.elementRef.nativeElement;
    const index = picker.items.indexOf(value);
    picker.selectedIndex = index >= 0 ? index : 0;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    const picker: any = this.elementRef.nativeElement;
    picker.isEnabled = !isDisabled;
  }
}
