import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor() { }

  init() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}
