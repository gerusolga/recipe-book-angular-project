import {RouterModule, Routes} from "@angular/router";
import {RecipeListComponent} from "../recipes/recipe-list/recipe-list.component";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'login', component:LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
