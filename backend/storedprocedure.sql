DROP PROCEDURE Result;//
DELIMITER //
CREATE PROCEDURE Result(player_name VARCHAR(100)) 

BEGIN
    DECLARE done int default 0;
    
    DECLARE nba_player_name VARCHAR(100);
    DECLARE shot_type VARCHAR(100);
    DECLARE avg_shooting_ptg FLOAT;
    DECLARE stat VARCHAR(100);
    
    DECLARE cur CURSOR FOR SELECT PlayerName, ShotZoneBasic, AVG(ShotMade) 
                            FROM players NATURAL JOIN shots 
                            GROUP BY PlayerName, ShotZoneBasic 
                            HAVING PlayerName = player_name;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    

    DROP TABLE IF EXISTS ShootingAbilities;
    CREATE TABLE ShootingAbilities(
                            PlayerName VARCHAR(100),
                            ShotZone VARCHAR(100),
                            ShootingAbility VARCHAR(100),
                            PRIMARY KEY(ShotZone));
    
    OPEN cur;
    loop1: LOOP
    
        FETCH cur INTO nba_player_name, shot_type, avg_shooting_ptg;
        
            IF shot_type = NULL
                THEN LEAVE loop1;
            END IF;
            
             
            IF shot_type = 'Above the Break 3'
                THEN
                IF avg_shooting_ptg = 0.3460
                    THEN SET stat = 'Average';
                ELSEIF avg_shooting_ptg > 0.3460
                    THEN SET stat = 'Above Average';
                ELSEIF avg_shooting_ptg < 0.3460
                    THEN SET stat = 'Below Average';
                END IF;
            END IF;
            IF shot_type = 'Mid-Range'
                THEN
                IF avg_shooting_ptg = 0.4065
                    THEN SET stat = 'Average';
                ELSEIF avg_shooting_ptg > 0.4065
                    THEN SET stat = 'Above Average';
                ELSEIF avg_shooting_ptg < 0.4065
                    THEN SET stat = 'Below Average';
                END IF;
            END IF;
            IF shot_type = 'Restricted Area'
                THEN
                IF avg_shooting_ptg = 0.6532
                    THEN SET stat = 'Average';
                ELSEIF avg_shooting_ptg > 0.6532
                    THEN SET stat = 'Above Average';
                ELSEIF avg_shooting_ptg < 0.6532
                    THEN SET stat = 'Below Average';
                END IF;
            END IF;
            IF shot_type = 'In The Paint (Non-RA)'
                THEN
                IF avg_shooting_ptg = 0.4283
                    THEN SET stat = 'Average';
                ELSEIF avg_shooting_ptg > 0.4283
                    THEN SET stat = 'Above Average';
                ELSEIF avg_shooting_ptg < 0.4283
                    THEN SET stat = 'Below Average';
                END IF;
            END IF;
            IF shot_type = 'Left Corner 3'
                THEN
                IF avg_shooting_ptg = 0.3842
                    THEN SET stat = 'Average';
                ELSEIF avg_shooting_ptg > 0.3842
                    THEN SET stat = 'Above Average';
                ELSEIF avg_shooting_ptg < 0.3842
                    THEN SET stat = 'Below Average';
                END IF;
            END IF;
            IF shot_type = 'Right Corner 3'
                THEN 
                IF avg_shooting_ptg = 0.3820
                    THEN SET stat = 'Average';
                ELSEIF avg_shooting_ptg > 0.3820
                    THEN SET stat = 'Above Average';
                ELSEIF avg_shooting_ptg < 0.3820
                    THEN SET stat = 'Below Average';
                END IF;
            END IF;
            IF shot_type = 'Backcourt'
                THEN
                IF avg_shooting_ptg = 0.0250
                    THEN SET stat = 'Average';
                ELSEIF avg_shooting_ptg > 0.0250
                    THEN SET stat = 'Above Average';
                ELSEIF avg_shooting_ptg < 0.0250
                    THEN SET stat = 'Below Average';
                END IF;
            END IF;
            
            IF done = 1
                THEN LEAVE loop1;
            END IF;
            
        INSERT IGNORE INTO ShootingAbilities VALUES(nba_player_name, shot_type, stat);
        
    END LOOP loop1;

    CLOSE cur;
    
    SELECT * FROM ShootingAbilities;
END; //