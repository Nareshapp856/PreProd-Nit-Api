CREATE TABLE Interviewer (
    MemberID INT PRIMARY KEY IDENTITY(1,1), 
    Name VARCHAR(100) NOT NULL, 
    Mobile VARCHAR(15) NOT NULL, 
    Email VARCHAR(320) NOT NULL UNIQUE, 
    CurrentCompany VARCHAR(255), 
    Experience INT CHECK (Experience >= 0), 
    Mode TINYINT CHECK (Mode IN (0, 1)), -- 0 for faculty, 1 for interviewer
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(), 
    UpdatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy VARCHAR(255), 
    UpdatedBy VARCHAR(255)
);

CREATE TABLE Interviewer_Mapping (
    TechnologyID INT NOT NULL, -- Foreign key to Technology table
    MemberID INT NOT NULL, -- Foreign key to Interviewer table
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(), 
    UpdatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy VARCHAR(255), 
    UpdatedBy VARCHAR(255),
    FOREIGN KEY (TechnologyID) REFERENCES Technologies(TechnologyID) 
        ON DELETE CASCADE,
    FOREIGN KEY (MemberID) REFERENCES Interviewer(MemberID) 
        ON DELETE CASCADE 
);

CREATE TABLE BatchInterviewer_Mapping (
    BatchID INT NOT NULL, -- Foreign key from BatchDetailes table
    MemberID INT NOT NULL, -- Foreign key from Interviewer table
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(), 
    UpdatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy VARCHAR(255), 
    UpdatedBy VARCHAR(255),
    FOREIGN KEY (BatchID) REFERENCES BatchDetailes(BatchID) 
        ON DELETE CASCADE,
    FOREIGN KEY (MemberID) REFERENCES Interviewer(MemberID) 
        ON DELETE CASCADE,
    PRIMARY KEY (BatchID, MemberID) -- Composite primary key to avoid duplicates
);

CREATE TABLE EvolutionSheet (
    ID INT PRIMARY KEY IDENTITY(1,1),  -- Using IDENTITY for auto-increment
    MemberID INT NOT NULL,              -- FK from Interviewer table referencing MemberID
    OverallRemarks VARCHAR(500),
	StudentID INT NOT NULL,
    FOREIGN KEY (MemberID) REFERENCES Interviewer(MemberID) ON DELETE CASCADE, -- Assuming there's an Interviewer table
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID) ON DELETE CASCADE -- Assuming there's an Interviewer table
);

CREATE TABLE EvolutionSheet_Mapping (
    ID INT PRIMARY KEY IDENTITY(1,1),  -- Using IDENTITY for auto-increment
    ObtainedMarks INT NOT NULL,
    MaxMarks INT NOT NULL,
    TopicID INT NOT NULL,               -- FK from Topics table referencing TopicID
    EvolutionSheetID INT NOT NULL,      -- FK from EvolutionSheet referencing ID
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID) ON DELETE CASCADE, -- Assuming there's a Topics table
    FOREIGN KEY (EvolutionSheetID) REFERENCES EvolutionSheet(ID) ON DELETE CASCADE
);

CREATE TABLE EvolutionSheet_Module_Mapping (
    ID INT PRIMARY KEY IDENTITY(1,1),  -- Using IDENTITY for auto-increment
    ModuleID INT NOT NULL,              -- FK from Modules table referencing ModuleID
    EvolutionSheetID INT NOT NULL,      -- FK from EvolutionSheet referencing ID
    FOREIGN KEY (ModuleID) REFERENCES Modules(ModuleID) ON DELETE CASCADE, -- Assuming there's a Modules table
    FOREIGN KEY (EvolutionSheetID) REFERENCES EvolutionSheet(ID) ON DELETE CASCADE
);

-- Create the StudentEvolation_Batches table first
CREATE TABLE StudentEvolation_Batches (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(255),
	TechnologyID INT,
    CreactdAT DATETIME,
    UpdatedAt DATETIME,
    CreatedBy VARCHAR(255),
    UpdatedBy VARCHAR(255),
    IsActive BIT,
	FOREIGN KEY (TechnologyID) REFERENCES Technologies(TechnologyID) ON DELETE CASCADE
);

-- Now create the Interviewer_Batch_Mapping table
CREATE TABLE Interviewer_Batch_Mapping (
    ID INT PRIMARY KEY IDENTITY(1,1),
    MemberID INT NOT NULL,
    BatchID INT,
    CreactdAT DATETIME,
    UpdatedAt DATETIME,
    CreatedBy VARCHAR(255),
    UpdatedBy VARCHAR(255),
    IsActive BIT,
    FOREIGN KEY (MemberID) REFERENCES Interviewer(MemberID) ON DELETE CASCADE,
    FOREIGN KEY (BatchID) REFERENCES BatchDetailes(BatchID) ON DELETE CASCADE
);


CREATE TYPE EvolutionTopicMappingTableType AS TABLE (
    TopicID INT,
    ObtainedMarks INT,
    MaxMarks INT
);

CREATE TYPE EvolutionModuleMappingTableType AS TABLE (
    ModuleID INT
);


CREATE TYPE dbo.InterviewerBatchMappingType AS TABLE (
    MemberID INT,
    BatchID INT
);



-- DROP TYPE InterviewerBatchMappingType;
-- DROP TABLE EvolutionSheet;
 