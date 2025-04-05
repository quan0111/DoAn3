CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    phone VARCHAR(15),
    gender ENUM('male', 'female', 'other'),
    dob DATE,
    role ENUM('jobseeker', 'employer') DEFAULT 'jobseeker',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE jobseekers (
    user_id VARCHAR(50) PRIMARY KEY,
    career_goals TEXT,
    experience_years INT,
    desired_salary_min INT,
    desired_salary_max INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE resumes (
    resume_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    title VARCHAR(100),
    summary TEXT,
    education TEXT,
    experience TEXT,
    skills TEXT,
    certificates TEXT,
    file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE companies (
    company_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    company_name VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url TEXT,
    website VARCHAR(100),
    location VARCHAR(100),
    company_size VARCHAR(50),
    industry VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE jobs (
    job_id VARCHAR(50) PRIMARY KEY,
    company_id VARCHAR(50),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    requirements TEXT,
    benefits TEXT,
    salary_min INT,
    salary_max INT,
    location VARCHAR(100),
    job_level ENUM('intern', 'fresher', 'junior', 'senior', 'manager'),
    job_type ENUM('full-time', 'part-time', 'internship', 'remote'),
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

CREATE TABLE job_skills (
    job_id VARCHAR(50),
    skill VARCHAR(100),
    PRIMARY KEY (job_id, skill),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);
CREATE TABLE applications (
    application_id VARCHAR(50) PRIMARY KEY,
    job_id VARCHAR(50),
    user_id VARCHAR(50),
    resume_id VARCHAR(50),
    cover_letter TEXT,
    status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (resume_id) REFERENCES resumes(resume_id)
);
CREATE TABLE saved_jobs (
    user_id VARCHAR(50),
    job_id VARCHAR(50),
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, job_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);

CREATE TABLE company_followers (
    user_id VARCHAR(50),
    company_id VARCHAR(50),
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, company_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
CREATE TABLE notifications (
    notification_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE job_categories (
    category_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);
CREATE TABLE job_category_mapping (
    job_id VARCHAR(50),
    category_id VARCHAR(50),
    PRIMARY KEY (job_id, category_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id),
    FOREIGN KEY (category_id) REFERENCES job_categories(category_id)
);
CREATE TABLE articles (
    article_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    thumbnail_url TEXT,
    author_id VARCHAR(50),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);
CREATE TABLE article_categories (
    category_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE article_category_mapping (
    article_id VARCHAR(50),
    category_id VARCHAR(50),
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    FOREIGN KEY (category_id) REFERENCES article_categories(category_id)
);
CREATE TABLE feedbacks (
    feedback_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50), -- NULL nếu gửi ẩn danh
    subject VARCHAR(200),
    message TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
