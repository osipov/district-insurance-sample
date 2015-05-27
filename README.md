Setup
-----

Make sure you have an IBM Bluemix account. You can get one here: https://apps.admin.ibmcloud.com/manage/trial/bluemix.html

The following instructions will help you run the demo in a [Docker Machine](https://github.com/osipov/district-insurance-sample/blob/master/README.md#option-1-local-docker-machine). You can also use IBM DevOps or an interactive deployment [directly to IBM Container Service from your command line](https://github.com/osipov/district-insurance-sample#option-2-deploy-to-the-ibm-container-service-from-a-command-line). 

Option 1. Docker or Docker Machine
--------------------

If you don't have Docker Machine installed, you can find out how to install one here: https://docs.docker.com/machine/#installation

To get started, enter your Docker Machine environment with

	docker-machine ssh

Check out the latest version of the code using

	git clone https://github.com/osipov/district-insurance-sample.git

and install the required command line tools using the following

	tce-load -wi make

	curl -o cf.tgz -L -O https://cli.run.pivotal.io/stable?release=linux32-binary
	sudo tar -zxvf cf.tgz -C /usr/bin/

	tce-load -wi python
	curl https://bootstrap.pypa.io/get-pip.py -o - | sudo python
	curl https://bootstrap.pypa.io/ez_setup.py -o - | sudo python
	curl -O https://static-ice.ng.bluemix.net/icecli-2.0.zip
	sudo pip install icecli-2.0.zip

Change directory to district-insurance-sample and run the build and deploy process

	make build-release-local

When prompted for the image name (defaults to district-insurance-sample), you can hit enter to accept the default or type in your own. You will also be prompted to use your Bluemix credentials to login. Please note the credentials for Tradeoff Analytics shown as a JSON string. You will have to enter these credentials as part of the deploy process.

The default deployment maps the container port 80 to host port 8080, so depending on the port forwarding configuration of your environment, the application should be accessible from your Docker Machine IP address which you can check using

	docker-machine ip
	
so the demo application should be accessible from

	http://<ip>:8080/

where you can login using bob / secret

The scenario is described in more detail in the [Demo](https://github.com/osipov/district-insurance-sample/blob/master/README.md#demo) section.

Option 2. Deploy to the IBM Container Service from a command line
-------------------------------------------------
*NOTE* These steps will only work on Linux or OS X. If you are running Windows, you should use the Docker Machine option described earlier.

Download and install IBM Bluemix (Cloud Foundry) and IBM Container Service clients. The Cloud Foundry CLI is available for your platform from: https://github.com/cloudfoundry/cli#downloads

You can download the IBM Container Service client from https://static-ice.ng.bluemix.net/icecli-2.0.zip

If you are using PIP, you can install using 

	sudo pip install icecli-2.0.zip

otherwise you'll have to unzip and install the client manually.

Check out the latest version of the code using

	git clone https://github.com/osipov/district-insurance-sample.git

Start the process to build and to deploy to IBM Bluemix / Container Service:

	make build-release-bluemix

When prompted for the image name (defaults to district-insurance-sample) and the Bluemix Cloud Foundry API endpoint (defaults to https://api.ng.bluemix.net) you can hit enter to accept the defaults or type in your own.

When prompted by the cf login command use your Bluemix credentials to login. Specify the organization and space where to deploy the application.

The release process will remind you to make sure there are no conflicting Container Service instances in your organization. It will also deploy a NOOP app to integrate the demo application with the Tradeoff Analytics service.

Once the Container Service is created, follow the instructions to obtain the Container Service API key and enter it when prompted. Note the IP address provided by the Container Service and enter it when prompted. **WARNING**: it is likely that this step will fail due to high demand for the Container Service.

Once the IP address is provided, use it to login to http://<ip> with bob / secret as credentials.


Option 3. IBM DevOps Delivery Pipeline
--------------------------------------



Demo
----

Act I

The scenario begins with the sales person starting a discussion with an insurance/financial customer about retirement plans and insurance risks. The sales person logs in to the application (use bob/secret) and opens the planning calculator (http://<ip>/calculator). Calculations about the financial situation of the customer leads the sales person to offer a range of company's products to the customer. The sales person opens the product list using the left hand side menu (http://<ip>/table). However the product list is very long and detailed. The customer doesn't know what to choose. Summary of pain points.

Scene change. 

A developer comes to the rescue. Using Bluemix to discover and add the tradeoff analytics service to the application, the developer then opens the [source code](https://hub.jazz.net/project/jhpedemonte/node_docker_sample/overview#https://hub.jazz.net/gerrit/plugins/gerritfs/contents/jhpedemonte%252Fnode_docker_sample/refs%252Fheads%252Ftradeoff/dist/public/templates/layouts/navigation.dust) and changes the UI (the link with the investmentsIcon (not list-investmentsIcon) should change from pointing to /table to point to /investment) to take advantage of the new service. The developer relies on Docker to rapidly package and deploy the application. 

Act II

The sales person loads the latest and greatest version of the application. Returning to the customer, the sales person is now armed with a powerful analytics and visualization framework enabling a richer dialog with the customer about the range of product options.

Ackowledgements
---------------

Huge thanks to members of my team, Drew and Javier for implementing the vast majority of the code in this demo and Tarun's team for putting together the UI look and feel. I couldn't have done this without you! Also, special thanks to @dancberg and @jrmcgee for supporting the effort to build this demo and showing it off on stage at Interconnect 2015!
