# EiaTestRound2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19 and ng-bootstrap version 4.4.1.

Following changes done:
1) App Service (app.service.ts) created to get data from URL https://hn.algolia.com/api/v1/search_by_date?tags=story .
2) Home Component created to poll (10 sec) the post data using App Service. Interval function from RxJs is used for polling.
3) Home is set as default route of the application.
4) Table created using ng-bootstrap to populate post data.
5) View button added in last column of each row in  the table. 
6) A modal added to disaply raw json data for respective post. Modal opens on clicking View button.
Modal can be closed using clicking Close button / X button / backdrop.
7) For invalid route, Page Not FOund compoenent is added.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
