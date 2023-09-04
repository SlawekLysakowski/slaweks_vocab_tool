import {Component, OnInit} from '@angular/core';

import { VocabModel } from '../vocab.model'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  japToKor: boolean = true;
  showEng: boolean = false;
  showPol: boolean = false;
  answer: string;
  showFeedback: boolean = false;
  feedback: string;
  feedbackAnswer: string;
  displayedWord: string;
  vocabs: VocabModel[];
  selectedVocab: string[];
  randomNumber: number;
  CurrentWordIndex: number;
  correct: number = 0;
  wrong: number = 0;

  vocabModel: VocabModel[] = [
    {
      _id: '0',
      japanese: '家',
      korean: '집',
      english: 'house',
      polish: 'dom'
    },
    {
      _id: '1',
      japanese: '蚊',
      korean: '모기',
      english: 'mosquito',
      polish: 'komar'
    },
    {
      _id: '2',
      japanese: '利益',
      korean: '이익',
      english: 'profit',
      polish: 'zysk'
    },
  ]



  newRandomNumber() {
    return Math.trunc(Math.random() * this.vocabModel.length);
  }

  newVocabArr() {
    this.vocabs = new Array(10).fill(null).map(() => this.vocabModel[this.newRandomNumber()]);
    this.selectedVocab = new Array(10);
    for (let i = 0; i < this.vocabs.length; i++) {
      this.selectedVocab[i] = this.japToKor? this.vocabs[i].japanese : this.vocabs[i].korean;
    }
  }

  newWord() {
    this.randomNumber = Math.trunc(Math.random() * this.vocabs.length);
    this.CurrentWordIndex = this.randomNumber;
    this.displayedWord = this.japToKor? this.vocabs[this.randomNumber].japanese : this.vocabs[this.randomNumber].korean;
  }

  changeTransDir() {
    this.japToKor = !this.japToKor;
    document.querySelector('.trans-dir').textContent = this.japToKor? 'JAP : KOR' : 'KOR : JAP';
    this.newVocabArr();
    this.newWord();
  }

  checkAnswer() {
    const correctAnswer = this.japToKor? this.vocabs[this.randomNumber].korean : this.vocabs[this.randomNumber].japanese;
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false
    },2000);

    if (this.answer === correctAnswer) {
    this.feedback = 'Correct! ^_^'
  } else {
    this.feedback ='wrong answer (┬┬﹏┬┬)';
    this.feedbackAnswer = `Correct answer was ${correctAnswer}`;
  }
  }

  ngOnInit() {
    this.newVocabArr();
    this.newWord();
  }
}
