import sqlite3
from sqlite3 import Error
from sqlite3 import Connection
def create_connection(db_file : str) -> Connection:
    """a function to return a connection to the given file with the path `db_file` 

    Args:
        db_file (str): path to the database

    Returns:
        Connection: the connection to the database
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(f"{e}\nyou need to run the create_database file first\nalso make sure that the filepath in the .env is right path to the database")

    return conn

if __name__ == '__main__':
    
    connection = create_connection(r'C:\Users\Marwan\Desktop\Sequence-Game\Back-End\src\create_database.py')
    print(type(connection))
    