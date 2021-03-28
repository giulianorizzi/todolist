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
resultado=$(mysql -u$uservar -p$passvar < "`dirname "$0"`\database.sql")
if [ $? -eq 0 ];then
	echo
    pause 'Database created succesfully. Press [Enter] to configure SpringBoot: '
else
	echo
    pause 'Database connection error. Press [Enter] to exit: '
	exit 0
fi

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
pause 'SpringBoot configuration succesfully. Press [Enter] to compile the project: '

cd `dirname "$0"`/backend

mvn clean package

echo
pause 'Project compiled. Press [Enter] to start the server. Then you can open the FrontEnd: '

java -jar `dirname "$0"`/backend/target/todolist-0.0.1-SNAPSHOT.jar
