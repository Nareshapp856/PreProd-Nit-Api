SELECT * FROM Interviewer;
SELECT * FROM Interviewer_Mapping;
SELECT * FROM Interviewer_Batch_Mapping;
SELECT * FROM EvolutionSheet;
SELECT * FROM EvolutionSheet_Mapping;
SELECT * FROM EvolutionSheet_Module_Mapping;

SELECT * FROM StudentEvolation_Batches;

SELECT * FROM Technologies
SELECT * FROM BatchDetailes
SELECT * FROM Topics
SELECT * FROM Student
SELECT * FROM Modules

SELECT ID AS id, Name AS name FROM StudentEvolation_Batches WHERE IsActive = 1 AND TechnologyID=2
SELECT i.MemberID AS id, i.Name AS name FROM Interviewer AS i INNER JOIN Interviewer_Mapping AS im ON i.MemberID = im.MemberID WHERE i.IsActive = 1 AND im.TechnologyID=2
SELECT bd.BatchId AS id, bd.BatchName AS name FROM Interviewer_Batch_Mapping AS ibm INNER JOIN BatchDetailes AS bd ON bd.BatchId = ibm.ID WHERE MemberID = 102

DELETE FROM Interviewer;
DELETE FROM Interviewer_Mapping;
DELETE FROM EvolutionSheet;
DELETE FROM EvolutionSheet_Mapping;
DELETE FROM EvolutionSheet_Module_Mapping;
DELETE FROM Interviewer_Batch_Mapping;
DELETE FROM StudentEvolation_Batches;


SELECT 
    ibm.MemberID, 
    i.Name AS name,
    STRING_AGG(ibm.BatchID, ',') AS BatchIDs
FROM 
    Interviewer_Batch_Mapping AS ibm
INNER JOIN
    Interviewer AS i
ON
    ibm.MemberID = i.MemberID
GROUP BY 
    ibm.MemberID, i.Name; -- Need to group by i.Name since it is being selected



--UPDATE StudentEvolation_Batches SET IsActive = 1

--INSERT INTO StudentEvolation_Batches (Name, TechnologyID) VALUES ('b3', 2)
--INSERT INTO Interviewer_Batch_Mapping(InterviewerID, BatchID) VALUES (75, 1)

--SELECT * FROM UserLogin INNER JOIN Facaulty ON Facaulty.Email = UserLogin.Username
--SELECT * FROM Interviewer
--SELECT * FROM Student WHERE Email = 'test@gmail.com'
--SELECT * FROM Student WHERE BatchId = 1

--INSERT INTO UserLogin (Username , UserPassword, IsDefaultPassword) VALUES ('interviewer1@gmail.com', 'iDY12Gn7','Access Request') 

--UPDATE Interviewer_Batch_Mapping SET Interviewer_Batch_Mapping.MemberID = 102

--SELECT 
--    bd.BatchId AS id, 
--    bd.BatchName AS name 
--FROM 
--    Interviewer_Batch_Mapping AS ibm
--INNER JOIN 
--    BatchDetailes AS bd 
--ON 
--    bd.BatchId = ibm.BatchID  -- Corrected join condition
--WHERE 
--    ibm.MemberID = 102;

--SELECT m.ModuleID AS id, m.ModuleName AS name FROM Interviewer_Mapping AS im INNER JOIN Technologies AS t ON im.TechnologyID = t.TechnologyID INNER JOIN Modules AS m ON m.TechnologyID = t.TechnologyID WHERE im.MemberID = 102

--SELECT TopicID AS id, TopicName AS name, ModuleID AS moduleId FROM Topics WHERE ModuleID IN (1,2) AND IsActive = 1

--SELECT * FROM UserLogin WHERE Username = '5est5@gmail.com'
--SELECT * FROM Interviewer

UPDATE Interviewer_Batch_Mapping SET IsActive = 0 WHERE MemberID = 103

select * from Interviewer_Batch_Mapping

 SELECT 
    ibm.MemberID AS interviewerId, 
    i.Name AS name,
    STRING_AGG(ibm.BatchID, ',') AS batchIds,
    STRING_AGG(bd.BatchName, ',') AS batchNames
FROM 
    Interviewer_Batch_Mapping AS ibm
INNER JOIN
    Interviewer AS i ON ibm.MemberID = i.MemberID
INNER JOIN
    BatchDetailes AS bd ON bd.BatchId = ibm.BatchID
WHERE 
    ibm.IsActive = 1
GROUP BY 
    ibm.MemberID, i.Name;

SELECT * FROM UserLogin WHERE Username = '9est9@gmail.com'



DECLARE @NewEvolutionSheetID INT; -- Variable to store the newly inserted ID

-- Execute the stored procedure
EXEC @NewEvolutionSheetID = InsertInToEvolutionSheet 
    @MemberID = 1,             -- Replace with actual MemberID
    @OverallRemarks = 'Good progress.',  -- Remarks for the student
    @StudentID = 123;          -- Replace with actual StudentID

-- Output the new EvolutionSheet ID
SELECT @NewEvolutionSheetID AS NewEvolutionSheetID;
