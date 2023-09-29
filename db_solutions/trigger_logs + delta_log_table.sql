--Создаю таблицу логов дельт:
CREATE TABLE logs.delta_logs (
    delta_id INT,
    date_time TIMESTAMP,
    message VARCHAR,
    table_name VARCHAR,
    status VARCHAR
);
--Создаю таблицу логов:
CREATE TABLE logs.trigger_logs (
    log_id SERIAL PRIMARY KEY,
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
--Создаю триггерную функцию для логов:
CREATE OR REPLACE FUNCTION logs.log_changes ()
    RETURNS TRIGGER
    AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO logs.trigger_logs (table_name, operation, new_data)
            VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW));
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO logs.trigger_logs (table_name, operation, old_data, new_data)
            VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW));
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO logs.trigger_logs (table_name, operation, old_data)
            VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD));
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;
--Создаю триггеры на основные таблицы, где хочу отслеживать изменения:
CREATE TRIGGER user_tag_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.user_tag
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER users_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.users
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER contest_tag_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.contest_tag
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER contest_user_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.contest_user
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER test_results_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.test_results
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER user_skills_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.user_skills
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER courses_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.courses
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER enrollments_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.enrollments
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER lessons_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.lessons
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER questions_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.questions
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
--
CREATE TRIGGER course_progress_trigger
    AFTER INSERT OR UPDATE OR DELETE ON ds.course_progress
    FOR EACH ROW
    EXECUTE FUNCTION logs.log_changes ();
