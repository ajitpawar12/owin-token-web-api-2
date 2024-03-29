USE [master]
GO
/****** Object:  Database [SchoolDB]    Script Date: 08-10-2018 21:12:43 ******/
CREATE DATABASE [SchoolDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SchoolDB', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\SchoolDB.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'SchoolDB_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\SchoolDB_log.ldf' , SIZE = 1344KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [SchoolDB] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SchoolDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SchoolDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SchoolDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SchoolDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SchoolDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SchoolDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [SchoolDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SchoolDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SchoolDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SchoolDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SchoolDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SchoolDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SchoolDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SchoolDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SchoolDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SchoolDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SchoolDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SchoolDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SchoolDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SchoolDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SchoolDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SchoolDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SchoolDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SchoolDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SchoolDB] SET  MULTI_USER 
GO
ALTER DATABASE [SchoolDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SchoolDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SchoolDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SchoolDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [SchoolDB] SET DELAYED_DURABILITY = DISABLED 
GO
USE [SchoolDB]
GO
/****** Object:  Table [dbo].[FetchStudent]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FetchStudent](
	[FetchStudentId] [int] IDENTITY(1,1) NOT NULL,
	[StudentId] [int] NULL,
	[StudentEmail] [nvarchar](50) NULL,
 CONSTRAINT [PK_FetchStudent] PRIMARY KEY CLUSTERED 
(
	[FetchStudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[material_master]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[material_master](
	[material_id] [bigint] NOT NULL,
	[material_code] [nvarchar](50) NULL,
	[material_name] [nvarchar](100) NULL,
	[material_desc] [nvarchar](100) NULL,
	[FKmaterial_type_id] [bigint] NULL,
	[material_serial_no] [nvarchar](100) NULL,
	[FKplant_id] [bigint] NULL,
	[storage_location] [nvarchar](100) NULL,
	[IsSalesOrderAssigned] [bit] NULL,
	[created_date] [datetime] NULL,
	[createdBy] [nvarchar](50) NULL,
	[modified_date] [datetime] NULL,
	[modifiedBy] [nvarchar](50) NULL,
	[IsActive] [bit] NULL,
	[IsTractorAttached] [bit] NULL,
	[model_group] [nvarchar](50) NULL,
	[GRN_date] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Student]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Student](
	[StudentId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[BirthDate] [date] NULL,
	[City] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [decimal](18, 0) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifyOn] [datetime] NULL,
	[Password] [nvarchar](50) NULL,
	[UserType] [nvarchar](10) NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tractor_master]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tractor_master](
	[tractor_id] [bigint] NOT NULL,
	[prod_order_no] [nvarchar](100) NULL,
	[material_no] [nvarchar](100) NULL,
	[Fkplant_id] [bigint] NULL,
	[hours] [decimal](18, 2) NULL,
	[tire_brand] [nvarchar](50) NULL,
	[tire_type] [nvarchar](50) NULL,
	[engine_sr_no] [nvarchar](50) NULL,
	[cab_sr_no] [nvarchar](50) NULL,
	[loader_sr_no] [nvarchar](50) NULL,
	[backhoe_sr_no] [nvarchar](50) NULL,
	[mower_sr_no] [nvarchar](50) NULL,
	[production_attach_URL] [nvarchar](100) NULL,
	[remarks] [nvarchar](max) NULL,
	[status] [bit] NULL,
	[createdById] [int] NULL,
	[createdDate] [datetime] NULL,
	[modifiedById] [int] NULL,
	[modifiedDate] [datetime] NULL,
	[tractor_date] [datetime] NULL,
	[goodsIssueNo] [nvarchar](50) NULL,
	[goodsReceipt] [nvarchar](50) NULL,
	[invoiceNo] [nvarchar](50) NULL,
	[salesOrderNo] [nvarchar](50) NULL,
	[serialNo] [nvarchar](50) NULL,
	[backhoeMaterialNo] [nvarchar](50) NULL,
	[cabMaterialNo] [nvarchar](50) NULL,
	[loaderMaterialNo] [nvarchar](50) NULL,
	[mowerMaterialNo] [nvarchar](50) NULL,
	[defect_status] [int] NULL,
	[IsLoaderAttach] [bit] NULL,
	[IsBackHoeAttach] [bit] NULL,
	[IsMowerAttach] [bit] NULL,
	[IsCabinAttach] [bit] NULL,
	[productionNote] [nvarchar](50) NULL,
	[IsAssemblyDone] [bit] NULL,
	[IsLBMDone] [bit] NULL,
	[ROPS] [nvarchar](50) NULL,
	[IsDynoTestRequired] [bit] NULL,
	[InvoiceDate] [nvarchar](50) NULL,
	[kitSerialNo] [nvarchar](100) NULL,
	[FKSales_order_id] [bigint] NULL,
	[tractor_date_LBM] [datetime] NULL,
	[IsShippingDone] [bit] NULL,
	[tractor_date_Shipping] [datetime] NULL,
	[StartInspectionDateTime] [datetime] NULL,
	[EndInspectionDateTime] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  StoredProcedure [dbo].[Sp_DeleteStudent]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sp_DeleteStudent]
@SId int
AS
BEGIN 
DELETE FROM Student 
WHERE StudentId=@SId
END;
GO
/****** Object:  StoredProcedure [dbo].[Sp_GetAllStudents]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sp_GetAllStudents]
AS
BEGIN 
SELECT * FROM Student where UserType='Student'
END;
GO
/****** Object:  StoredProcedure [dbo].[Sp_GetStudentDetailsById]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sp_GetStudentDetailsById]
@SId int
AS
BEGIN 
SELECT StudentId, FirstName, LastName, BirthDate, City, Email, Phone FROM Student 
WHERE StudentId=@SId
END;
GO
/****** Object:  StoredProcedure [dbo].[Sp_InsertStudent]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sp_InsertStudent]
@FName nvarchar(50),
@LName nvarchar(50),
@BDate DATE,
@City nvarchar(50),
@Email nvarchar(50),
@Phone decimal,
@Password nvarchar(50)
AS
BEGIN 
INSERT INTO Student(FirstName,LastName,BirthDate,City,Email,Phone,Password,UserType) VALUES(@FName,@LName,@BDate,@City,@Email,@Phone,@Password,'Student')
END;
GO
/****** Object:  StoredProcedure [dbo].[Sp_UpdateStudent]    Script Date: 08-10-2018 21:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sp_UpdateStudent]
@SId int,
@FName nvarchar(50),
@LName nvarchar(50),
@BDate DATE,
@City nvarchar(50),
@Email nvarchar(50),
@Phone decimal
AS
BEGIN 
UPDATE Student 
SET FirstName=@FName,LastName=@LName,BirthDate=@BDate,City=@City,Email=@Email,Phone=@Phone
WHERE StudentId=@SId
END;
GO
USE [master]
GO
ALTER DATABASE [SchoolDB] SET  READ_WRITE 
GO
