import mysql.connector
from mysql.connector import pooling
from flask import current_app


class Database:
    _connection_pool = None

    @classmethod
    def init_pool(cls):
        if cls._connection_pool is None:
            cls._connection_pool = pooling.MySQLConnectionPool(
                pool_name="campushub_pool",
                pool_size=5,
                host=current_app.config["DB_HOST"],
                user=current_app.config["DB_USER"],
                password=current_app.config["DB_PASSWORD"],
                database=current_app.config["DB_NAME"],
            )

    @classmethod
    def get_connection(cls):
        if cls._connection_pool is None:
            cls.init_pool()
        return cls._connection_pool.get_connection()
