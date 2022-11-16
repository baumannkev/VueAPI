CREATE TABLE sources.source (
	id INT auto_increment NOT NULL,
	title varchar(100) NOT NULL,
	link varchar(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT source_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;
