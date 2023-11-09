import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule], 
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });


  it(`should have as title 'fyle-frontend-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('fyle-frontend-challenge app is running!');
  });
  
  it('should render user information when the user is available', () => {
    component.user = {
      name: 'John Doe',
      location: 'Sample Location',
      repos_url: 'https://samplereposurl.com',
      
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.username').textContent).toContain('John Doe');
    expect(compiled.querySelector('.location').textContent).toContain('Sample Location');
    expect(compiled.querySelector('strong').textContent).toContain('repos');
  });
  it('should render the previous and next buttons based on the currentPage and pageSize', () => {
    component.currentPage = 1;
    component.pageSize = 5;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Next');

    component.currentPage = 2;
    fixture.detectChanges();
    expect(compiled.querySelector('button').textContent).toContain('Previous');
  });

});

