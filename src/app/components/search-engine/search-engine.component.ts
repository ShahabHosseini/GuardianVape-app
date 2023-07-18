import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Sections {
  [key: string]: boolean;
}

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss'],
})
export class SearchEngineComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  form: FormGroup;
  sections: Sections = {
    searchEngineListing: false,
  };

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      pageTitle: [''],
      metaDescription: [''],
      urlHandle: [''],
    });
  }

  ngOnInit(): void {}

  toggleSection(section: string): void {
    this.sections[section] = !this.sections[section];
  }
}
