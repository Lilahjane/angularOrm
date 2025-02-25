import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(filters: any, page: number): Observable<Recipe[]> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<Recipe[]>('/api/recipes', { params: { ...params, page } });
  }

  getRecipeNames(): Observable<string[]> {
    return this.http.get<string[]>('/api/recipe-names');
  }
  // Get ingredients for a specific recipe
  getIngredientsForRecipe(recipeId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/ingredients/${recipeId}`);
  }
}
