import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  @Input() data: Post;

  constructor() {}

  ngOnInit(): void {}

  onNewPost(e): void {
    console.log('Hello world');
  }
}
