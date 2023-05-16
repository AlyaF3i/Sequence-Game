import sqlite3
from sqlite3 import Error, Connection
import os
from pathlib import Path
from utilis import TABLES_QUERIES

CREATE_TABLES_RETURN_STRING = f"""
==========================================
the following tables has been created:
%s

the following tables failed to be created:
%s
=========================================="""

def _create_connection(db_file : str) -> Connection:
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

def _create_talbe(conn : Connection, query : str) -> None:
    """takes a connection to a database and query and create the table depending on that query

    Args:
        conn (Connection): connection to the database
        query (str): SQL statement to create a table
    """
    conn.execute(query)
    

def _create_tables(conn : Connection) -> str:
    """takes a connection to a database and go through all the tables statements in the TABLES_QUERIES and create each table

    Args:
        conn (Connection): connection to the database
    """
    tables_created = list()
    tables_failed = list()
    for table_name, query in TABLES_QUERIES.items():
        try:
            _create_talbe(conn, query)
            tables_created.append(table_name)
        except Error as e:
            tables_failed.append(table_name)
            continue
    conn.commit()
    return CREATE_TABLES_RETURN_STRING % (
        "\n".join(tables_created),
        "\n".join(tables_failed)
    )

def create_database() -> None:
    conn = _create_connection(Path(os.path.dirname(os.path.abspath(__file__))) / 'sequence_database.db')
    print(
        _create_tables(conn)
    )
    conn.close()
if __name__ == '__main__':
    path = Path(os.path.dirname(os.path.abspath(__file__))) / 'sequence_database.db'
    create_database()