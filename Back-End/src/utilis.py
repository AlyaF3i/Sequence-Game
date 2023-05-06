
TABLES_QUERIES = {
    "User" : """ CREATE TABLE User
                (Session_Id TEXT PRIMARY KEY,
                Username TEXT NOT NULL,
                Is_bot INTEGER NOT NULL,
                IP TEXT NOT NULL,
                Port INTEGER NOT NULL); 
    """,
    "Game" : """CREATE TABLE Game
                (Id INTEGER PRIMARY KEY,
                Owner_Session_Id TEXT NOT NULL,
                Size INTEGER NOT NULL,
                Status TEXT NOT NULL,
                FOREIGN KEY (Owner_Session_Id) REFERENCES User(Session_Id));
    """,
    "Users_in_Game" : """CREATE TABLE Users_in_Game
                (Field_Id INTEGER NOT NULL,
                Game_Id INTEGER NOT NULL,
                Session_Id TEXT NOT NULL,
                PRIMARY KEY (Field_Id, Game_Id),
                FOREIGN KEY (Game_Id) REFERENCES Game(Id),
                FOREIGN KEY (Session_Id) REFERENCES User(Session_Id));
    """
}