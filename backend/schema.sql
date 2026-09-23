-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Added for JWT auth if not using Supabase Auth strictly
    role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'ALUMNI', 'ADMIN')),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Alumni Profiles Table
CREATE TABLE alumni_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    batch_year INTEGER NOT NULL,
    job_title VARCHAR(255),
    company VARCHAR(255),
    industry VARCHAR(255),
    location VARCHAR(255),
    bio TEXT,
    linkedin_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_alumni_user_id ON alumni_profiles(user_id);
CREATE INDEX idx_alumni_verified_active ON alumni_profiles(is_verified, is_active);

-- Mentorship Areas Table
CREATE TABLE mentorship_areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Alumni Mentorship (Many-to-Many)
CREATE TABLE alumni_mentorship (
    alumni_id UUID NOT NULL REFERENCES alumni_profiles(id) ON DELETE CASCADE,
    area_id INTEGER NOT NULL REFERENCES mentorship_areas(id) ON DELETE CASCADE,
    PRIMARY KEY (alumni_id, area_id)
);

-- Connection Requests Table
CREATE TABLE connection_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('CONNECTION', 'MENTORSHIP')),
    message TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT no_self_request CHECK (sender_id != receiver_id)
);

CREATE INDEX idx_requests_receiver ON connection_requests(receiver_id);
CREATE INDEX idx_requests_sender ON connection_requests(sender_id);
CREATE UNIQUE INDEX idx_unique_pending_request ON connection_requests(sender_id, receiver_id, type) WHERE status = 'PENDING';

-- Connections Table
CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT no_self_connection CHECK (user1_id != user2_id)
);

-- Ensure user1_id is always strictly less than user2_id to prevent duplicates (A-B and B-A)
CREATE UNIQUE INDEX idx_unique_connection ON connections (
    LEAST(user1_id, user2_id),
    GREATEST(user1_id, user2_id)
);

-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    registration_url TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Opportunities Table (Jobs/Internships)
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100) NOT NULL CHECK (type IN ('JOB', 'INTERNSHIP', 'OTHER')),
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    deadline TIMESTAMP WITH TIME ZONE,
    application_url TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
