
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 01/31/2015 14:49:12
-- Generated from EDMX file: C:\samplewebsites\StartUp\ALogBook\ALogBook\AlgBk\ALogBook\EFData\ALogBook.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [ALogBook];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_UsersLogBook]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[LogBooks] DROP CONSTRAINT [FK_UsersLogBook];
GO
IF OBJECT_ID(N'[dbo].[FK_ClinicSessionsRefClinics]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ClinicSessions] DROP CONSTRAINT [FK_ClinicSessionsRefClinics];
GO
IF OBJECT_ID(N'[dbo].[FK_RefSurgeryLogBook]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[LogBooks] DROP CONSTRAINT [FK_RefSurgeryLogBook];
GO
IF OBJECT_ID(N'[dbo].[FK_UsersClinicSessions]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ClinicSessions] DROP CONSTRAINT [FK_UsersClinicSessions];
GO
IF OBJECT_ID(N'[dbo].[FK_UsersTrainingHistory]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TrainingHistories] DROP CONSTRAINT [FK_UsersTrainingHistory];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Users];
GO
IF OBJECT_ID(N'[dbo].[TrainingHistories]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TrainingHistories];
GO
IF OBJECT_ID(N'[dbo].[RefAbbreviations]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RefAbbreviations];
GO
IF OBJECT_ID(N'[dbo].[RefSurgeries]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RefSurgeries];
GO
IF OBJECT_ID(N'[dbo].[LogBooks]', 'U') IS NOT NULL
    DROP TABLE [dbo].[LogBooks];
GO
IF OBJECT_ID(N'[dbo].[ClinicSessions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ClinicSessions];
GO
IF OBJECT_ID(N'[dbo].[RefClinics]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RefClinics];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FirstName] nvarchar(max)  NULL,
    [LastName] nvarchar(max)  NULL,
    [Email] nvarchar(max)  NULL,
    [Address1] nvarchar(max)  NULL,
    [Address2] nvarchar(max)  NULL,
    [Address3] nvarchar(max)  NULL,
    [Phone1] nvarchar(max)  NULL,
    [Phone2] nvarchar(max)  NULL,
    [TrainingSite] nvarchar(max)  NULL,
    [TrainingYear] nvarchar(max)  NULL,
    [Created] datetime  NULL,
    [Modified] datetime  NULL,
    [Deleted] bit  NULL
);
GO

-- Creating table 'TrainingHistories'
CREATE TABLE [dbo].[TrainingHistories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [StartDate] datetime  NOT NULL,
    [EndDate] datetime  NOT NULL,
    [Year] smallint  NOT NULL,
    [UsersId] int  NOT NULL,
    [Created] datetime  NULL,
    [Modified] datetime  NULL,
    [Deleted] bit  NULL
);
GO

-- Creating table 'RefAbbreviations'
CREATE TABLE [dbo].[RefAbbreviations] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Code] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [Created] datetime  NULL,
    [Modified] datetime  NULL,
    [Deleted] bit  NULL
);
GO

-- Creating table 'RefSurgeries'
CREATE TABLE [dbo].[RefSurgeries] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Type] nvarchar(max)  NOT NULL,
    [Created] datetime  NULL,
    [Modified] datetime  NULL,
    [Deleted] bit  NULL
);
GO

-- Creating table 'LogBooks'
CREATE TABLE [dbo].[LogBooks] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Date] datetime  NULL,
    [MRN] nvarchar(max)  NULL,
    [Procedure] nvarchar(max)  NULL,
    [Indication] nvarchar(max)  NULL,
    [Assist] bit  NULL,
    [Supervised] bit  NULL,
    [Unsupervised] bit  NULL,
    [TeachingByTrainee] nvarchar(max)  NULL,
    [Comments] nvarchar(max)  NULL,
    [UsersId] int  NOT NULL,
    [RefSurgeryId] int  NOT NULL,
    [Deleted] bit  NOT NULL,
    [Created] datetime  NULL,
    [Modified] datetime  NULL
);
GO

-- Creating table 'ClinicSessions'
CREATE TABLE [dbo].[ClinicSessions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Date] nvarchar(max)  NOT NULL,
    [RefClinicsId] int  NOT NULL,
    [UsersId] int  NOT NULL,
    [Created] datetime  NULL,
    [Modified] datetime  NULL,
    [Deleted] bit  NULL
);
GO

-- Creating table 'RefClinics'
CREATE TABLE [dbo].[RefClinics] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Type] nvarchar(max)  NOT NULL,
    [Created] datetime  NULL,
    [Modified] datetime  NULL,
    [Deleted] bit  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TrainingHistories'
ALTER TABLE [dbo].[TrainingHistories]
ADD CONSTRAINT [PK_TrainingHistories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'RefAbbreviations'
ALTER TABLE [dbo].[RefAbbreviations]
ADD CONSTRAINT [PK_RefAbbreviations]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'RefSurgeries'
ALTER TABLE [dbo].[RefSurgeries]
ADD CONSTRAINT [PK_RefSurgeries]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'LogBooks'
ALTER TABLE [dbo].[LogBooks]
ADD CONSTRAINT [PK_LogBooks]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ClinicSessions'
ALTER TABLE [dbo].[ClinicSessions]
ADD CONSTRAINT [PK_ClinicSessions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'RefClinics'
ALTER TABLE [dbo].[RefClinics]
ADD CONSTRAINT [PK_RefClinics]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UsersId] in table 'LogBooks'
ALTER TABLE [dbo].[LogBooks]
ADD CONSTRAINT [FK_UsersLogBook]
    FOREIGN KEY ([UsersId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UsersLogBook'
CREATE INDEX [IX_FK_UsersLogBook]
ON [dbo].[LogBooks]
    ([UsersId]);
GO

-- Creating foreign key on [RefClinicsId] in table 'ClinicSessions'
ALTER TABLE [dbo].[ClinicSessions]
ADD CONSTRAINT [FK_ClinicSessionsRefClinics]
    FOREIGN KEY ([RefClinicsId])
    REFERENCES [dbo].[RefClinics]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ClinicSessionsRefClinics'
CREATE INDEX [IX_FK_ClinicSessionsRefClinics]
ON [dbo].[ClinicSessions]
    ([RefClinicsId]);
GO

-- Creating foreign key on [RefSurgeryId] in table 'LogBooks'
ALTER TABLE [dbo].[LogBooks]
ADD CONSTRAINT [FK_RefSurgeryLogBook]
    FOREIGN KEY ([RefSurgeryId])
    REFERENCES [dbo].[RefSurgeries]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_RefSurgeryLogBook'
CREATE INDEX [IX_FK_RefSurgeryLogBook]
ON [dbo].[LogBooks]
    ([RefSurgeryId]);
GO

-- Creating foreign key on [UsersId] in table 'ClinicSessions'
ALTER TABLE [dbo].[ClinicSessions]
ADD CONSTRAINT [FK_UsersClinicSessions]
    FOREIGN KEY ([UsersId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UsersClinicSessions'
CREATE INDEX [IX_FK_UsersClinicSessions]
ON [dbo].[ClinicSessions]
    ([UsersId]);
GO

-- Creating foreign key on [UsersId] in table 'TrainingHistories'
ALTER TABLE [dbo].[TrainingHistories]
ADD CONSTRAINT [FK_UsersTrainingHistory]
    FOREIGN KEY ([UsersId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UsersTrainingHistory'
CREATE INDEX [IX_FK_UsersTrainingHistory]
ON [dbo].[TrainingHistories]
    ([UsersId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------