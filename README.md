### Installation

*Install NPM packages*

1. Navigate to the ***client*** folder via a terminal and run
    ```javascript
    npm install
    ```

2.  Navigate to the ***server*** folder via a terminal and run
    ```javascript
    npm install
    ```

    ***Note:*** In order to use the database, create a **.env** file in the ***server*** folder and add an enviromental variable **MONGO_ATLAS_URI** and set it equal to URI provided by MongoDB Atlas.

3. In server folder run
   ``docker compose up -d`` to spin up db locally or update .env file with you db url

## Usage

1. To run the server navigate to the ***server*** folder and run
    ```javascript
    node app.js
    ```

2. To run the client navigate to the ***client*** folder and run
    ```javascript
    ng serve
    ```


### Screenshots

***Homepage***

![HomepageScreenshot][Homepage-url]

***Question example***

![QuestionScreenshot][Question-url]

***Quiz Score***

![QuizScoreScreenshot][QuizScore-url]

***Viewing your scores***

![ScoresScreenshot][Scores-url]

***Leaderboard***

![LeaderboardScreenshot][Leaderboard-url]



## Authors

Dimitris Anyfantakis



## License

See [License][license-url] for more information regarding the license



## Acknowledgments

[Open Trivia API][open-trivia-database-api-url]



[contributors-shield]: https://img.shields.io/github/contributors/dimanyfantakis/SecondhandBookstore
[contributors-url]: https://github.com/dimanyfantakis/SecondhandBookstore/graphs/contributors
[commits-shield]: https://img.shields.io/github/last-commit/dimanyfantakis/SecondhandBookstore
[commits-url]: https://github.com/dimanyfantakis/SecondhandBookstore/commit/main
[license-shield]: https://img.shields.io/github/license/dimanyfantakis/SecondhandBookstore
[license-url]: https://https://github.com/dimanyfantakis/SecondhandBookstore/blob/main/LICENSE
[issues-shield]: https://img.shields.io/github/issues/dimanyfantakis/SecondhandBookstore
[issues-url]: https://github.com/dimanyfantakis/SecondhandBookstore/issues/
[demo-url]: https://github.com/dimanyfantakis/SecondhandBookstore

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=black
[Node-url]: https://nodejs.org/en/
[Nodemon]: https://img.shields.io/badge/Nodemon-000000?style=for-the-badge&logo=Nodemon&logoColor=##76D04B
[Nodemon-url]: https://www.npmjs.com/package/nodemon
[Express]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=###000000
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=black
[MongoDB-url]: https://www.mongodb.com/atlas/database
[Mongoose]: https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge
[Mongoose-url]: https://mongoosejs.com/
[Angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=Angular&logoColor=black
[Angular-url]: https://angular.io/
[MaterialDesign]: https://img.shields.io/badge/MaterialDesign-757575?style=for-the-badge&logo=MaterialDesign&logoColor=black
[MaterialDesign-url]: https://material.angular.io/
[MaterialDesignIcons]: https://img.shields.io/badge/MaterialDesignIcons-2196F3?style=for-the-badge&logo=MaterialDesignIcons&logoColor=white
[MaterialDesignIcons-url]: https://materialdesignicons.com/

[open-trivia-database-url]: https://opentdb.com/
[open-trivia-database-api-url]: https://opentdb.com/api_config.php

[Homepage-url]: https://drive.google.com/uc?export=view&id=1WDy43DE7V6aXsYLzWtFX2WHZ_6orB01O
[Leaderboard-url]: https://drive.google.com/uc?export=view&id=1NICyekXb9REEsD19-E-bSYn8SJ69-mfN
[QuizScore-url]: https://drive.google.com/uc?export=view&id=101hCqN9xL8Lhxiaj4ORmqVVox8CDHee0
[Scores-url]: https://drive.google.com/uc?export=view&id=1qGc2arjtWhfJN1TsEa_5gShp7lnUtFxn
[Question-url]: https://drive.google.com/uc?export=view&id=1E8yFmKxbubLVKlmfxnjo7s331-wWEhKi
