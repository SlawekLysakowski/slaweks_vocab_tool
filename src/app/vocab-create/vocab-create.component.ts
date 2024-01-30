import { Component, OnInit } from '@angular/core';
import { VocabModel } from '../vocab.model';
import { VocabService } from '../vocab.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vocab-create',
  templateUrl: './vocab-create.component.html',
  styleUrls: ['./vocab-create.component.css']
})
export class VocabCreateComponent implements OnInit {
  vocab: VocabModel;
  isLoading: boolean = false;
  private mode: string = 'create';
  private vocabId: string;

  showList: boolean = true;
  showAdd: boolean = true;

  constructor(
    public vocabService: VocabService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('vocabId')) {
        this.mode = 'edit';
        this.vocabId = paramMap.get('vocabId');
        this.isLoading = true;
        this.vocabService.getVocab(this.vocabId).subscribe(vocabData => {
          this.isLoading = false;
          this.vocab = {
            id: vocabData.id,
            japanese: vocabData.japanese,
            korean: vocabData.korean,
            english: vocabData.english,
            polish: vocabData.polish}
        });
      } else {
        this.mode = 'create';
        this.vocabId = 'null';
      }
    });
  }


  onSaveVocab(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.vocabService.addVocab( form.value.japanese, form.value.korean, form.value.english, form.value.polish)
      form.resetForm();
    } else {
      this.vocabService.updateVocab(this.vocabId, form.value.japanese, form.value.korean, form.value.english, form.value.polish)
    }


    }

}
