# Faculty Curriculum Management

## Overview

Faculties can create and update course curriculums, typically updated every 6-7 months.

## Creating a Curriculum `Create Course Curriculum`

### Inputs

- **Course Curriculum Name**: Text field for the curriculum name.
- **Upload File**: Excel upload to populate a table with curriculum details.

### Table Structure

- **Topics**: Dropdown to select the primary topic.
- **Subtopics**: Multi-select field for related subtopics (linked to the selected topic).

### Submission

When submitting the curriculum, the following data is required:

- `facultyId`: ID of the faculty member.
- `courseCurriculumId`: ID of the course curriculum.
- `type`: Type of update or creation.
- `mappingId`: ID for mapping the curriculum to courses or departments.

## Integrated Features

- **Testing**: No Testing Required.
