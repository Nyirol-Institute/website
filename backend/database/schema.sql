-- Nyirol Institute of Innovation and Technology Database Schema

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS StudentCourse;
DROP TABLE IF EXISTS StudentProgram;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Application;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Specialization;
DROP TABLE IF EXISTS Program;
DROP TABLE IF EXISTS Donation;
DROP TABLE IF EXISTS Volunteer;
DROP TABLE IF EXISTS User;

-- Create Users table
CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'staff', 'instructor') DEFAULT 'staff',
  isActive BOOLEAN DEFAULT TRUE,
  lastLogin DATETIME,
  resetPasswordToken VARCHAR(255),
  resetPasswordExpires DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Programs table
CREATE TABLE Program (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  duration VARCHAR(50) NOT NULL,
  type ENUM('digital_literacy', 'tech_specialization', 'job_placement', 'university_pathway') NOT NULL,
  applicationDeadline DATETIME NOT NULL,
  startDate DATETIME,
  endDate DATETIME,
  capacity INT,
  isActive BOOLEAN DEFAULT TRUE,
  requirements TEXT,
  outcomes TEXT,
  image VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Specializations table
CREATE TABLE Specialization (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(50),
  isActive BOOLEAN DEFAULT TRUE,
  requirements TEXT,
  outcomes TEXT,
  ProgramId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ProgramId) REFERENCES Program(id) ON DELETE SET NULL
);

-- Create Courses table
CREATE TABLE Course (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  duration INT NOT NULL COMMENT 'Duration in weeks',
  level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  objectives TEXT,
  prerequisites TEXT,
  syllabus TEXT,
  materials TEXT,
  isActive BOOLEAN DEFAULT TRUE,
  image VARCHAR(255),
  ProgramId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ProgramId) REFERENCES Program(id) ON DELETE SET NULL
);

-- Create Applications table
CREATE TABLE Application (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  age INT NOT NULL,
  location VARCHAR(100) NOT NULL,
  educationLevel ENUM('primary', 'secondary', 'diploma', 'bachelors', 'masters', 'other') NOT NULL,
  computerExperience ENUM('none', 'basic', 'intermediate', 'advanced') NOT NULL,
  motivationStatement TEXT NOT NULL,
  questions TEXT,
  status ENUM('pending', 'under_review', 'interview', 'accepted', 'rejected', 'waitlisted') DEFAULT 'pending',
  applicationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewDate DATETIME,
  reviewNotes TEXT,
  reviewedBy INT,
  interviewDate DATETIME,
  interviewNotes TEXT,
  decisionDate DATETIME,
  decisionNotes TEXT,
  decisionBy INT,
  ProgramId INT NOT NULL,
  SpecializationId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ProgramId) REFERENCES Program(id),
  FOREIGN KEY (SpecializationId) REFERENCES Specialization(id) ON DELETE SET NULL,
  FOREIGN KEY (reviewedBy) REFERENCES User(id) ON DELETE SET NULL,
  FOREIGN KEY (decisionBy) REFERENCES User(id) ON DELETE SET NULL
);

-- Create Students table
CREATE TABLE Student (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  dateOfBirth DATE,
  gender ENUM('male', 'female', 'other', 'prefer_not_to_say'),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100) DEFAULT 'South Sudan',
  educationLevel ENUM('primary', 'secondary', 'diploma', 'bachelors', 'masters', 'other'),
  computerExperience ENUM('none', 'basic', 'intermediate', 'advanced'),
  enrollmentDate DATE,
  status ENUM('active', 'graduated', 'withdrawn', 'on_leave') DEFAULT 'active',
  photo VARCHAR(255),
  emergencyContactName VARCHAR(100),
  emergencyContactPhone VARCHAR(20),
  emergencyContactRelationship VARCHAR(50),
  notes TEXT,
  ApplicationId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ApplicationId) REFERENCES Application(id) ON DELETE SET NULL
);

-- Create StudentProgram junction table
CREATE TABLE StudentProgram (
  StudentId INT NOT NULL,
  ProgramId INT NOT NULL,
  enrollmentDate DATE NOT NULL,
  completionDate DATE,
  status ENUM('active', 'completed', 'withdrawn', 'on_leave') DEFAULT 'active',
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (StudentId, ProgramId),
  FOREIGN KEY (StudentId) REFERENCES Student(id) ON DELETE CASCADE,
  FOREIGN KEY (ProgramId) REFERENCES Program(id) ON DELETE CASCADE
);

-- Create StudentCourse junction table
CREATE TABLE StudentCourse (
  StudentId INT NOT NULL,
  CourseId INT NOT NULL,
  enrollmentDate DATE NOT NULL,
  completionDate DATE,
  grade VARCHAR(10),
  attendance FLOAT DEFAULT 0.0,
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (StudentId, CourseId),
  FOREIGN KEY (StudentId) REFERENCES Student(id) ON DELETE CASCADE,
  FOREIGN KEY (CourseId) REFERENCES Course(id) ON DELETE CASCADE
);

-- Create Donations table
CREATE TABLE Donation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  frequency ENUM('one-time', 'monthly', 'annually') DEFAULT 'one-time',
  paymentMethod ENUM('credit-card', 'paypal', 'bank-transfer') NOT NULL,
  transactionId VARCHAR(100),
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  donationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  comments TEXT,
  isAnonymous BOOLEAN DEFAULT FALSE,
  receiptSent BOOLEAN DEFAULT FALSE,
  receiptDate DATETIME,
  allocation ENUM('general', 'scholarships', 'equipment', 'solar', 'other') DEFAULT 'general',
  subscriptionId VARCHAR(100),
  nextBillingDate DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Volunteers table
CREATE TABLE Volunteer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(100) NOT NULL,
  volunteerType ENUM('remote', 'in-person', 'both') NOT NULL,
  interests JSON NOT NULL,
  skills JSON NOT NULL,
  availability VARCHAR(100) NOT NULL,
  experience TEXT,
  motivation TEXT NOT NULL,
  cvPath VARCHAR(255),
  linkedinProfile VARCHAR(255),
  status ENUM('pending', 'under_review', 'interview', 'accepted', 'rejected') DEFAULT 'pending',
  applicationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  startDate DATETIME,
  endDate DATETIME,
  reviewDate DATETIME,
  reviewNotes TEXT,
  reviewedBy INT,
  assignedProjects JSON,
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewedBy) REFERENCES User(id) ON DELETE SET NULL
);

-- Insert default admin user
INSERT INTO User (firstName, lastName, email, password, role, isActive)
VALUES ('Admin', 'User', 'admin@nyirolinstitute.org', '$2b$10$7JpwJzX9Q9X8Y5j5X5Z5Z.5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', 'admin', TRUE);

-- Insert sample programs
INSERT INTO Program (name, slug, description, duration, type, applicationDeadline, isActive)
VALUES 
('Digital Literacy Program', 'digital-literacy', 'Foundation program covering computer basics, internet skills, and office applications.', '3 months', 'digital_literacy', '2025-08-15 23:59:59', TRUE),
('Tech Specialization Program', 'tech-specialization', 'Advanced training in specific technology fields.', '6 months', 'tech_specialization', '2025-09-01 23:59:59', TRUE),
('University Pathway Program', 'university-pathway', 'Preparation for higher education through partner universities.', '8 months', 'university_pathway', '2025-11-30 23:59:59', TRUE);

-- Insert sample specializations
INSERT INTO Specialization (name, slug, description, icon, ProgramId)
VALUES 
('Graphic Design', 'graphic-design', 'Learn to create visual content using industry-standard design software.', 'fas fa-paint-brush', 2),
('UX/UI Design', 'ux-ui-design', 'Master the principles of user experience and interface design.', 'fas fa-desktop', 2),
('Frontend Development', 'frontend-development', 'Build interactive websites and applications using HTML, CSS, JavaScript, and modern frameworks.', 'fas fa-code', 2),
('Backend Development', 'backend-development', 'Develop server-side applications, APIs, and databases.', 'fas fa-server', 2),
('Data Science', 'data-science', 'Learn to analyze and interpret complex data using statistical methods and machine learning.', 'fas fa-chart-line', 2),
('Data Analytics', 'data-analytics', 'Master tools and techniques for transforming data into actionable insights.', 'fas fa-chart-bar', 2),
('Animation', 'animation', 'Create compelling motion graphics and animations for various purposes.', 'fas fa-film', 2);