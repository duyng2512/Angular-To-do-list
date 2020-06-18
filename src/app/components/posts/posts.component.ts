import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  data: any;
  loaded: boolean = false;
  currentPost: Post[];
  currentIndex: number = 0;
  posts: Post[];
  post: Post = {
    id: null,
    title: '',
    body: '',
  };
  isEdit: boolean = false;
  @ViewChild('postForm') form: any;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;

      for (let i = 0; i < this.posts.length; i++) {
        this.posts[i].id = `id${this.posts[i].id}`;
      }
      this.currentPost = this.posts.slice(
        this.currentIndex,
        this.currentIndex + 8
      );
      this.loaded = true;
    });
  }

  nextPage(e): void {
    this.currentIndex += 1;
    this.currentPost = this.posts.slice(
      this.currentIndex * 8,
      this.currentIndex * 8 + 8
    );
  }

  prevPage(e): void {
    this.currentIndex -= 1;
    this.currentPost = this.posts.slice(
      this.currentIndex * 8,
      this.currentIndex * 8 + 8
    );
  }

  onSubmit(post): void {}

  addPost(title, body) {
    this.postService.savePost({ title, body } as Post).subscribe((newPost) => {
      newPost.id = `id${newPost.id}`;
      this.posts.push(newPost);
      this.post = newPost;
    });
    this.form.reset();
  }

  setEdit(): void {
    this.isEdit = false;
  }

  editPost(post: Post): void {
    this.isEdit = true;
    this.post = post;
  }

  updatePost(): void {
    const editPost = { ...this.post };
    editPost.id = parseInt(editPost.id.slice(2, editPost.id.length));
    this.postService.updatePost(editPost).subscribe((res) => console.log(res));
  }

  removePost(post: Post) {
    console.log(post);
  }
}
