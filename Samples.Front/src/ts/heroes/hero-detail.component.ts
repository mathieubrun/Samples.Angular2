import {Component} from 'angular2/core';
import {Hero} from './hero';

@Component({
    selector: 'my-hero-detail',
    moduleId: module.id,
    templateUrl: 'hero-detail.component.html',
    inputs: ['hero']
})
export class HeroDetailComponent {
    hero: Hero;
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/