#!/bin/bash

# Initialize the database for Nyirol Institute

echo "Initializing database for Nyirol Institute..."

# Check if MySQL client is installed
if ! command -v mysql &> /dev/null; then
    echo "MySQL client not found. Please install MySQL client."
    exit 1
fi

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
else
    echo "No .env file found. Using default values."
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD="password"
    DB_NAME="nyirol_institute"
fi

# Prompt for MySQL root password if not set in .env
if [ -z "$DB_PASSWORD" ]; then
    read -sp "Enter MySQL root password: " DB_PASSWORD
    echo
fi

# Create database
echo "Creating database $DB_NAME..."
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Check if database creation was successful
if [ $? -ne 0 ]; then
    echo "Failed to create database. Please check your MySQL credentials."
    exit 1
fi

echo "Database $DB_NAME created successfully."

# Import schema
echo "Importing database schema..."
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < database/schema.sql

# Check if schema import was successful
if [ $? -ne 0 ]; then
    echo "Failed to import database schema."
    exit 1
fi

echo "Database schema imported successfully."

# Run seeder
echo "Running database seeder..."
node database/seed.js

echo "Database initialization completed."
echo "You can now start the server with: npm run dev"