import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";

type QuizForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  questions: FormArray;
}

type QuestionForm = {
  question: FormControl<string>;
  options: FormArray<FormControl<string>>;
  answer: FormControl<string>;
}
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {


  router = inject(Router);
  http = inject(HttpClient);
  toastr = inject(ToastrService);

  faQuestions = new FormArray<FormGroup<QuestionForm>>([this.getQuestionForm()]);
  fcQuizTitle = new FormControl<string>('', {
    asyncValidators: [],
    validators: [Validators.required],
    nonNullable: true,
  })
  fcQuizDescription = new FormControl<string>('', {
    asyncValidators: [],
    validators: [Validators.required],
    nonNullable: true,
  })
  fgQuiz = new FormGroup<QuizForm>({
    title: this.fcQuizTitle,
    description: this.fcQuizDescription,
    questions: this.faQuestions
  })

  getQuestionForm(): FormGroup<QuestionForm> {
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
