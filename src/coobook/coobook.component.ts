import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../please_work/IRecpies';
import { FiltersComponent } from '../filters/filters.component';


@Component({
  selector: 'app-coobook',
  imports: [MatButtonModule, MatCardModule, CommonModule, MatPaginatorModule, FiltersComponent],
  templateUrl: './coobook.component.html',
  styleUrl: './coobook.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CookbookComponent implements OnInit {
  recipes: Recipe[] = [];
  totalRecipes = 0;
  filters = { recipe_name: '', spice_level: '', difficulty_level: '', min_calories: 320, max_calories: 1590 };
  page = 1;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes(this.filters, this.page).subscribe((response) => {
      this.recipes = response;
      this.totalRecipes = response.length;
    });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadRecipes();
  }

  onFilterChange(newFilters: any) {
    this.filters = newFilters;
    this.page = 1; // Reset pagination on filter change
    this.loadRecipes();
  }
}
