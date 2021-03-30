# 06 Server-Side APIs: Weather Dashboard

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that provides basic setup and usage instructions. You will use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
G̶I̶V̶E̶N̶ a̶ w̶e̶a̶t̶h̶e̶r̶ d̶a̶s̶h̶b̶o̶a̶r̶d̶ w̶i̶t̶h̶ f̶o̶r̶m̶ i̶n̶p̶u̶t̶s̶
W̶H̶E̶N̶ I̶ s̶e̶a̶r̶c̶h̶ f̶o̶r̶ a̶ c̶i̶t̶y̶
T̶H̶E̶N̶ I̶ a̶m̶ p̶r̶e̶s̶e̶n̶t̶e̶d̶ w̶i̶t̶h̶ c̶u̶r̶r̶e̶n̶t̶ a̶n̶d̶ f̶u̶t̶u̶r̶e̶ c̶o̶n̶d̶i̶t̶i̶o̶n̶s̶ f̶o̶r̶ t̶h̶a̶t̶ c̶i̶t̶y̶ a̶n̶d̶ t̶h̶a̶t̶ c̶i̶t̶y̶ i̶s̶ a̶d̶d̶e̶d̶ t̶o̶ t̶h̶e̶ s̶e̶a̶r̶c̶h̶ h̶i̶s̶t̶o̶r̶y̶
W̶H̶E̶N̶ I̶ v̶i̶e̶w̶ c̶u̶r̶r̶e̶n̶t̶ w̶e̶a̶t̶h̶e̶r̶ c̶o̶n̶d̶i̶t̶i̶o̶n̶s̶ f̶o̶r̶ t̶h̶a̶t̶ c̶i̶t̶y̶
T̶H̶E̶N̶ I̶ a̶m̶ p̶r̶e̶s̶e̶n̶t̶e̶d̶ w̶i̶t̶h̶ t̶h̶e̶ c̶i̶t̶y̶ n̶a̶m̶e̶,̶ t̶h̶e̶ d̶a̶t̶e̶,̶ a̶n̶ i̶c̶o̶n̶ r̶e̶p̶r̶e̶s̶e̶n̶t̶a̶t̶i̶o̶n̶ o̶f̶ w̶e̶a̶t̶h̶e̶r̶ c̶o̶n̶d̶i̶t̶i̶o̶n̶s̶,̶ t̶h̶e̶ t̶e̶m̶p̶e̶r̶a̶t̶u̶r̶e̶,̶ t̶h̶e̶ h̶u̶m̶i̶d̶i̶t̶y̶,̶ t̶h̶e̶ w̶i̶n̶d̶ s̶p̶e̶e̶d̶,̶ a̶n̶d̶ t̶h̶e̶ U̶V̶ i̶n̶d̶e̶x̶
W̶H̶E̶N̶ I̶ v̶i̶e̶w̶ t̶h̶e̶ U̶V̶ i̶n̶d̶e̶x̶
T̶H̶E̶N̶ I̶ a̶m̶ p̶r̶e̶s̶e̶n̶t̶e̶d̶ w̶i̶t̶h̶ a̶ c̶o̶l̶o̶r̶ t̶h̶a̶t̶ i̶n̶d̶i̶c̶a̶t̶e̶s̶ w̶h̶e̶t̶h̶e̶r̶ t̶h̶e̶ c̶o̶n̶d̶i̶t̶i̶o̶n̶s̶ a̶r̶e̶ f̶a̶v̶o̶r̶a̶b̶l̶e̶,̶ m̶o̶d̶e̶r̶a̶t̶e̶,̶ o̶r̶ s̶e̶v̶e̶r̶e̶
W̶H̶E̶N̶ I̶ v̶i̶e̶w̶ f̶u̶t̶u̶r̶e̶ w̶e̶a̶t̶h̶e̶r̶ c̶o̶n̶d̶i̶t̶i̶o̶n̶s̶ f̶o̶r̶ t̶h̶a̶t̶ c̶i̶t̶y̶
T̶H̶E̶N̶ I̶ a̶m̶ p̶r̶e̶s̶e̶n̶t̶e̶d̶ w̶i̶t̶h̶ a̶ 5̶-̶d̶a̶y̶ f̶o̶r̶e̶c̶a̶s̶t̶ t̶h̶a̶t̶ d̶i̶s̶p̶l̶a̶y̶s̶ t̶h̶e̶ d̶a̶t̶e̶,̶ a̶n̶ i̶c̶o̶n̶ r̶e̶p̶r̶e̶s̶e̶n̶t̶a̶t̶i̶o̶n̶ o̶f̶ w̶e̶a̶t̶h̶e̶r̶ c̶o̶n̶d̶i̶t̶i̶o̶n̶s̶,̶ t̶h̶e̶ t̶e̶m̶p̶e̶r̶a̶t̶u̶r̶e̶,̶ a̶n̶d̶ t̶h̶e̶ h̶u̶m̶i̶d̶i̶t̶y̶
W̶H̶E̶N̶ I̶ c̶l̶i̶c̶k̶ o̶n̶ a̶ c̶i̶t̶y̶ i̶n̶ t̶h̶e̶ s̶e̶a̶r̶c̶h̶ h̶i̶s̶t̶o̶r̶y̶
T̶H̶E̶N̶ I̶ a̶m̶ a̶g̶a̶i̶n̶ p̶r̶e̶s̶e̶n̶t̶e̶d̶ w̶i̶t̶h̶ c̶u̶r̶r̶e̶n̶t̶ a̶n̶d̶ f̶u̶t̶u̶r̶e̶ c̶o̶n̶d̶i̶t̶i̶o̶n̶s̶ f̶o̶r̶ t̶h̶a̶t̶ c̶i̶t̶y̶
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./Assets/06-server-side-apis-homework-demo.png)

## Grading Requirements

This homework is graded based on the following criteria: 

### Technical Acceptance Criteria: 40%

* Satisfies all of the above acceptance criteria plus the following:

    * Uses the OpenWeather API to retrieve weather data.

    * Uses `localStorage` to store persistent data.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository that contains application code.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application resembles the mock-up functionality provided in the homework instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality readme file with description, screenshot, and link to deployed application.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a readme describing the project.

- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
