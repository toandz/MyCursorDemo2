#!/bin/bash

# Check for required dependencies
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo "Error: $1 is not installed"
        case $1 in
            "node")
                echo "To install Node.js and npm, follow these steps:"
                echo "1. Install Homebrew (if not installed):"
                echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
                echo "2. Install Node.js and npm:"
                echo "   brew install node"
                ;;
            "npm")
                echo "npm should be installed with Node.js. Try installing Node.js:"
                echo "brew install node"
                ;;
        esac
        exit 1
    fi
}

# Check for Node.js and npm
echo "Checking dependencies..."
check_dependency node
check_dependency npm

# Clean install
echo "Cleaning previous installation..."
rm -rf node_modules package-lock.json
rm -rf build
npm cache clean --force

# Create necessary directories if they don't exist
echo "Creating necessary directories..."
mkdir -p public/images

# Install dependencies
echo "Installing dependencies..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm install --legacy-peer-deps --force

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "SKIP_PREFLIGHT_CHECK=true" >> .env
    echo "BROWSER=none" >> .env
fi

# Start the development server
echo "Starting development server..."
npm start 