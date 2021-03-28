#!/bin/bash
 
function pause(){
	read -p "$*"
}


# Ask the user for login details
echo ------------------------------------------------------
echo ----- Bash to create the MySQL database 'TodoList' -----
echo ------------------------------------------------------
echo
read -p 'MySQL User: ' uservar
read -sp 'MySQL Password: ' passvar
echo
mysql -u$uservar -p$passvar < "`dirname "$0"`\database.sql"
echo $
echo Database created succesfully
echo
pause 'Press [Enter] key to continue...'

FILE="`dirname "$0"`\backend\src\main\resources\application.properties"

/bin/cat <<EOM >$FILE
spring.jpa.database=MYSQL
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/todolist?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
spring.datasource.username=$uservar
spring.datasource.password=$passvar
EOM

echo
echo SpringBoot configuration succesfully
echo
pause 'Press [Enter] key to continue...'

cd `dirname "$0"`/backend

mvn clean package

java -jar `dirname "$0"`/backend/target/todolist-0.0.1-SNAPSHOT.jar
