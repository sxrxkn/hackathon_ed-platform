--Создаю витрину общей успеваемости всех пользователей по результатам прохождения всех тестов:
CREATE TABLE dm.complete_overall_progress (
    uid INT,
    total_tests VARCHAR,
    total_questions INT,
    correct_answers INT,
    incorrect_answers INT,
    success_rate FLOAT
);
--Создаю процедуру:
CREATE OR REPLACE PROCEDURE dm.complete_overall_progress ()
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO dm.complete_overall_progress (uid, total_tests, total_questions, correct_answers, incorrect_answers, success_rate)
    WITH cte AS (
        SELECT
            uid,
            count(DISTINCT test_name) AS total_tests,
            count(question_id) AS total_questions,
            sum(resulted) AS correct_answers,
            count(question_id) - sum(resulted) AS incorrect_answers,
            round(cast(sum(resulted) AS NUMERIC) / count(question_id), 2) AS success_rate
        FROM
            ds.test_results
        GROUP BY
            uid
)
    SELECT
        uid,
        total_tests,
        total_questions,
        correct_answers,
        incorrect_answers,
        success_rate
    FROM
        cte;
END;
$$
--Проверка:
CALL dm.complete_overall_progress ();
