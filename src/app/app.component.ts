import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "./shared/data-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe-book-angular-project';

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    const spinner = document.getElementById('global-spinner');
    if (spinner) {
      spinner.style.display = 'none';

      this.dataStorageService.fetchRecipes();
    }
    }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
