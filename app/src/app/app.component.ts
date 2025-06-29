import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/fixed/header/header.component';
import {FooterComponent} from './components/fixed/footer/footer.component';
import {NavComponent} from './components/fixed/nav/nav.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatDividerModule,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping App';
}
