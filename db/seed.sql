INSERT INTO department (id, name)
VALUES (1,"Sales"),
       (2,"Customer Service"),
       (3,"Accounting"),
       (4,"Management"),
       (5,"Leadership");

INSERT INTO role (id, title, salary, department_id)
VALUES (1,"bottom totem pole", 10000, 2),
       (2,"middle totem pole", 20000, 1),
       (3,"top totem pole", 30000, 3),
       (4,"Leadership", 40000, 4),
       (5,"CEO", 50000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)       
VALUES  (1, "Luke", "Dukus", 5, null),
        (2, "Kelly", "Usenkus", 5, null),
        (3, "Grimm", "Dukus", 4, 1),
        (4, "Debra", "DaBest", 3, 3),
        (5, "Michael", "Dabest", 3, 4),
        (6, "Korry", "Boggy", 2, 3),
        (7, "Jim", "Boggy", 2, 3),
        (8, "Day", "Kammy", 2, 3),
        (9, "Sarah", "Shmeckle", 1, 3),
        (10, "Whitley", "Krombopple", 1, 3);