import { Component, OnDestroy, OnInit } from '@angular/core';
import { VocabService } from '../vocab.service';
import { VocabModel } from '../vocab.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
  totalVocabs = 7;
  vocabsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20];
  currentID: string;

  constructor(public vocabService: VocabService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.vocabService.getVocabsWithPagination(
      this.vocabsPerPage,
      this.currentPage,
    );

    this.vocabsSub = this.vocabService
      .getVocUpdListenerPagination()
      .subscribe((vocabData: { vocabs: VocabModel[]; vocabCount: number }) => {
        this.isLoading = false;
        this.totalVocabs = vocabData.vocabCount;
        this.vocabs = vocabData.vocabs;
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

  onCancel() {
    this.showConf = false;
    this.currentID = null;
    // this.router.navigate(['/list'])
  }

  ngOnDestroy(): void {
    this.vocabsSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.vocabsPerPage = pageData.pageSize;
    this.vocabService.getVocabsWithPagination(
      this.vocabsPerPage,
      this.currentPage,
    );
  }
}
