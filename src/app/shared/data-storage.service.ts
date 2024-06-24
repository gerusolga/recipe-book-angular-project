import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, Observable, switchMap, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  private baseUrl = `${environment.firebaseConfig.databaseURL}/recipes`;
  private authService: AuthService;

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log(1,recipes);
    return this.http.put(`${environment.firebaseConfig.databaseURL}/recipes.json`, recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.authService.user.pipe(
      switchMap(user => {
        return this.http.get<Recipe[]>(`${this.baseUrl}?userId=${user.id}`);
      }),
      map(recipes => {
        return recipes || [];
      })
    );
  }
  clearRecipes() {
    this.recipeService.setRecipes([]);
  }
}
