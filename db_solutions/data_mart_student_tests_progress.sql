--Создаю витрину успеваемости пользователя по каждому тесту:
CREATE TABLE dm.student_tests_progress (
    uid INT,
    test_name VARCHAR,
	total_questions INT,
	correct_answers INT,
	incorrect_answers INT,
	success_rate FLOAT
);
--Создаю процедуру с входным параметром UIDX:
CREATE OR REPLACE PROCEDURE dm.student_tests_progress (uidx INT)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM dm.student_tests_progress f
    WHERE f.uid = uidx;
    
    INSERT INTO dm.student_tests_progress (uid, test_name, total_questions, correct_answers, incorrect_answers, success_rate)
    WITH cte AS (
        SELECT 
            uid, 
            test_name, 
            COUNT(question_id) AS total_questions,
            SUM(resulted) AS correct_answers, 
            COUNT(question_id) - SUM(resulted) AS incorrect_answers,
            ROUND(CAST(SUM(resulted) AS NUMERIC) / COUNT(question_id), 2) AS success_rate
        FROM 
            ds.test_results
        WHERE 
            uid = uidx
        GROUP BY 
            uid, 
            test_name
    )
    SELECT 
        uid, 
        test_name, 
        total_questions, 
        correct_answers, 
        incorrect_answers, 
        success_rate
    FROM 
        cte;
END;
$$
--Проверка:
CALL dm.student_tests_progress (5080);
