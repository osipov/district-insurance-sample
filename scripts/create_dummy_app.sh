#! /bin/bash
set -e
set -x

CONTAINER_SERVICE_NAME="my-containers"
WATSON_SERVICE_NAME="my-watson-service"
DUMMY_APP_NAME="dummy-docker-app"

# create containers service
cf create-service Containers free $CONTAINER_SERVICE_NAME

# NOTE: You will need to go into the Bluemix Dashboard and select this service
#		in order to set the registry name

# create Watson service
cf create-service user_modeling user_modeling_free_plan $WATSON_SERVICE_NAME

# create dummy app from Node.js
cf push $DUMMY_APP_NAME -c "node dummy.js" -i 1 -m "256M" -p dummy_app/ --no-route

# bind Watson service to dummy app
cf bind-service $DUMMY_APP_NAME $WATSON_SERVICE_NAME
cf restage $DUMMY_APP_NAME

set +x
echo "***"
echo "*** Open the Containers service in your Bluemix Dashboard and enter the registry name."
echo "***"
