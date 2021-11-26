FROM node:16

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install `serve`.
RUN npm install -g serve

# Install `yarn`
RUN npm install -g yarn

# Install all dependencies of the current project.
COPY package.json package.json
RUN yarn

# Copy all local files into the image.
COPY . .

# Build for production.
RUN yarn build

# serve static files in dist folder
CMD serve -p $PORT -s build
