import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { Payload } from '@interfaces/payload';
import { form } from './form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form = form as FormGroup;
  formInitial = _.cloneDeep(this.form) as FormGroup;

  @Output() payloadChangeEvent = new EventEmitter<Payload>();
  @Output() clearFormEvent = new EventEmitter();

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.checkPayloadSchema()
  }

  /**
   * Test input payload against scheme
   * If fail: display toast alert message
   */
  checkPayloadSchema() {
    try {
      const payloadJSON = JSON.parse(this.form.get('payload')?.value) as Payload;
      this.payloadChangeEvent.emit(payloadJSON);
    } catch (error) {
      this.toastr.error('The supplied payload does not match the required schema.', 'Parse error!');
    }
  }

  clearForm() {
    this.form.reset(this.formInitial.value, { emitEvent: false });
    this.clearFormEvent.emit();
  }

}
