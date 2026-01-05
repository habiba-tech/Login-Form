import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  http = inject(HttpClient)
  url = "https://jsonplaceholder.typicode.com/posts"

  getPosts() {
    return this.http.get<any>(this.url)
  }

  $posts = this.getPosts()

}