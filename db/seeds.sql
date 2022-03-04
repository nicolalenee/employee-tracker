INSERT INTO departments (name)
VALUES
('Marketing'),
('Advertising'),
('Accouting')
;

INSERT INTO roles (job_title, department_id, salary)
VALUES
('Manager', 1, 100000),
('Project Manager', 2, 75000),
('Graphic Designer', 2, 50000),
('Bookkeeper', 2, 45000),
('Phone Agent', 3, 35000),
('Senior Developer', 3, 80000),
('Assitant Manager', 3, 75000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Moon', 'Taeil', 1, null),
('Johnny', 'Suh', 2, 1),
('Taeyong', 'Lee', 3, 1),
('Yuta', 'Nakamoto', 4, 2),
('Doyoung', 'Kim', 5, 3),
('Jaehyun', 'Jeong', 6, 4),
('Mark', 'Lee', 4, 5),
('Haechan', 'Lee', 5, 6);