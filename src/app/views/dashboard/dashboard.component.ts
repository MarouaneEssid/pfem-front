import { Component, OnInit } from '@angular/core';
import { TechnologyService } from '../../services/technology.service';
import { Technology } from '../../models/technology';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private technologyService: TechnologyService) {}
  keywords: Technology[]=[];
  tags: Technology[];

  ngOnInit(): void {
    this.technologyService.getTechnologies().subscribe(technologies => this.tags = technologies);
  }
}
