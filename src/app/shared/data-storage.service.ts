import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  private baseUrl = `${environment.firebaseConfig.databaseURL}/recipes.json`;


  constructor(private http: HttpClient,
              private authService: AuthService,
  ) {
  }

  storeRecipes(recipes: Recipe[]) {
    console.log(1, recipes);
    return this.http.put(`this.baseUrl`, recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.authService.user.pipe(
      switchMap(user => {
        if (!user) {
          console.log('No user found');
          return of([]);
        }
        console.log('Fetching recipes for user:', user.id);
        return this.http.get<Recipe[]>(`${this.baseUrl}?userId=${user.id}`).pipe(
          map(recipes => {
            console.log('Fetched recipes:', recipes);
            return recipes || [];
          }),

          catchError(error => {
            console.error('Error fetching recipes:', error);
            return of([]);
          })
        );
      })
    );
  }
}
