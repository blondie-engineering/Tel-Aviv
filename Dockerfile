FROM node:10.16.2-alpine

ENV NEXT_PUBLIC_SERVER=http://ec2-34-255-209-116.eu-west-1.compute.amazonaws.com/3000
# add app
COPY . .
EXPOSE 4200 3000


CMD ["npm", "run", "dev"]
