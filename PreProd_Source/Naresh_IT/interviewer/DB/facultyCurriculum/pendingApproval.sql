
SELECT * FROM BatchApproval
SELECT * FROM AssignedBatches
SELECT * FROM AssignedCurriculum

--DELETE FROM AssignedCurriculum
--DELETE FROM BatchApproval 
--DELETE FROM AssignedBatches 

--DROP TABLE AssignedCurriculum
--DROP TABLE BatchApproval
--DROP TABLE AssignedBatches
--DROP TABLE Logger

-- CREATE
-- Table 1: AssignedBatches
CREATE TABLE AssignedBatches (
    ID INT NOT NULL IDENTITY(1,1),  -- Auto-increment primary key
    BatchId INT NOT NULL,
    FacultyId INT NOT NULL,
	StartDate Date,
	Time Varchar(50),
    IsActive BIT,
    CreatedAt DATETIME,  -- Using DATETIME for date and time
    UpdatedAt DATETIME,
    CreatedBy VARCHAR(255),  -- VARCHAR with specified length
    UpdatedBy VARCHAR(255),
    PRIMARY KEY (ID),  -- Primary key
    FOREIGN KEY (BatchId) REFERENCES BatchDetailes(BatchId),  -- FK to BatchId in AssignedBatches
    FOREIGN KEY (FacultyId) REFERENCES Facaulty(Facaulty_Id)  -- FK to FacultyId as TechnologyId
);

-- Table 2: BatchApproval
CREATE TABLE BatchApproval (
    ID INT NOT NULL IDENTITY(1,1),  -- Auto-increment primary key
    AssignedBatchesId INT,  -- Foreign key to AssignedBatches
    AdminId INT,
	FacultyId INT,
    Status VARCHAR(140),
	Reasons VARCHAR(MAX),	
    Comment VARCHAR(MAX),
    IsActive BIT,
    CreatedAt DATETIME,  -- Using DATETIME for date and time
    UpdatedAt DATETIME,
    CreatedBy VARCHAR(255),
    UpdatedBy VARCHAR(255),
    PRIMARY KEY (ID),  -- Primary key
    FOREIGN KEY (AssignedBatchesId) REFERENCES AssignedBatches(ID),  -- FK to AssignedBatches
);

-- Table 3: AssignedCurriculum |Stores assigned curriculum that has BatchId, FacultyId, CurriculumId, AdminId
CREATE TABLE AssignedCurriculum (
    ID INT NOT NULL IDENTITY(1,1),  -- Auto-increment primary key
    AssignedBatchesId INT,  -- Foreign key to AssignedBatches
	FacultyId INT,
	CurriculumId UNIQUEIDENTIFIER,
    IsActive BIT,
    CreatedAt DATETIME,  -- Using DATETIME for date and time
    UpdatedAt DATETIME,
    PRIMARY KEY (ID),  -- Primary key
    FOREIGN KEY (AssignedBatchesId) REFERENCES AssignedBatches(ID),  -- FK to AssignedBatches
    FOREIGN KEY (FacultyId) REFERENCES Facaulty(Facaulty_Id),  -- FK to FacultyId as FacultyId
    FOREIGN KEY (CurriculumId) REFERENCES facultyCourse_curriculum(curriculam_Id)  -- FK to FacultyId as FacultyId
);

--CREATE TABLE Logger (msg VARCHAR(50))



INSERT INTO AssignedBatches (BatchId, FacultyId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES (1, 1, 1, GETDATE(), 'Admin', GETDATE(), 'Admin');

-- SP'S

-- fetchAssignedBatchDetails
ALTER PROC USP_FetchAssignedBatchDetails(
@AssignedBatchesID INT
)
AS
BEGIN
	SELECT
		ab.ID AS id,
		ab.BatchId AS batchId,
		ab.FacultyId AS facultyId,
		f.Facaulty_Name AS facultyName,
		bd.BatchName AS batchName,
		t.TechnologyName as technologyName
	FROM
		AssignedBatches AS ab
	JOIN
		Facaulty AS f ON f.Facaulty_Id = ab.FacultyId
	JOIN
		BatchDetailes AS bd ON bd.BatchId = ab.BatchId
	JOIN
		Technologies AS t ON t.TechnologyID = bd.TechnologyId
	WHERE 
		ID = @AssignedBatchesID;
END
GO

EXEC USP_FetchAssignedBatchDetails @AssignedBatchesID=8

-- to insert new combination when admin created
ALTER PROCEDURE USP_InsertInToAssignedBatches
    @BatchId INT,
    @FacultyId INT, 
    @AdminId INT
AS
BEGIN
    -- Check if the batch and faculty combination already exists
    IF EXISTS (SELECT 1 FROM AssignedBatches WHERE BatchId = @BatchId AND FacultyId = @FacultyId)
    BEGIN
        -- Raise an error to indicate the record already exists
        RAISERROR('Already assigned', 16, 1);
        RETURN; -- Exit the procedure
    END

    -- Insert new record if it doesn't exist
    INSERT INTO AssignedBatches (BatchId, FacultyId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
    VALUES (@BatchId, @FacultyId, 1, GETDATE(), 'Admin', GETDATE(), 'Admin');

    -- Retrieve the ID of the inserted record
    DECLARE @Id INT;
    SET @Id = SCOPE_IDENTITY(); -- Get the last inserted identity value

    -- Insert into BatchApproval
    INSERT INTO BatchApproval (AssignedBatchesId, AdminId, FacultyId, Status, IsActive, CreatedAt, CreatedBy)
    VALUES (@Id, @AdminId, @FacultyId, 'pending', 1, GETDATE(), 'Admin');
END
GO


-- when faculty approve or rejected the assignment
-- pending approval page
ALTER PROCEDURE USP_UpdateAssignedBatchStatus(
    @AssignedBatchesId INT,
    @Status VARCHAR(140),
	@Comments VARCHAR(MAX) = NULL,
	@Reasons VARCHAR(MAX) = NULL,
    @Time VARCHAR(50) = NULL,
    @StartDate DATE = NULL
)
AS
BEGIN
    DECLARE @CurrentDateTime DATETIME = GETDATE();

    IF EXISTS (SELECT 1 FROM AssignedBatches WHERE ID = @AssignedBatchesId)
    BEGIN
        UPDATE AssignedBatches 
        SET 
            Time = @Time ,
            StartDate = @StartDate,
            UpdatedAt = @CurrentDateTime
        WHERE ID = @AssignedBatchesId;
    END


    IF EXISTS (SELECT 1 FROM BatchApproval WHERE AssignedBatchesId = @AssignedBatchesId)
    BEGIN
        UPDATE BatchApproval 
        SET 
            Status = @Status,
			Comment= @Comments,
			Reasons = @Reasons,
            UpdatedAt = @CurrentDateTime
        WHERE AssignedBatchesId = @AssignedBatchesId;
    END
END
GO

DROP PROC USP_UpdateAssignedBatchestatus

EXEC USP_UpdateAssignedBatchStatus 
    @AssignBatchdetailsId = 1, 
    @Status = 'approved', 
    @Comments = 'none for now',
	@Reasons = 'noreason for now',
    @Time = '09:50',
    @StartDate = '2023-12-8' 



ALTER PROC USP_InsertIntoAssingedCurriculum(
  @FacultyID INT,
  @AssignedBatchesID INT,
  @CurriculumID UNIQUEIDENTIFIER,
  @StartDate DATE,
  @Time Varchar(50)
)
AS
BEGIN
  -- Check if the curriculum is already assigned to the same faculty and batch
  IF EXISTS(SELECT 1 FROM AssignedCurriculum 
            WHERE AssignedBatchesId = @AssignedBatchesID 
              AND CurriculumId = @CurriculumID 
              AND FacultyId = @FacultyID)
  BEGIN
    RAISERROR('Already assigned', 16, 1);
    RETURN;
  END

  -- Check if the batch is already reserved for the faculty, regardless of curriculum
  IF EXISTS(SELECT 1 FROM AssignedCurriculum 
            WHERE AssignedBatchesId = @AssignedBatchesID 
              AND FacultyId = @FacultyID)
  BEGIN
    RAISERROR('Already reserved', 16, 1);
    RETURN;
  END

  -- Insert the new assignment into AssignedCurriculum
  INSERT INTO AssignedCurriculum(AssignedBatchesId, FacultyId, CurriculumId, CreatedAt, IsActive) 
  VALUES (@AssignedBatchesID, @FacultyID, @CurriculumID, GETDATE(), 1);

  UPDATE AssignedBatches
	SET StartDate = @StartDate,
	Time = @Time
	WHERE ID = @AssignedBatchesID

END
GO

EXEC USP_InsertIntoAssingedCurriculum 2, 1, '07A7E665-EB0C-4289-B713-3ACFE5A98250'


ALTER PROCEDURE USP_UpdatedAssingedCurriculum(
    @ID INT,
    @AssignedBatchesId INT,
    @CurriculumID UNIQUEIDENTIFIER,
	@StartDate DATE,
	@Time Varchar(50)
)
AS
BEGIN
    -- Check if the faculty has another approved curriculum assigned on the same date and time
	IF EXISTS (SELECT 1 FROM AssignedCurriculum WHERE AssignedBatchesId = @AssignedBatchesId AND CurriculumId = @CurriculumID AND NOT ID = @ID)
	BEGIN
		RAISERROR('Already assigned', 16, 1);
		RETURN;
	END


    -- If no conflict, update the curriculum
    UPDATE AssignedCurriculum
    SET CurriculumId = @CurriculumID, 
        AssignedBatchesId = @AssignedBatchesId, 
        UpdatedAt = GETDATE()
    WHERE ID = @ID;

	
	UPDATE AssignedBatches
	SET StartDate = @StartDate,
		Time = @Time
	WHERE ID = @AssignedBatchesId 
END
GO

ALTER PROCEDURE DeleteAssignedBatch (@ID INT, @AdminID INT)
AS
BEGIN
	IF NOT EXISTS ( SELECT 1 FROM BatchApproval WHERE ID = @ID AND AdminId = @AdminID)
	BEGIN
		RAISERROR ('Not Authorized', 16, 1);
		RETURN;
	END

    DECLARE @AssignedBatchesId INT;
    DECLARE @Status VARCHAR(50); -- Adjust the size/type based on your actual status column

    -- Retrieve the AssignedBatchesId and Status from BatchApproval
    SELECT @AssignedBatchesId = AssignedBatchesId, @Status = Status 
    FROM BatchApproval 
    WHERE ID = @ID;

    -- Check if AssignedBatchesId was found and if status is not approved before proceeding with deletion
    IF @AssignedBatchesId IS NOT NULL AND @Status <> 'approved'
    BEGIN
        -- Delete the record from BatchApproval
        DELETE FROM BatchApproval 
        WHERE ID = @ID;

        -- Delete the record from AssignedBatches using the retrieved AssignedBatchesId
        DELETE FROM AssignedBatches 
        WHERE ID = @AssignedBatchesId;
    END
    ELSE
    BEGIN
        -- Optional: Handle cases where no matching BatchApproval ID was found or status is approved
        IF @AssignedBatchesId IS NULL
        BEGIN
            RAISERROR ('No matching BatchApproval record found.', 16, 1);
        END
        ELSE
        BEGIN
            RAISERROR ('Cannot delete record because BatchApproval status is approved.', 16, 1);
        END
    END
END
GO

--SELECT * FROM Logger
SELECT * FROM facultyCourse_curriculum
SELECT * FROM facultyCourse_Mapping
SELECT * FROM AssignedCurriculum
SELECT * FROM AssignedBatches
SELECT * FROM BatchApproval
SELECT * FROM Facaulty

--DELETE FROM Logger
DELETE FROM AssignedCurriculum
DELETE FROM AssignedBatches
DELETE FROM BatchApproval
DELETE FROM facultyCourse_curriculum
DELETE FROM facultyCourse_Mapping

DELETE FROM AssignedCurriculum WHERE ID = 2049

