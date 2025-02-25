import { ChangeDetectionStrategy, Component, OnInit, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filters',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatSliderModule,
    MatCardModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

  myControl = new FormControl('');
  options: string[] = ['Spaghetti', 'Tacos', 'Burger', 'Salad', 'Sushi']; // Placeholder, should be fetched from API
  filteredOptions: Observable<string[]> | undefined;

  filters = {
    recipe_name: '',
    spice_level: '',
    difficulty_level: '',
    min_calories: 320,
    max_calories: 1590,
  
  };

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  updateFilters() {
    this.filters.recipe_name = this.myControl.value || '';
    this.filtersChanged.emit(this.filters);
  }

  min(value: number) {  
    this.filters.min_calories = Math.min(value, this.filters.max_calories);
    
    this.updateFilters();
  }
  max(value: number) {
    this.filters.max_calories = Math.max(value, this.filters.min_calories);
    this.updateFilters();
  }


  // Expansion panel - keep this
  readonly panelOpenState = signal(false);
}
