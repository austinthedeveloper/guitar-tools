import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AiSettingsResponse, AiSuggestionPayload } from '@guitar/interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AiSuggestionsService } from '../../services';

@Component({
  selector: 'lib-ai-settings-modal',
  templateUrl: './ai-settings-modal.component.html',
  styleUrl: './ai-settings-modal.component.scss',
})
export class AiSettingsModalComponent {
  @Input() amp!: string;
  @Input() pedals!: string[];
  @Input() genreOptions: string[] = [];
  @Input() pickups: string[] = ['Single Coil', 'Humbucker'];

  @Output() settingsApplied = new EventEmitter<AiSettingsResponse>();

  form: FormGroup;
  aiResponse: AiSettingsResponse | null = null;
  isLoading = false;
  errorMessage = '';
  private aiSuggestionsService = inject(AiSuggestionsService);

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.form = this.fb.group({
      pickup: ['Single Coil', Validators.required],
      genre: ['Blues', Validators.required],
      referenceTone: [''],
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const requestBody: AiSuggestionPayload = {
      amp: this.amp,
      pedals: this.pedals,
      genre: this.form.value.genre,
      pickup: this.form.value.pickup,
      referenceTone: this.form.value.referenceTone || undefined,
    };

    this.aiSuggestionsService.fetchSettings(requestBody).subscribe({
      next: (response) => {
        this.aiResponse = response;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to get AI suggestions. Please try again.';
        this.isLoading = false;
      },
    });
  }

  applySettings() {
    if (!this.aiResponse) return;
    this.settingsApplied.emit(this.aiResponse);
    this.activeModal.close();
  }
}
