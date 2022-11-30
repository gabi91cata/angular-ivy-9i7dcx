import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello 321 {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;
}
