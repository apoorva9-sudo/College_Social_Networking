-- Add the relationship without discarding existing material rows.
ALTER TABLE materials
    ADD COLUMN course_id INT NULL;

-- Automatically associate materials whose uploader has an assigned course.
UPDATE materials m
JOIN courses c ON c.faculty_id = m.uploaded_by
SET m.course_id = c.course_id
WHERE m.course_id IS NULL;

ALTER TABLE materials
    ADD CONSTRAINT fk_materials_course
        FOREIGN KEY (course_id) REFERENCES courses(course_id);

-- Review and manually assign any remaining rows before applying
-- 20260926_02_require_material_course.sql.
SELECT material_id, uploaded_by, title
FROM materials
WHERE course_id IS NULL;
