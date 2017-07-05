---
title: Azure SQL Database libraries for Java
description: Connect to Azure SQL database using the JDBC driver or mangement Azure SQL database instances with the management API.
keywords: Azure, Java, SDK, API, SQL, database , JDBC
author: rloutlaw
ms.author: routlaw
manager: douge
ms.date: 07/05/2017
ms.topic: reference
ms.prod: azure
ms.technology: azure
ms.devlang: java
ms.service: sql-database
---

# Azure SQL Database libraries for Java

## Overview

Azure SQL Database is a relational database service using the Microsoft SQL Server engine that supports relational, JSON, spatial, and XML data. 

## Client JDBC driver

[Add a dependency](https://maven.apache.org/guides/getting-started/index.html#How_do_I_use_external_dependencies) to your Maven `pom.xml` file to use the [SQL database JDBC driver](/sql/connect/jdbc/microsoft-jdbc-driver-for-sql-server) in your project.


```XML
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <version>6.2.0.jre8</version>
</dependency>
```   

### Example

Use a JDBC connection string to connect to SQL database and select all records in a table.

```java
Connection conn = DriverManager.getConnection(connectionString);
Statement statement = conn.createStatement();
ResultSet resultSet = statement.executeQuery("SELECT * FROM SALES");
```

## Management API

Create and manage Azure SQL Database instances in your subscription with the management API. [Add a dependency](https://maven.apache.org/guides/getting-started/index.html#How_do_I_use_external_dependencies) to your Maven `pom.xml` file to use the management API in your project.


```XML
<dependency>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>azure-mgmt-sql</artifactId>
    <version>1.1.0</version>
</dependency>
```

### Example

Create a SQL Database service instance and restrict access to a range of IP addresses using a firewall rule with the management API.

```java
SqlServer sqlServer = azure.sqlServers().define(sqlServerName)
                    .withRegion(Region.US_EAST)
                    .withNewResourceGroup(rgName)
                    .withAdministratorLogin(administratorLogin)
                    .withAdministratorPassword(administratorPassword)
                    .withNewFirewallRule(startIPAddress, endIPAddress)
                    .create();
```

## Samples

[!INCLUDE [java-sql-samples](../docs-ref-conceptual/includes/sql.md)]

View the [complete list]((https://azure.microsoft.com/resources/samples/?platform=java&term=SQL)) of Azure SQL database samples.