ALTER PROCEDURE RegisterInterviewer (
    @Name VARCHAR(100),
    @Mobile VARCHAR(15),
    @Email VARCHAR(320),
    @CurrentCompany VARCHAR(255),
    @Experience INT,
    @Mode TINYINT,
    @Technologies VARCHAR(MAX),
    @CreatedBy VARCHAR(255)
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if email already exists
    IF EXISTS (SELECT 1 FROM Interviewer WHERE Email = @Email)
    BEGIN
        RAISERROR('Email already exists', 16, 1);
        RETURN;
    END

    -- Check if name already exists
    IF EXISTS (SELECT 1 FROM Interviewer WHERE Name = @Name)
    BEGIN
        RAISERROR('Name already exists', 16, 1);
        RETURN;
    END

    -- Check if mobile number already exists
    IF EXISTS (SELECT 1 FROM Interviewer WHERE Mobile = @Mobile)
    BEGIN
        RAISERROR('Mobile Number already exists', 16, 1);
        RETURN;
    END

    DECLARE @MemberID INT;

    BEGIN TRY
        -- Insert into Interviewer table
        INSERT INTO Interviewer (Name, Mobile, Email, CurrentCompany, Experience, Mode, IsActive, CreatedAt, CreatedBy)
        VALUES (@Name, @Mobile, @Email, @CurrentCompany, @Experience, @Mode, 1, GETDATE(), @CreatedBy);

        -- Get the generated MemberID
        SET @MemberID = SCOPE_IDENTITY();

        -- Split the comma-separated technologies and insert into Interviewer_Mapping
        DECLARE @TechID INT;
        DECLARE @TechList TABLE (TechnologyID INT);

        -- Insert technologies into a temp table
        INSERT INTO @TechList (TechnologyID)
        SELECT value FROM STRING_SPLIT(@Technologies, ',');

        -- Insert into Interviewer_Mapping
        INSERT INTO Interviewer_Mapping (TechnologyID, MemberID, IsActive, CreatedAt, CreatedBy)
        SELECT TechnologyID, @MemberID, 1, GETDATE(), @CreatedBy
        FROM @TechList
        WHERE TechnologyID IN (SELECT TechnologyID FROM Technologies);

    END TRY
    BEGIN CATCH
        -- Handle errors
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        -- Optionally log the error here
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;



EXEC RegisterInterviewer 
    @Name = 'John Doe 2',
    @Mobile = '1234567891',
    @Email = 'john2.doe@example.com',
    @CurrentCompany = 'Tech Solutions',
    @Experience = 5,
    @Mode = 1, -- 0 for faculty, 1 for interviewer
    @Technologies = '1,2', -- Comma-separated technology IDs
    @CreatedBy = 'Admin';



ALTER PROCEDURE InsertEvolutionData
    @MemberID INT,
    @OverallRemarks VARCHAR(500) = NULL,
	@StudentID INT,
    @MappingData EvolutionTopicMappingTableType READONLY,
    @ModuleData EvolutionModuleMappingTableType READONLY
AS
BEGIN
    SET NOCOUNT ON;

    -- Step 1: Insert into EvolutionSheet
    DECLARE @EvolutionSheetID INT;

    INSERT INTO EvolutionSheet (
        MemberID,
        OverallRemarks,
		StudentID
    )
    VALUES (
        @MemberID,
        @OverallRemarks,
		@StudentID
    );

    -- Get the ID of the newly inserted EvolutionSheet
    SET @EvolutionSheetID = SCOPE_IDENTITY();

    -- Step 2: Insert into EvolutionSheet_Mapping for each entry in MappingData
    INSERT INTO EvolutionSheet_Mapping (
        ObtainedMarks,
        MaxMarks,
        TopicID,
        EvolutionSheetID
    )
    SELECT 
        ObtainedMarks,
        MaxMarks,
        TopicID,
        @EvolutionSheetID
    FROM @MappingData;

	
    -- Step 3: Insert into EvolutionSheet_Module_Mapping for each entry in ModuleData
    INSERT INTO EvolutionSheet_Module_Mapping (
        ModuleID,
        EvolutionSheetID
    )
    SELECT 
        ModuleID,
        @EvolutionSheetID
    FROM @ModuleData;

END;

-- Step 1: Declare a variable of the table type for @MappingData
DECLARE @MappingData EvolutionTopicMappingTableType;

-- Step 2: Insert some data into the table variable (adjust data according to your schema)
INSERT INTO @MappingData (ObtainedMarks, MaxMarks, TopicID)
VALUES 
    (85, 100, 1),  -- Example topic 1
    (90, 100, 2),  -- Example topic 2
    (75, 100, 3);  -- Example topic 3

-- Step 3: Execute the stored procedure
EXEC InsertEvolutionData
    @MemberID = 101,                      -- Example Member ID
    @OverallRemarks = 'Good performance', -- Example remarks
    @Mode = 1,                            -- Example mode (bit value, 1 or 0)
    @StudentID = 1065,                     -- Example Student ID
    @MappingData = @MappingData;          -- Passing the table variable



DROP PROC InsertEvolutionSheet


DECLARE @MappingData EvolutionTopicMappingTableType;
DECLARE @ModuleData EvolutionModuleMappingTableType;

-- Insert some example data into MappingData
INSERT INTO @MappingData (TopicID, ObtainedMarks, MaxMarks)
VALUES 
    (1, 80, 100),
    (2, 75, 100),
    (3, 90, 100);

-- Insert some example data into ModuleData
INSERT INTO @ModuleData (ModuleID)
VALUES 
    (1),
    (2);

-- Call the procedure
EXEC InsertEvolutionData
    @MemberID = 75,
    @OverallRemarks = 'Good job!',
    @Mode = 1, -- 1 for Interviewer
	@StudentID = 1065,
    @MappingData = @MappingData,
    @ModuleData = @ModuleData;


ALTER PROCEDURE Usp_InsertInterviewerBatchMapping
    @InterviewerBatchMappings dbo.InterviewerBatchMappingType READONLY -- Table-valued parameter
AS
BEGIN
    -- Step 1: Soft delete all existing mappings for the given MemberIDs by setting IsActive = 0
    UPDATE ibm
    SET IsActive = 0
    FROM Interviewer_Batch_Mapping AS ibm
    WHERE EXISTS (
        SELECT 1 
        FROM @InterviewerBatchMappings AS tvp
        WHERE ibm.MemberID = tvp.MemberID
    );

    -- Step 2: Insert new mappings or reactivate existing soft-deleted records
    MERGE INTO Interviewer_Batch_Mapping AS target
    USING @InterviewerBatchMappings AS source
    ON target.MemberID = source.MemberID AND target.BatchID = source.BatchID
    WHEN MATCHED AND target.IsActive = 0 THEN
        -- Reactivate soft-deleted record
        UPDATE SET IsActive = 1, UpdatedAt = GETDATE(), UpdatedBy = 'Admin'
    WHEN NOT MATCHED THEN
        -- Insert new record
        INSERT (MemberID, BatchID, CreactdAT, CreatedBy, IsActive)
        VALUES (source.MemberID, source.BatchID, GETDATE(), 'Admin', 1);
END;

-- DROP PROC Usp_InsertInterviewerBatchMapping

CREATE PROCEDURE InsertInToEvolutionSheet 
    @MemberID INT, 
    @OverallRemarks VARCHAR(255) = NULL,  -- Specify the length for VARCHAR
    @StudentID INT
AS
BEGIN
    -- Check if a record already exists
    IF EXISTS (SELECT 1 FROM EvolutionSheet WHERE MemberID = @MemberID AND StudentID = @StudentID)
    BEGIN
        RAISERROR ('ALREADY EXISTS', 16, 1);
        RETURN; -- Exit the procedure
    END

    -- Insert new record
    INSERT INTO EvolutionSheet (MemberID, OverallRemarks, StudentID)
    VALUES (@MemberID, @OverallRemarks, @StudentID);

    -- Return the newly inserted ID
    SELECT SCOPE_IDENTITY() AS EvolutionSheetID;
END