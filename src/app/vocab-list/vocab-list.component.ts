import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { VocabService } from '../vocab.service';
import { VocabModel } from '../vocab.model';

@Component({
  selector: 'app-vocab-list',
  templateUrl: './vocab-list.component.html',
  styleUrls: ['./vocab-list.component.css'],
})
export class VocabListComponent implements OnInit, OnDestroy {
  vocabs: VocabModel[] = [];
  isLoading: boolean = false;
  private vocabsSub: Subscription;
  showConf: boolean = false;
  totalVocabs = 0;
  vocabsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20];
  currentID: string;

  constructor(public vocabService: VocabService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.vocabService.getVocabsWithPagination(
      this.vocabsPerPage,
      this.currentPage,
    );

    this.vocabsSub = this.vocabService
      .getVocUpdListenerPagination()
      .subscribe((vocabData: { vocabs: VocabModel[]; vocabCount: number }) => {
        this.totalVocabs = vocabData.vocabCount;
        this.vocabs = vocabData.vocabs;
        this.isLoading = false;
      });
  }

  onConfirm(vocabId: string) {
    this.showConf = true;
    this.currentID = vocabId;
  }

  onDelete() {
    this.isLoading = true;
      this.vocabService.deleteVocab(this.currentID).subscribe(() => {
        this.vocabService.getVocabsWithPagination(
          this.vocabsPerPage,
          this.currentPage,
        );
        this.currentID = null;
        this.showConf = false;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = false;
    console.log('not happening');
    console.log('page data: ' + pageData);
    this.currentPage = pageData.pageIndex + 1;
    console.log(this.currentPage);
    this.vocabsPerPage = pageData.pageSize;
    this.vocabService.getVocabsWithPagination(
      this.vocabsPerPage,
      this.currentPage,
    );
  }

  onCancel() {
    this.showConf = false;
    this.currentID = null;
  }

  ngOnDestroy(): void {
    this.vocabsSub.unsubscribe();
  }

}
