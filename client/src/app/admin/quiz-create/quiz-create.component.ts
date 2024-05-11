import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

type QuizForm = {
  title: FormControl<string>;
  questions: FormArray;
}

type QuestionForm = {
  question: FormControl<string>;
  options: FormArray<FormControl<string>>;
  answer: FormControl<string>;
}
@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.css'
})
export class QuizCreateComponent {


  router = inject(Router);
  http = inject(HttpClient);
  toastr = inject(ToastrService);

  faQuestions = new FormArray<FormGroup<QuestionForm>>([this.getQuestionForm()]);
  fcQuizTitle = new FormControl<string>('', {
    asyncValidators: [],
    validators: [Validators.required],
    nonNullable: true,
  })
  fgQuiz = new FormGroup<QuizForm>({
    title: this.fcQuizTitle,
    questions: this.faQuestions
  })




  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']).then(() => {
      this.toastr.success('User logged out')
    });
  }

  getQuestionForm():  FormGroup<QuestionForm>  {
    return new FormGroup({
      question: new FormControl<string>('', {
        asyncValidators: [],
        validators: [Validators.required],
        nonNullable: true,
      }),
      answer: new FormControl<string>('', {
        asyncValidators: [],
        validators: [Validators.required],
        nonNullable: true,
      }),
      options: new FormArray<FormControl<string>>([
        new FormControl<string>('', {
          asyncValidators: [],
          validators: [Validators.required],
          nonNullable: true,
        })
      ])
    })
  }

  addQuestion() {
    this.faQuestions.push(this.getQuestionForm());
  }

  removeQuestionAt(i: number) {
    this.faQuestions.removeAt(i);
  }

  addOptionToQuestion(i: number) {
    this.faQuestions.at(i).controls.options.push(new FormControl<string>('', {
      asyncValidators: [],
      validators: [Validators.required],
      nonNullable: true,
    }));
  }

  removeOptionFromQuestionAt(i: number, optionIndex: number) {
    this.faQuestions.at(i).controls.options.removeAt(optionIndex);
  }

  createQuiz() {
    const payload = this.fgQuiz.value;
    this.http.post('quizzes/create', payload)
      .subscribe(res => {
        this.toastr.success('Quiz created');
        this.fgQuiz.reset();
      },
        error => {
        this.toastr.error('Failed to create quiz')
        })
  }
}
