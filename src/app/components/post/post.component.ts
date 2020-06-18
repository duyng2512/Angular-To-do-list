import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: Post;
  loaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const rawID = +this.route.snapshot.paramMap.get('id');
    let id = String(rawID);
    id = id.slice(2, id.length);
    console.log(id);
    this.postService.getPost(rawID).subscribe((post) => {
      this.post = post;
      this.loaded = true;
    });
  }
}
