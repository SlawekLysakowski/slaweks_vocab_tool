import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VocabModel } from '../vocab.model'
import { VocabService } from '../vocab.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  isLoading = false;
  private vocabsSub: Subscription;
  showTest: boolean = false;
  japToKor: boolean = true;
  showEng: boolean = false;
  showPol: boolean = false;
  answer: string;
  correctAnsArr: string[];
  showFeedback: boolean = false;
  feedback: string = '';
  feedbackAnswer: string = '';
  displayedWord: string;
  vocabArr: VocabModel[];
  CurrentWordIndex: number;
  correct: number = 0;
  wrong: number = 0;
  vocabs: VocabModel[];

  constructor(public vocabService: VocabService, private http: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    this.vocabService.getVocabs();
    this.vocabsSub = this.vocabService.getVocabUpdateListener()
      .subscribe(( vocabs: VocabModel[]) => {
        this.isLoading = false;
        this.vocabs = vocabs;
        this.newVocabArr();
        this.newWord();
      });
  }

  newRandomNumber() {
    return Math.trunc(Math.random() * this.vocabs.length);
  }

  newVocabArr() {
    this.vocabArr = new Array(10).fill(null).map(() => this.vocabs[this.newRandomNumber()]);
  }

  newWord() {
    if (this.vocabArr.length === 0) this.newVocabArr();
    this.CurrentWordIndex = Math.trunc(Math.random() * this.vocabArr.length);
    this.displayedWord = this.japToKor? this.vocabArr[this.CurrentWordIndex].japanese : this.vocabArr[this.CurrentWordIndex].korean;
  }

  changeTransDir() {
    this.japToKor = !this.japToKor;
    document.querySelector('.trans-dir').textContent = this.japToKor? 'JAP : KOR' : 'KOR : JAP';
    this.newVocabArr();
    this.newWord();
  }
  rightAnswer() {
    this.correct++;
    this.feedback = 'Correct! ^_^';
    this.feedbackAnswer = '';
    this.vocabArr.splice(this.CurrentWordIndex, 1);
    this.newWord();
  }

  wrongAnswer() {
    this.wrong++;
    this.feedback ='wrong answer (┬┬﹏┬┬)';
    this.feedbackAnswer = `Correct answer was ${this.correctAnsArr}`;
    this.newWord();
  }

  checkAnswer() {
    this.correctAnsArr = this.japToKor?
      this.vocabArr[this.CurrentWordIndex].korean.split(",")
      :
      this.vocabArr[this.CurrentWordIndex].japanese.split(",");

    this.correctAnsArr.forEach((meaning, i) => {
        this.correctAnsArr[i] = meaning.trim();
      })

    this.showFeedback = true;

    setTimeout(() => {
      this.showFeedback = false
    },2000);

    if (this.correctAnsArr.includes(this.answer)) {
      this.rightAnswer();
    } else {
      this.wrongAnswer();
    }
  }

  onEnter(event) {
    if (event.keyCode===13) {
      this.checkAnswer()
    }
  }

}
