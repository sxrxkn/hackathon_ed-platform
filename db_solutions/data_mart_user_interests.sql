--Создаю витрину интересов и специализации пользователя:
CREATE TABLE dm.user_interests (
    uid INT,
    interests VARCHAR,
    specialization VARCHAR
);

--Создаю процедуру с входным параметром UIDX:
CREATE OR REPLACE PROCEDURE dm.user_interests (uidx INT)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM dm.user_interests f
    WHERE f.uid = uidx;
    INSERT INTO dm.user_interests (uid, interests, specialization)
    WITH cte AS (
        SELECT
            ut.uid,
            string_agg(DISTINCT ut.name, ', ') AS interests,
            string_agg(DISTINCT us.name, ', ') AS specialization
        FROM
            ds.user_tag ut
        LEFT JOIN ds.user_skills us ON ut.uid = us.uid
    WHERE
        ut.uid = uidx
    GROUP BY
        ut.uid
)
SELECT
    uidx AS uid,
    interests,
    specialization
FROM
    cte;
END;
$$
--Проверка:
CALL dm.user_interests (1005);
