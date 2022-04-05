import { FormBuilder, Validators } from '@angular/forms';

const formBuilder = new FormBuilder();

export const form = formBuilder.group({
  payload: ['', [Validators.required]],
});