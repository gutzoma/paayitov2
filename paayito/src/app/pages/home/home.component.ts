import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {}

}