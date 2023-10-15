CREATE TABLE IF NOT EXISTS admin(
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

-- insertion of admin user if not exists
INSERT IGNORE INTO admin(login, password, role) VALUES ('admin', 'admin', 'admin');