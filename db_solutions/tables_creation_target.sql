CREATE SCHEMA dm; --слой витрин

CREATE SCHEMA ds; -- детальный слой

CREATE SCHEMA stg; -- стейдж слой

CREATE SCHEMA logs; -- слой логов

-- Создаю сиквенсы (последовательности) для автоматического присваивания значений ключевым таблицам:
-- Пример:
CREATE SEQUENCE users_uid_seq
    INCREMENT 1 START 6722
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
--
CREATE TABLE ds.users (
    uid INT PRIMARY KEY DEFAULT nextval('users_uid_seq'),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_name VARCHAR(30),
    first_name VARCHAR(30),
    middle_name VARCHAR(30),
    birth_date DATE,
    city VARCHAR(30),
    email VARCHAR(254) UNIQUE,
    is_varified SMALLINT,
    PASSWORD varchar(128),
    is_teacher SMALLINT,
    is_admin SMALLINT,
    last_visit TIMESTAMP
);
--
CREATE TABLE ds.user_tag (
    uid INT,
    tag_id INT PRIMARY KEY,
    name VARCHAR(50),
    CONSTRAINT user_tag_fk FOREIGN KEY (uid) REFERENCES ds.users (uid)
);
--
CREATE TABLE ds.user_skills (
    uid INT,
    skill_id INT PRIMARY KEY,
    name VARCHAR(50),
    CONSTRAINT user_skills_fk FOREIGN KEY (uid) REFERENCES ds.users (uid)
);
--
CREATE TABLE ds.contest_tag (
    contest_id INT PRIMARY KEY DEFAULT nextval('contest_id_seq'),
    title VARCHAR(100),
    tags VARCHAR(50)
);
--
CREATE TABLE ds.contest_user (
    uid INT,
    contest_id INT,
    CONSTRAINT contest_user_uid_fk FOREIGN KEY (uid) REFERENCES ds.users (uid),
    CONSTRAINT contest_user_contest_id_fk FOREIGN KEY (contest_id) REFERENCES ds.contest_tag (contest_id)
);
--
CREATE TABLE ds.courses (
    course_id INT PRIMARY KEY DEFAULT nextval('courses_id_seq'),
    name VARCHAR(100),
    description TEXT,
    author VARCHAR(30),
    is_open SMALLINT,
    cover_link VARCHAR(300)
);
--
CREATE TABLE ds.lessons (
    lesson_id INT PRIMARY KEY DEFAULT nextval('lessons_id_seq'),
    name VARCHAR(100),
    description TEXT,
    course_id INT,
    CONSTRAINT lessons_fk FOREIGN KEY (course_id) REFERENCES ds.courses (course_id)
);
--
CREATE TABLE ds.enrollments (
    enrollment_id INT PRIMARY KEY DEFAULT nextval('enrollments_id_seq'),
    uid INT,
    course_id INT,
    created TIMESTAMP,
    is_active SMALLINT,
    CONSTRAINT enrollments_uid_fk FOREIGN KEY (uid) REFERENCES ds.users (uid),
    CONSTRAINT enrollments_course_id_fk FOREIGN KEY (course_id) REFERENCES ds.courses (course_id)
);
--
CREATE TABLE ds.tests (
    test_id INT PRIMARY KEY DEFAULT nextval('tests_id_seq'),
    course_id INT,
    name VARCHAR(50),
    description TEXT,
    passing_score FLOAT,
    CONSTRAINT tests_fk FOREIGN KEY (course_id) REFERENCES ds.courses (course_id)
);
--
CREATE TABLE ds.questions (
    question_id INT PRIMARY KEY DEFAULT nextval('questions_id_seq'),
    test_id INT,
    name VARCHAR(100),
    description TEXT,
    correct_answer VARCHAR(300),
    answer_1 VARCHAR(300),
    answer_2 VARCHAR(300),
    answer_3 VARCHAR(300),
    answer_4 VARCHAR(300),
    CONSTRAINT questions_fk FOREIGN KEY (test_id) REFERENCES ds.tests (test_id)
);
--
CREATE TABLE ds.test_results (
    uid INT,
    test_name VARCHAR(200),
    question_id INT,
    question_name VARCHAR(100),
    question_description TEXT,
    resulted SMALLINT,
    test_id INT,
    CONSTRAINT test_results_uid_fk FOREIGN KEY (uid) REFERENCES ds.users (uid),
    CONSTRAINT test_results_test_id_fk FOREIGN KEY (test_id) REFERENCES ds.tests (test_id),
    CONSTRAINT test_results_question_id_fk FOREIGN KEY (question_id) REFERENCES ds.questions (question_id)
);
--
CREATE TABLE ds.course_progress (
    progress_id INT PRIMARY KEY,
    uid INT,
    course_id INT,
    is_finished SMALLINT,
    course_completion FLOAT,
    test_id INT,
    test_result FLOAT,
    is_passed SMALLINT,
    CONSTRAINT course_pg_uid_fk FOREIGN KEY (uid) REFERENCES ds.users (uid),
    CONSTRAINT course_pg_course_id_fk FOREIGN KEY (course_id) REFERENCES ds.courses (course_id),
    CONSTRAINT course_pg_test_id_fk FOREIGN KEY (test_id) REFERENCES ds.tests (test_id)
);
--
CREATE TABLE ds.lessons_progress (
    progress_id INT PRIMARY KEY,
    uid INT,
    lesson_id INT,
    is_finished SMALLINT,
    CONSTRAINT lessons_pg_uid_fk FOREIGN KEY (uid) REFERENCES ds.users (uid),
    CONSTRAINT lessons_pg_lesson_id_fk FOREIGN KEY (lesson_id) REFERENCES ds.lessons (lesson_id)
);
--
CREATE TABLE ds.course_tag (
    tag_id INT,
    tag_name VARCHAR(50),
    course_id INT,
    CONSTRAINT course_tag_fk FOREIGN KEY (course_id) REFERENCES ds.courses (course_id)
);
