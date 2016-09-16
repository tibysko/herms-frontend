import { HermsFrontendAngularCliPage } from './app.po';

describe('herms-frontend-angular-cli App', function() {
  let page: HermsFrontendAngularCliPage;

  beforeEach(() => {
    page = new HermsFrontendAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
