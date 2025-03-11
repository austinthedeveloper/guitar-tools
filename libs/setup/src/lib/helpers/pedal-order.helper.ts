import { FormArray, FormGroup } from '@angular/forms';
import { PedalControlGroup } from '../interfaces';
import { PEDAL_TYPE_ORDER_MAP } from './pedal-types.helper';

export function sortPedalsByType(
  formArray: FormArray<FormGroup<PedalControlGroup>>
) {
  // Sort the controls without replacing the FormArray reference
  const sortedControls = [...formArray.controls].sort((a, b) => {
    const typeA = a.get('type')?.value as string;
    const typeB = b.get('type')?.value as string;

    return (
      (PEDAL_TYPE_ORDER_MAP[typeA] ?? Infinity) -
      (PEDAL_TYPE_ORDER_MAP[typeB] ?? Infinity)
    );
  });

  // Clear the FormArray and repopulate it with sorted controls
  while (formArray.length) {
    formArray.removeAt(0);
  }

  sortedControls.forEach((control, index) => {
    control.controls.order.patchValue(index + 1);
    formArray.push(control);
  });
}
