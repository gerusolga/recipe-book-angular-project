import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {Observable, tap} from "rxjs";


@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes(recipes: Recipe[]): Observable <any>{
    return this.http.put('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)

  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );

  }
}
