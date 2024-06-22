import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor() { }

  init() {
    return new Promise<void>((resolve) => {
      // Имитируем задержку загрузки
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}
