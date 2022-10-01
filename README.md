<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=25&duration=2000&pause=1000&color=19F702&width=560&lines=Users+Login+with%3A+NodeJS%2C+MySQL+%26+EJS" alt="Typing SVG" /></a>

# Guide

1. Install dependencies:

   `npm i`

2. Create database in MySQL

3. Create table:
```
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
```
4. Add info to .env

---

- JavaScript library to display alerts and confirmation dialogs: [sweetalert2](https://sweetalert2.github.io/)
