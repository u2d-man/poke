package main

import (
	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func GetDB(batch bool) (*sqlx.DB, error) {
	mysqlConfig := mysql.NewConfig()
	mysqlConfig.Net = "tcp"
	mysqlConfig.Addr = "db" + ":" + "3306"
	mysqlConfig.User = "trainer"
	mysqlConfig.Passwd = "secret"
	mysqlConfig.DBName = "poke"
	mysqlConfig.MultiStatements = batch
	mysqlConfig.InterpolateParams = true

	return sqlx.Open("mysql", mysqlConfig.FormatDSN())
}
