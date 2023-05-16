# Back-End documentation

## create the database locally 
to create the database you need to run the python create_database.py

## Notes
1. the database that been used is sqlite
2. database_configuration contains the 2 functions
    > **create_database( str : database path )**   
    
    to create a file if the database doesn't exist and to create the needed tables
    > **create_connection( str : database path )**
    
    to retrive the connection for the given database and create the file if it's not ready
3.