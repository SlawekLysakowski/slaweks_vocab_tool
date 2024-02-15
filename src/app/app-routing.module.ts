import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { VocabListComponent } from './vocab-list/vocab-list.component';
import { VocabCreateComponent } from './vocab-create/vocab-create.component';

const routes: Routes = [
  { path: '', component: TestComponent },
  { path: 'list', component: VocabListComponent },
  { path: 'create', component: VocabCreateComponent },
  { path: 'edit/:vocabId', component: VocabCreateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
