import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
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
    task.id = Math.floor(Math.random() * 10000);
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap((newTask: Task) => this.taskAddedSource.next(newTask)),
      catchError(this.handleError)
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
