import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '@shared/entities/skill';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.less']
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;

  constructor() { }

  ngOnInit() {
  }

}
