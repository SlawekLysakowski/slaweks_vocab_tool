import { Component, Renderer2 } from '@angular/core';
import {Location} from '@angular/common';
import { VocabService } from '../vocab.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private location: Location, public vocabService: VocabService) {
    this.location.onUrlChange(currentUrl => this.urlChange(currentUrl));
  }

  urlChange(currentUrl) {
    if (currentUrl.includes('edit')) {
      document.querySelector('.nav-btn-add').classList.add('disable');
    } else {
      document.querySelector('.nav-btn-add').classList.remove('disable')
    }
  }

}






