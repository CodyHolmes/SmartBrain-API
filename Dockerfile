FROM node:8.11.2

# Set the working directory for the commands to follow
WORKDIR /usr/src/smart-brain-api

# Copy files from current directory into containers WORKDIR
COPY ./ ./

# Execute any commands in a new layer on top of the current image and commit the results. The resulting committed image will be used for the next step in the Dockerfile
RUN npm install

# Can only have one CMD instruction in a Dockerfile. The main purpose is to provide defaults for an executing container
CMD ["/bin/bash"]