-- Fetch Assigned Curriculum List
-- Assign Curriculum
SELECT
	*
FROM
	facultyCourse_curriculum
WHERE
	facultyId = 2 AND status = 'approved' AND IsActive = 1




-- Fetch Approved Batch List
-- Assign Curriculum

-- V1
SELECT
    bd.BatchName AS name,
    bd.BatchId AS id,
    t.TechnologyName AS technologyName,
	bd.Start_Date AS startDate

FROM
    BatchDetailes AS bd
JOIN
    Technologies AS t ON bd.TechnologyId = t.TechnologyID
JOIN
    AssignedBatches AS ab ON bd.BatchId = ab.BatchId
JOIN
    BatchApproval AS ba ON ba.AssignedBatchesId = ab.ID
WHERE
    ab.FacultyId = 2;

-- V2
SELECT
    bd.BatchName AS name,
    bd.BatchId AS id,
    t.TechnologyName AS technologyName,
    ab.StartDate AS startDate,
	ab.Time AS time
FROM
    BatchDetailes AS bd
JOIN
    Technologies AS t ON bd.TechnologyId = t.TechnologyID
JOIN
    AssignedBatches AS ab ON bd.BatchId = ab.BatchId
JOIN
    BatchApproval AS ba ON ab.ID = ba.AssignedBatchesId
WHERE
    ab.FacultyId = 2;


-- Assign Curriulum -> show assigned curriculum
-- Shows details of a curriculum of a faculty
SELECT 
    a.ID AS id, 
    bd.BatchName AS batchName, 
    fcc.courseCurriculam_Name AS curriculumName,
    ab.StartDate AS startDate, 
    ab.Time AS time
FROM 
    AssignedCurriculum AS a
JOIN 
    AssignedBatches AS ab ON a.AssignedBatchesId = ab.ID
JOIN 
    BatchDetailes AS bd ON bd.BatchId = ab.BatchId
JOIN 
    facultyCourse_curriculum AS fcc ON fcc.curriculam_Id = a.CurriculumId
WHERE 
    a.FacultyId = 2;

SELECT 
    ac.ID AS id,
	ac.AssignedBatchesId AS assignedBatchesId,
    fcc.curriculam_Id AS curriculumId,
    fcc.courseCurriculam_Name AS curriculumName,
    bd.BatchName AS batchName,
	bd.BatchId AS batchId,
    ab.StartDate AS startDate,
    ab.Time AS time,
	t.TechnologyName AS technologyName
FROM 
    AssignedCurriculum ac
JOIN 
    AssignedBatches ab ON ac.AssignedBatchesId = ab.ID
JOIN 
    facultyCourse_curriculum fcc ON fcc.curriculam_Id = ac.CurriculumId
JOIN 
    BatchDetailes bd ON bd.BatchId = ab.BatchId
JOIN
	Technologies t ON t.TechnologyID = bd.TechnologyId
WHERE 
    ac.ID = 2;

SELECT 
    ba.ID AS id, 
    ab.StartDate AS startDate, 
    ab.Time AS time, 
    f.Facaulty_Name AS facultyName, 
    ba.AdminId AS createdBy, 
    bd.BatchName AS batchName,
	ba.Status AS status,
	ba.Reasons AS reasons,
	ba.Comment AS comments
FROM 
    AssignedBatches AS ab
INNER JOIN 
    BatchApproval AS ba ON ba.AssignedBatchesId = ab.ID
INNER JOIN 
    Facaulty AS f ON f.Facaulty_Id = ba.FacultyId
INNER JOIN 
    BatchDetailes AS bd ON bd.BatchId = ab.BatchId;


SELECT * FROM AssignedCurriculum
SELECT * FROM AssignedBatches

SELECT * FROM AssignedBatches
SELECT * FROM BatchApproval

UPDATE BatchApproval SET AdminId=2 where ID=2039

DELETE FROM AssignedBatches WHERE ID = 1022
DELETE FROM BatchApproval WHERE ID = 1021



-- SELECT STATMENTS OF ALL TABLES
SELECT * FROM BatchDetailes
SELECT * FROM BatchApproval 
select * from AssignedBatches
SELECT * FROM AssignedCurriculum

SELECT * FROM facultyCourse_Mapping
SELECT * FROM facultyCourse_curriculum
SELECT * FROM Course_BatchDetails
SELECT * FROM Scheduling_NIT

SELECT * FROM Facaulty

--DELETE FROM Scheduling_NIT
--DELETE FROM facultyCourse_curriculum
--DELETE FROM facultyCourse_Mapping
--DELETE FROM Course_BatchDetails
--DELETE FROM AssignedBatches
--DELETE FROM BatchApproval
--DELETE FROM AssignedCurriculum

