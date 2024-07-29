import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalNotifications } from '@nativescript/local-notifications';
import { Device } from '@nativescript/core';
import { Task } from './models/task.model';

// Android titreşim işlevini doğrudan eklemek için
declare var android: any; // Android'le ilgili nesneleri tanıtır

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => {
        // Görev oluşturulduğunda bildirim ve titreşim
        LocalNotifications.schedule([{
          id: 1,
          title: 'Görev Oluşturuldu',
          body: 'Yeni görev başarıyla eklendi!',
        }]);

        if (Device.os === 'Android') {
          this.vibrate();
        }
      })
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => {
        // Görev güncellendiğinde bildirim ve titreşim
        LocalNotifications.schedule([{
          id: 2,
          title: 'Görev Güncellendi',
          body: 'Görev başarıyla güncellendi!',
        }]);

        if (Device.os === 'Android') {
          this.vibrate();
        }
      })
    );
  }

  private vibrate() {
    if (Device.os === 'Android') {
      const context = android.context; // Android context
      const vibrator = context.getSystemService(android.content.Context.VIBRATOR_SERVICE) as android.os.Vibrator;
      if (vibrator) {
        vibrator.vibrate(500); // 500ms titreşim
      }
    } else if (Device.os === 'iOS') {
      // iOS'ta titreşim (önceki yanıtlardan birini kullanabilirsiniz)
      const UIApplication = require('@nativescript/core').UIApplication;
      UIApplication.sharedApplication().playSystemSound(4095); // Titreşim sesi
    }
  }
}
