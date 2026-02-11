#!/bin/sh
set -e

# Inject environment variables into index.html as window.__ENV__
# This allows runtime configuration in production without rebuilding the image

echo "Injecting environment variables into index.html..."

# Prepare environment variables object
ENV_VARS="{"

# Collect all REACT_APP_* and VITE_APP_* variables
FIRST_VAR=true
for var in $(printenv | grep -E '^(REACT_APP_|VITE_APP_)' | cut -d= -f1 | sort); do
    # Get the value and escape single quotes and newlines
    value=$(printenv "$var" | sed "s/'/'\"'\"'/g" | tr -d '\n' | tr -d '\r')
    # Keep full key name (including REACT_APP_ prefix) for consistency
    key="$var"
    if [ "$FIRST_VAR" = "false" ]; then
        ENV_VARS="$ENV_VARS,"
    fi
    ENV_VARS="$ENV_VARS $key: '$value'"
    FIRST_VAR=false
done

ENV_VARS="$ENV_VARS }"

# Create script tag with escaped content
CONFIG_SCRIPT="<script>window.__ENV__ = $ENV_VARS;</script>"

# Inject before closing </head> tag
sed -i "s|</head>|${CONFIG_SCRIPT}</head>|" /usr/share/nginx/html/index.html

echo "Environment variables injected successfully."

# Start nginx
exec nginx -g "daemon off;"
