create table employee(emp_no int , emp_name varchar (20), emp_address varchar (20));

insert into employee values (1,'Rohan','Aurangabad');
insert into employee values (2,'Sam','Mumbai');
insert into employee values (3,'John','Bengaluru');
insert into employee values (4,'Ram','Manipal');
insert into employee values (5,'Ray','Mangalore');

select *from employee;

select emp_no employee_no,emp_name emplyoee_name,emp_address address from employee where emp_address='Manipal';

alter table employee add(Salary int);

update employee set Salary=20000 WHERE emp_no=1;
update employee set Salary=10000 where emp_no=2;
update employee set Salary=40000 where emp_no=3;
update employee set Salary=30000 where emp_no=4;
update employee set Salary=25000 where emp_no=5;

desc employee

delete from employee where emp_address='Mangalore';

rename employee to employee1

drop table employee