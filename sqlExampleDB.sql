CREATE DATABASE sqlExampleDB;
​
USE sqlExampleDB;
​
CREATE TABLE Author(
id int AUTO_INCREMENT PRIMARY KEY,
FirstName varchar(255) NOT NULL,
LastName varchar(255) NOT NULL,
Birthdate DATETIME,
YearsWithPublisher int
);
​
INSERT INTO author(FirstName, LastName, BirthDate, YearsWithPublisher)
VALUES('Stephen', 'King', '1947-09-21', 4),
('Agatha', 'Christie', '1890-08-15', 50),
('Isaac', 'Asimov', '1920-02-01', 3),
('JK', 'Rowling', '1965-07-31', 15);
​
CREATE TABLE Books(
id int AUTO_INCREMENT PRIMARY KEY,
Name varchar(255),
IsPaperBack bit,
IsHardCover bit,
Price Float,
AuthorID int,
FOREIGN KEY (AuthorID) REFERENCES Author(id)
);
​
INSERT INTO BOOKS(Name, IsPaperBack, IsHardCover, Price, AuthorID)
VALUES('The Shining', 1, 1, 10.99, 1),
('The Dome', 1, 0, 20.99, 1),
('Murder on the Orient Express', 0, 1, 30.95, 2),
('Death on the Nile', 1, 1, 9.95, 2),
('The Body in the Library', 1, 1, 8.75, 2),
('Foundation and Earth', 0, 1, 10.95, 3),
('I ROBOT', 1, 0, 5.95, 3),
('Foundation and Empire', 1, 1, 35.02, 3),
('The End of Eternity', 1, 0, 4.95, 3),
('Through a Glass Clearly', 1, 1, 55.65, 3),
('Harry Potter', 0, 1, 55.62, 4);
​
CREATE TABLE STORE(
id int AUTO_INCREMENT PRIMARY KEY,
Name varchar(255),
City varchar(255),
HasEStore bit,
Annual_Sales bigint
);
​
INSERT INTO STORE(Name, City, HasEStore, Annual_Sales)
VALUES('Borders', 'New York', 1, 50000000),
('Barnes and Noble', 'Los Angeles', 0, 6754550),
('Books-A-Million', 'St. Paul', 1, 457890453),
('John K. King', 'Detroit', 0, 55555555);
​
CREATE TABLE BookStoreJoinTable(
BookID INT,
StoreID INT,
FOREIGN KEY (BookID) REFERENCES books(id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (StoreID) REFERENCES store(id) ON DELETE RESTRICT ON UPDATE CASCADE,
PRIMARY KEY (BookID, StoreID)
);
​
INSERT INTO BookStoreJoinTable(BookID, StoreID)
VALUES(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(2, 4),
(3, 4),
(4, 1),
(4, 3);
