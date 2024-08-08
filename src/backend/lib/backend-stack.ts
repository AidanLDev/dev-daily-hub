import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";

import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const domainName = "devdailyhub.com";
const wwwDomainName = "www.devdailyhub.com";

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Create an S3 bucket to store Astro build artifacts
    const bucket = new s3.Bucket(this, "AstroBucket", {
      bucketName: "dev-daily-hub-static-files-Aidan-01Lowson",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create a Certificate in AWS Certificate Manager
    const certificate = new certificatemanager.Certificate(
      this,
      "Certificate",
      {
        domainName,
        subjectAlternativeNames: [wwwDomainName],
        validation: certificatemanager.CertificateValidation.fromDns(),
      },
    );

    // Create a Route 53 Hosted Zone
    const zone = new route53.HostedZone(this, "HostedZone", {
      zoneName: domainName,
    });

    // Create a CloudFront distribution to serve your Astro application
    const distribution = new cloudfront.Distribution(this, "DevDailyHubDist", {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [domainName, wwwDomainName],
      certificate: certificate,
    });

    // Create a Route 53 A record for the primary domain
    new route53.ARecord(this, "PrimaryDomainRecord", {
      recordName: domainName,
      target: route53.RecordTarget.fromValues(
        distribution.distributionDomainName,
      ),
      zone: zone,
    });

    // Create a Route 53 A record for the www subdomain
    new route53.ARecord(this, "WWWDomainRecord", {
      recordName: wwwDomainName,
      target: route53.RecordTarget.fromValues(
        distribution.distributionDomainName,
      ),
      zone: zone,
    });

    // example resource
    // const queue = new sqs.Queue(this, 'BackendQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
