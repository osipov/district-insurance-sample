Setup
-----

Make sure you have an IBM Bluemix account. You can get one here: https://apps.admin.ibmcloud.com/manage/trial/bluemix.html

The easiest way to get started with the application is to click the following button
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/cosipov/district-insurance-sample-1.git)

If you already have access to a running version of the application, you can skip to the demonstration scenario as described in the [Demo](https://github.com/osipov/district-insurance-sample/blob/master/README.md#demo) section.

You can also run this demo in a [Docker Machine](https://github.com/osipov/district-insurance-sample/blob/master/README.md#option-1-local-docker-machine). If you are willing to do some configuration you can also use [IBM DevOps](https://github.com/osipov/district-insurance-sample#option-3-ibm-devops-delivery-pipeline) or do an interactive deployment [directly to IBM Container Service from your command line](https://github.com/osipov/district-insurance-sample#option-2-deploy-to-the-ibm-container-service-from-a-command-line). 


Run in a Docker Machine
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

Deploy to the IBM Container Service from a command line
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

You will be prompted to provide the Container Service image registry URL.

Once the IP address is provided, use it to login to http://<ip> with bob / secret as credentials.

Deploy with the IBM DevOps Delivery Pipeline
--------------------------------------


After logging into your github account, open the following repository and fork it into your own account

	https://github.com/osipov/district-insurance-sample

Note the forked URL of your github repository.

Open the Settings menu (gear icon on the upper right) on github.com and navigate to the Personal access token section from the left hand menu. 

Generate a new personal access token, keeping the scopes set and default, and name the token ```IBM DevOps```. Make sure you copy the token after generating it because you'll need it for integration with IBM DevOps.

Use your Bluemix credentials to login to https://hub.jazz.net/ and click on Create a Project.

Name your project (e.g. district-insurance-sample) and click on Link to an existing repository. Authorize Bluemix to access your github account and choose your fork of the repository as the linked repository.

Make sure that the option to make this a Bluemix project is checked off and you have correctly specified the region, organization, and space where you would like to deploy this project.

Create the project using the Create button at the bottom of the page.

Once the page changes and confirms that you have successfully created the project, click on Build & Deploy on the upper right of the page. 

In the Build & Deploy pipeline section of the page, click on Add Stage (you can name the stage Build), make sure that your forked github repository is selected and paste your github personal access token. By default, the branch should be master. 

Choose Jobs in the stage configuration, click Add Job, and select Build job type. The Builder type must be IBM Container Service. Ensure that the organization and space are selected correctly, specify district-insurance-sample as the Image Name, and click Save.

Click on Add Stage again (you can name it Deploy), and ensure that Input Type is set to Build Artifacts, Stage to your previous stage name (Build) and Job is set to Build. Select Jobs, click Add Job, and select Deploy as the job type. The deployer type must be set to IBM Container Service on Bluemix. Ensure that the organization and space are set correctly and change the name to district-insurance-sample. Click Save.

To start the build and deploy process, click on the Run Stage button shown as a play icon on the upper right of the first, Deploy stage. You can monitor the progress by clicking on the View logs and history links.

Once the build and deploy stages finish successfully, you can access the application by clicking on the IP address shown in the Last Execution Result of the Deploy stage.

Login using bob/secret as the credentials.

Demo
----

Act I

The scenario begins with the sales person starting a discussion with an insurance/financial customer about retirement plans and insurance risks. The sales person logs in to the application (use bob/secret) and opens the planning calculator (http://\<ip\>/calculator). Calculations about the financial situation of the customer leads the sales person to offer a range of company's products to the customer. The sales person opens the product list using the left hand side menu (http://<<ip>>/table). However the product list is very long and detailed. The customer doesn't know what to choose. Summary of pain points.

Scene change. 

A developer comes to the rescue. Using Bluemix to discover and add the tradeoff analytics service to the application, the developer then opens the [source code](https://github.com/osipov/district-insurance-sample/blob/master/dist/public/templates/layouts/navigation.dust) and changes the UI (the link with the investmentsIcon (not list-investmentsIcon) should change from pointing to /table to point to /investment) to take advantage of the new service. The developer relies on Docker to rapidly package and deploy the application. 

Act II

The sales person loads the latest and greatest version of the application. Returning to the customer, the sales person is now armed with a powerful analytics and visualization framework enabling a richer dialog with the customer about the range of product options.

Acknowledgements
---------------

Huge thanks to members of my team, Drew and Javier for implementing the vast majority of the code in this demo and Tarun's team for putting together the UI look and feel. I couldn't have done this without you! Also, special thanks to @dancberg and @jrmcgee for supporting the effort to build this demo and showing it off on stage at Interconnect 2015!
