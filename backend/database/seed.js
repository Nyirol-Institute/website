const bcrypt = require('bcrypt');
const { sequelize, User, Program, Specialization, Course, Application, Student, Donation, Volunteer } = require('../src/models');

// Function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Seed database with sample data
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Sync database models
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
    
    // Create admin user
    const adminPassword = await hashPassword('Admin123!');
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@nyirolinstitute.org',
      password: adminPassword,
      role: 'admin',
      isActive: true
    });
    console.log('Admin user created');
    
    // Create staff user
    const staffPassword = await hashPassword('Staff123!');
    const staff = await User.create({
      firstName: 'Staff',
      lastName: 'User',
      email: 'staff@nyirolinstitute.org',
      password: staffPassword,
      role: 'staff',
      isActive: true
    });
    console.log('Staff user created');
    
    // Create instructor user
    const instructorPassword = await hashPassword('Instructor123!');
    const instructor = await User.create({
      firstName: 'Instructor',
      lastName: 'User',
      email: 'instructor@nyirolinstitute.org',
      password: instructorPassword,
      role: 'instructor',
      isActive: true
    });
    console.log('Instructor user created');
    
    // Create programs
    const digitalLiteracy = await Program.create({
      name: 'Digital Literacy Program',
      slug: 'digital-literacy',
      description: 'Our Digital Literacy Program provides a comprehensive introduction to computer technology and digital skills. This foundational program is designed for students with limited or no prior experience with computers and technology.',
      duration: '3 months',
      type: 'digital_literacy',
      applicationDeadline: new Date('2025-08-15T23:59:59Z'),
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-11-30'),
      capacity: 50,
      requirements: 'No prior computer experience required. Basic literacy in English or local language.',
      outcomes: 'Upon completion, students will be able to use computers for basic tasks, navigate the internet safely, create documents, and understand fundamental programming concepts.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isActive: true
    });
    
    const techSpecialization = await Program.create({
      name: 'Tech Specialization Program',
      slug: 'tech-specialization',
      description: 'Our Tech Specialization Programs allow students to develop advanced skills in specific technology fields. These intensive programs combine theoretical knowledge with practical application, preparing students for careers in the global tech industry.',
      duration: '6 months',
      type: 'tech_specialization',
      applicationDeadline: new Date('2025-09-01T23:59:59Z'),
      startDate: new Date('2025-10-01'),
      endDate: new Date('2026-03-31'),
      capacity: 30,
      requirements: 'Completion of Digital Literacy Program or equivalent skills. Basic understanding of computer concepts.',
      outcomes: 'Graduates will have industry-relevant technical skills in their chosen specialization, a professional portfolio, and be prepared for entry-level positions or freelance work.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isActive: true
    });
    
    const universityPathway = await Program.create({
      name: 'University Pathway Program',
      slug: 'university-pathway',
      description: 'Our University Pathway Program prepares students for success in higher education, bridging the gap between our technical training and university-level studies. This program is designed for students who wish to pursue bachelor\'s degrees or other advanced credentials.',
      duration: '8 months',
      type: 'university_pathway',
      applicationDeadline: new Date('2025-11-30T23:59:59Z'),
      startDate: new Date('2026-01-15'),
      endDate: new Date('2026-09-15'),
      capacity: 20,
      requirements: 'Completion of Tech Specialization Program or equivalent skills. Strong academic potential.',
      outcomes: 'Students will be prepared for university-level studies, have completed university applications, and possess advanced knowledge in their chosen field.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isActive: true
    });
    console.log('Programs created');
    
    // Create specializations
    const specializations = await Specialization.bulkCreate([
      {
        name: 'Graphic Design',
        slug: 'graphic-design',
        description: 'Learn to create visual content using industry-standard design software. Develop skills in digital illustration, branding, and print design.',
        icon: 'fas fa-paint-brush',
        requirements: 'Basic computer skills. Interest in visual arts and design.',
        outcomes: 'Create professional-quality graphics, logos, and marketing materials. Build a design portfolio.',
        ProgramId: techSpecialization.id
      },
      {
        name: 'UX/UI Design',
        slug: 'ux-ui-design',
        description: 'Master the principles of user experience and interface design. Create intuitive, accessible, and engaging digital products.',
        icon: 'fas fa-desktop',
        requirements: 'Basic computer skills. Interest in design and problem-solving.',
        outcomes: 'Design user-centered interfaces for websites and applications. Create wireframes, prototypes, and user flows.',
        ProgramId: techSpecialization.id
      },
      {
        name: 'Frontend Development',
        slug: 'frontend-development',
        description: 'Build interactive websites and applications using HTML, CSS, JavaScript, and modern frameworks like React.',
        icon: 'fas fa-code',
        requirements: 'Basic computer skills. Interest in coding and web technologies.',
        outcomes: 'Create responsive websites and web applications. Implement modern frontend frameworks and libraries.',
        ProgramId: techSpecialization.id
      },
      {
        name: 'Backend Development',
        slug: 'backend-development',
        description: 'Develop server-side applications, APIs, and databases using languages like Python, Node.js, and SQL.',
        icon: 'fas fa-server',
        requirements: 'Basic computer skills. Interest in programming and system architecture.',
        outcomes: 'Build server-side applications and APIs. Design and implement database solutions.',
        ProgramId: techSpecialization.id
      },
      {
        name: 'Data Science',
        slug: 'data-science',
        description: 'Learn to analyze and interpret complex data using statistical methods, machine learning, and visualization techniques.',
        icon: 'fas fa-chart-line',
        requirements: 'Basic computer skills. Interest in mathematics and statistics.',
        outcomes: 'Analyze complex datasets using statistical methods. Implement machine learning algorithms for prediction and classification.',
        ProgramId: techSpecialization.id
      },
      {
        name: 'Data Analytics',
        slug: 'data-analytics',
        description: 'Master tools and techniques for transforming data into actionable insights for business decision-making.',
        icon: 'fas fa-chart-bar',
        requirements: 'Basic computer skills. Interest in data and business intelligence.',
        outcomes: 'Transform raw data into meaningful insights. Create data visualizations and dashboards.',
        ProgramId: techSpecialization.id
      },
      {
        name: 'Animation',
        slug: 'animation',
        description: 'Create compelling motion graphics and animations for entertainment, education, and marketing purposes.',
        icon: 'fas fa-film',
        requirements: 'Basic computer skills. Interest in visual storytelling and animation.',
        outcomes: 'Create 2D and 3D animations. Develop motion graphics for various media.',
        ProgramId: techSpecialization.id
      }
    ]);
    console.log('Specializations created');
    
    // Create courses
    const courses = await Course.bulkCreate([
      {
        title: 'Computer Basics',
        code: 'DL101',
        description: 'Introduction to computer hardware, operating systems, and basic operations.',
        duration: 4,
        level: 'beginner',
        objectives: 'Understand computer components, navigate operating systems, manage files and folders.',
        prerequisites: 'None',
        ProgramId: digitalLiteracy.id
      },
      {
        title: 'Internet Skills',
        code: 'DL102',
        description: 'Learn to navigate the internet, use search engines, and practice online safety.',
        duration: 4,
        level: 'beginner',
        objectives: 'Use web browsers effectively, search for information online, understand online security basics.',
        prerequisites: 'Computer Basics (DL101)',
        ProgramId: digitalLiteracy.id
      },
      {
        title: 'Office Applications',
        code: 'DL103',
        description: 'Introduction to word processing, spreadsheets, and presentation software.',
        duration: 4,
        level: 'beginner',
        objectives: 'Create and edit documents, build basic spreadsheets, design simple presentations.',
        prerequisites: 'Computer Basics (DL101)',
        ProgramId: digitalLiteracy.id
      },
      {
        title: 'HTML & CSS Fundamentals',
        code: 'FE201',
        description: 'Learn the building blocks of web development with HTML and CSS.',
        duration: 6,
        level: 'beginner',
        objectives: 'Create structured web pages with HTML, style content with CSS, build responsive layouts.',
        prerequisites: 'Digital Literacy Program or equivalent',
        ProgramId: techSpecialization.id
      },
      {
        title: 'JavaScript Basics',
        code: 'FE202',
        description: 'Introduction to programming with JavaScript for interactive web pages.',
        duration: 6,
        level: 'intermediate',
        objectives: 'Understand programming fundamentals, manipulate web page elements, handle user interactions.',
        prerequisites: 'HTML & CSS Fundamentals (FE201)',
        ProgramId: techSpecialization.id
      },
      {
        title: 'Python Programming',
        code: 'BE201',
        description: 'Learn Python programming for backend development and data analysis.',
        duration: 6,
        level: 'beginner',
        objectives: 'Understand Python syntax, create functions and classes, work with libraries and packages.',
        prerequisites: 'Digital Literacy Program or equivalent',
        ProgramId: techSpecialization.id
      },
      {
        title: 'Database Fundamentals',
        code: 'BE202',
        description: 'Introduction to database design, SQL, and data management.',
        duration: 6,
        level: 'intermediate',
        objectives: 'Design database schemas, write SQL queries, perform CRUD operations.',
        prerequisites: 'Python Programming (BE201)',
        ProgramId: techSpecialization.id
      },
      {
        title: 'Academic Writing',
        code: 'UP301',
        description: 'Develop academic writing skills for university-level studies.',
        duration: 8,
        level: 'intermediate',
        objectives: 'Write clear and structured academic essays, cite sources properly, develop research skills.',
        prerequisites: 'Tech Specialization Program or equivalent',
        ProgramId: universityPathway.id
      },
      {
        title: 'Advanced Mathematics',
        code: 'UP302',
        description: 'Mathematics preparation for university technical programs.',
        duration: 8,
        level: 'advanced',
        objectives: 'Master algebra, calculus, and statistics concepts needed for technical degrees.',
        prerequisites: 'Tech Specialization Program or equivalent',
        ProgramId: universityPathway.id
      }
    ]);
    console.log('Courses created');
    
    // Create sample applications
    const applications = await Application.bulkCreate([
      {
        firstName: 'John',
        lastName: 'Deng',
        email: 'john.deng@example.com',
        phone: '+211 92 123 4567',
        age: 22,
        location: 'Nyirol County, South Sudan',
        educationLevel: 'secondary',
        computerExperience: 'basic',
        motivationStatement: 'I am passionate about technology and want to learn how to use computers to help my community. I believe that digital skills will open up new opportunities for me and allow me to contribute to the development of South Sudan.',
        questions: 'Do I need to bring my own computer?',
        status: 'accepted',
        applicationDate: new Date('2025-06-15'),
        reviewDate: new Date('2025-06-20'),
        reviewNotes: 'Strong candidate with clear motivation.',
        reviewedBy: admin.id,
        decisionDate: new Date('2025-06-25'),
        decisionNotes: 'Accepted based on strong motivation and basic computer knowledge.',
        decisionBy: admin.id,
        ProgramId: digitalLiteracy.id
      },
      {
        firstName: 'Sarah',
        lastName: 'Ayen',
        email: 'sarah.ayen@example.com',
        phone: '+211 92 234 5678',
        age: 19,
        location: 'Nyirol County, South Sudan',
        educationLevel: 'secondary',
        computerExperience: 'none',
        motivationStatement: 'I have never used a computer before, but I am eager to learn. I want to gain skills that will help me find employment and support my family. Technology is the future, and I want to be part of it.',
        status: 'accepted',
        applicationDate: new Date('2025-06-18'),
        reviewDate: new Date('2025-06-22'),
        reviewNotes: 'Very motivated despite no prior experience.',
        reviewedBy: staff.id,
        decisionDate: new Date('2025-06-26'),
        decisionNotes: 'Accepted based on strong motivation and potential.',
        decisionBy: admin.id,
        ProgramId: digitalLiteracy.id
      },
      {
        firstName: 'Peter',
        lastName: 'Machar',
        email: 'peter.machar@example.com',
        phone: '+211 92 345 6789',
        age: 24,
        location: 'Nyirol County, South Sudan',
        educationLevel: 'diploma',
        computerExperience: 'intermediate',
        motivationStatement: 'I have some experience with computers from my previous studies, but I want to deepen my knowledge and specialize in data science. I believe that data-driven insights can help address many challenges facing our community.',
        status: 'under_review',
        applicationDate: new Date('2025-06-20'),
        ProgramId: techSpecialization.id,
        SpecializationId: 5 // Data Science
      },
      {
        firstName: 'Mary',
        lastName: 'Nyadeng',
        email: 'mary.nyadeng@example.com',
        phone: '+211 92 456 7890',
        age: 20,
        location: 'Nyirol County, South Sudan',
        educationLevel: 'secondary',
        computerExperience: 'basic',
        motivationStatement: 'I am interested in design and want to learn how to create beautiful graphics and websites. I believe that visual communication is powerful and can help businesses and organizations in our community reach more people.',
        status: 'pending',
        applicationDate: new Date('2025-06-22'),
        ProgramId: techSpecialization.id,
        SpecializationId: 1 // Graphic Design
      },
      {
        firstName: 'David',
        lastName: 'Garang',
        email: 'david.garang@example.com',
        phone: '+211 92 567 8901',
        age: 26,
        location: 'Nyirol County, South Sudan',
        educationLevel: 'bachelors',
        computerExperience: 'advanced',
        motivationStatement: 'I have completed my bachelor\'s degree and have been working with computers for several years. I want to pursue further education in computer science and eventually teach others in my community. The university pathway program would help me achieve this goal.',
        status: 'interview',
        applicationDate: new Date('2025-06-19'),
        reviewDate: new Date('2025-06-24'),
        reviewNotes: 'Strong academic background and clear career goals.',
        reviewedBy: staff.id,
        ProgramId: universityPathway.id
      }
    ]);
    console.log('Applications created');
    
    // Create students from accepted applications
    const john = await Student.create({
      firstName: 'John',
      lastName: 'Deng',
      email: 'john.deng@example.com',
      phone: '+211 92 123 4567',
      dateOfBirth: new Date('2003-05-15'),
      gender: 'male',
      address: 'Nyirol County',
      city: 'Nyirol',
      country: 'South Sudan',
      educationLevel: 'secondary',
      computerExperience: 'basic',
      enrollmentDate: new Date('2025-07-01'),
      status: 'active',
      emergencyContactName: 'James Deng',
      emergencyContactPhone: '+211 92 123 4568',
      emergencyContactRelationship: 'Father',
      ApplicationId: 1
    });
    
    const sarah = await Student.create({
      firstName: 'Sarah',
      lastName: 'Ayen',
      email: 'sarah.ayen@example.com',
      phone: '+211 92 234 5678',
      dateOfBirth: new Date('2006-08-20'),
      gender: 'female',
      address: 'Nyirol County',
      city: 'Nyirol',
      country: 'South Sudan',
      educationLevel: 'secondary',
      computerExperience: 'none',
      enrollmentDate: new Date('2025-07-01'),
      status: 'active',
      emergencyContactName: 'Mary Ayen',
      emergencyContactPhone: '+211 92 234 5679',
      emergencyContactRelationship: 'Mother',
      ApplicationId: 2
    });
    console.log('Students created');
    
    // Enroll students in programs
    await sequelize.query(`
      INSERT INTO StudentProgram (StudentId, ProgramId, enrollmentDate, status, createdAt, updatedAt)
      VALUES 
      (${john.id}, ${digitalLiteracy.id}, '2025-07-01', 'active', NOW(), NOW()),
      (${sarah.id}, ${digitalLiteracy.id}, '2025-07-01', 'active', NOW(), NOW())
    `);
    console.log('Students enrolled in programs');
    
    // Enroll students in courses
    await sequelize.query(`
      INSERT INTO StudentCourse (StudentId, CourseId, enrollmentDate, createdAt, updatedAt)
      VALUES 
      (${john.id}, 1, '2025-07-01', NOW(), NOW()),
      (${john.id}, 2, '2025-07-01', NOW(), NOW()),
      (${john.id}, 3, '2025-07-01', NOW(), NOW()),
      (${sarah.id}, 1, '2025-07-01', NOW(), NOW()),
      (${sarah.id}, 2, '2025-07-01', NOW(), NOW()),
      (${sarah.id}, 3, '2025-07-01', NOW(), NOW())
    `);
    console.log('Students enrolled in courses');
    
    // Create sample donations
    const donations = await Donation.bulkCreate([
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        phone: '+1 555 123 4567',
        amount: 500.00,
        currency: 'USD',
        frequency: 'one-time',
        paymentMethod: 'credit-card',
        transactionId: 'txn_123456789',
        status: 'completed',
        donationDate: new Date('2025-06-10'),
        comments: 'I believe in the mission of Nyirol Institute and want to support technology education in South Sudan.',
        isAnonymous: false,
        receiptSent: true,
        receiptDate: new Date('2025-06-10'),
        allocation: 'general'
      },
      {
        firstName: 'Sophia',
        lastName: 'Chen',
        email: 'sophia.chen@example.com',
        phone: '+1 555 234 5678',
        amount: 1000.00,
        currency: 'USD',
        frequency: 'monthly',
        paymentMethod: 'credit-card',
        transactionId: 'txn_234567890',
        status: 'completed',
        donationDate: new Date('2025-06-15'),
        comments: 'I want to specifically support the solar power infrastructure of the institute.',
        isAnonymous: false,
        receiptSent: true,
        receiptDate: new Date('2025-06-15'),
        allocation: 'solar',
        subscriptionId: 'sub_123456',
        nextBillingDate: new Date('2025-07-15')
      },
      {
        firstName: 'Anonymous',
        lastName: 'Donor',
        email: 'anonymous@example.com',
        amount: 250.00,
        currency: 'USD',
        frequency: 'one-time',
        paymentMethod: 'paypal',
        transactionId: 'txn_345678901',
        status: 'completed',
        donationDate: new Date('2025-06-20'),
        isAnonymous: true,
        receiptSent: true,
        receiptDate: new Date('2025-06-20'),
        allocation: 'scholarships'
      }
    ]);
    console.log('Donations created');
    
    // Create sample volunteers
    const volunteers = await Volunteer.bulkCreate([
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        phone: '+1 555 123 4567',
        location: 'Toronto, Canada',
        volunteerType: 'remote',
        interests: JSON.stringify(['technical-instruction', 'curriculum-development']),
        skills: JSON.stringify(['web-development', 'teaching']),
        availability: '5-10 hours per week',
        experience: 'I have 10 years of experience as a web developer and 5 years of teaching experience.',
        motivation: 'I want to share my knowledge and skills with students who are eager to learn but may not have access to quality technology education. I believe that education is a powerful tool for change.',
        linkedinProfile: 'https://www.linkedin.com/in/michaeljohnson',
        status: 'accepted',
        applicationDate: new Date('2025-06-05'),
        reviewDate: new Date('2025-06-10'),
        reviewNotes: 'Excellent technical skills and teaching experience.',
        reviewedBy: admin.id,
        startDate: new Date('2025-07-01')
      },
      {
        firstName: 'Sophia',
        lastName: 'Chen',
        email: 'sophia.chen@example.com',
        phone: '+1 555 234 5678',
        location: 'San Francisco, USA',
        volunteerType: 'in-person',
        interests: JSON.stringify(['technical-instruction', 'project-coaching']),
        skills: JSON.stringify(['ux-ui-design', 'teaching']),
        availability: 'medium-term (1-3 months)',
        experience: 'I am a UX designer with 8 years of experience working with major tech companies.',
        motivation: 'I want to take a sabbatical from my job to contribute to meaningful education initiatives. I believe that design thinking can be a valuable skill for students in any context.',
        linkedinProfile: 'https://www.linkedin.com/in/sophiachen',
        status: 'under_review',
        applicationDate: new Date('2025-06-15'),
        reviewedBy: staff.id
      }
    ]);
    console.log('Volunteers created');
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close database connection
    await sequelize.close();
  }
};

// Run seeder
seedDatabase();