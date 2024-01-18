import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { VocabModel } from './vocab.model';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})
export class VocabService {
  private vocabs: VocabModel[] = [];
  private vocabsUpdated = new Subject<VocabModel[]>();
  private VocabsWithCount = new Subject<{ vocabs: VocabModel[]; vocabCount: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getVocabsWithPagination(vocabsPerPage: number, currentPage: number) {
      const queryParams = `?pagesize=${vocabsPerPage}&page=${currentPage}`;
      this.http
        .get<{ message: string, vocabs: any, maxVocabs: number }>(
          'http://localhost:3000/api/vocabs' + queryParams
        )
        .pipe(
          map((vocabData) => {
            return {vocabs: vocabData.vocabs.map((vocab) => {
                return {
                  japanese: vocab.japanese,
                  korean: vocab.korean,
                  english: vocab.english,
                  polish: vocab.polish,
                  id: vocab._id,
                };
              }),
              maxVocabs: vocabData.maxVocabs
            };
          })
        )
        .subscribe((transformedVocabData) => {
          this.vocabs = transformedVocabData.vocabs;
          this.VocabsWithCount.next({
            vocabs: [...this.vocabs],
            vocabCount: transformedVocabData.maxVocabs
          });
        });
    }

  getVocabs() {
    this.http.get<{ message: string, vocabs: any }>('http://localhost:3000/api/vocabs')
      .pipe(
        map((vocabData) => {
          return vocabData.vocabs.map((vocab) => {
            return {
              japanese: vocab.japanese,
              korean: vocab.korean,
              english: vocab.english,
              polish: vocab.polish,
              id: vocab._id,
            };
          });
        })
      )
      .subscribe((transformedVocabs) => {
        this.vocabs = transformedVocabs;
        this.vocabsUpdated.next([...this.vocabs])
      })
  }

  getVocUpdateListener() {
    return this.vocabsUpdated.asObservable();
  }

  getVocUpdListenerPagination() {
    return this.VocabsWithCount.asObservable();
  }

  addVocab(japanese: string, korean: string, english: string, polish: string) {
    const vocab: VocabModel = {
      id: null,
      japanese: japanese,
      korean: korean,
      english: english,
      polish: polish
    };
    this.http.post<{ message: string, vocabId: string }>('http://localhost:3000/api/vocabs', vocab)
      .subscribe((responseData) => {
        const vocabId = responseData.vocabId;
        vocab.id = vocabId;
        this.vocabs.push(vocab)
        this.vocabsUpdated.next([...this.vocabs]);
        this.router.navigate(['/list'])
      });
  }

  updateVocab(vocabId: string, japanese: string, korean: string, english: string, polish: string) {
    const vocab: VocabModel = { id: vocabId, japanese: japanese, korean: korean, english: english, polish: polish }
    this.http.put('http://localhost:3000/api/vocabs/' + vocabId, vocab)
      .subscribe(response => {
        const updatedVocabs = [...this.vocabs];
        const oldVocabIndex = updatedVocabs.findIndex(v => v.id === vocab.id);
        updatedVocabs[oldVocabIndex] = vocab;
        this.vocabs = updatedVocabs;
        this.vocabsUpdated.next([...this.vocabs])
        this.router.navigate(['/list'])
      });
  }

  deleteVocab(vocabId: string) {
   return this.http
     .delete(environment.apiUrl + 'vocabs/' + vocabId);
  }

  getVocab(id: string) {
    return this.http.get<VocabModel>(environment.apiUrl + 'vocabs/' + id);
  };
}
