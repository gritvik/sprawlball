CREATE TRIGGER LoginFunction
    BEFORE INSERT ON Temp
        FOR EACH ROW
    BEGIN
        SET @username = (SELECT Username FROM Temp WHERE Username = new.Username GROUP BY Username);
        SET @password = (SELECT Password FROM Temp WHERE Username = new.Username GROUP BY Password);
        IF @username IS NULL THEN
            INSERT INTO Users VALUES(new.Username, new.Password);
        END IF;
        IF @username IS NOT NULL THEN
            IF @password != new.Password THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Incorrect Password";
            END IF;
        END IF;
    END;