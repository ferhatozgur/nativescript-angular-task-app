import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Test API URL'si
  private taskAddedSource = new Subject<Task>();
  taskAdded$ = this.taskAddedSource.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap((newTask: Task) => {
        console.log('API yanıtı (yeni görev):', newTask);
        this.taskAddedSource.next(newTask);
      }),
      catchError(this.handleError)
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      tap((updatedTask: Task) => {
        console.log('API yanıtı (güncellenen görev):', updatedTask);
        this.taskAddedSource.next(updatedTask);
      }),
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log(`API yanıtı (silinen görev): ${id}`);
        this.taskAddedSource.next({ id, title: '', status: '', completed: false } as Task);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API çağrısı hatası:', error.error.message);
    return throwError('API çağrısı sırasında bir hata oluştu; lütfen tekrar deneyin.');
  }
}
