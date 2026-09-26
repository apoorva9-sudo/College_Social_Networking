-- Run only after every row reported by the previous migration has been
-- assigned to the correct course.
ALTER TABLE materials
    MODIFY COLUMN course_id INT NOT NULL;
