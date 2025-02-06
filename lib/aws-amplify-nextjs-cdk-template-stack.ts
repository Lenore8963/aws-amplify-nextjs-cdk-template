import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  App,
  GitHubSourceCodeProvider,
  RedirectStatus,
  Platform,
} from "@aws-cdk/aws-amplify-alpha";
import { BuildSpec } from "aws-cdk-lib/aws-codebuild";

export class AwsAmplifyNextjsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Amplify App
    const amplifyApp = new App(this, "NextJsAmplifyApp", {
      appName: "NextJS 15 app from CDK",
      platform: Platform.WEB_COMPUTE,
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: "YOUR_GITHUB_USERNAME", // update when your repo is ready
        repository: "YOUR_NEXTJS_REPO", // update when your repo is ready
        oauthToken: cdk.SecretValue.secretsManager("YOUR-GITHUB-TOKEN-SECRET"), // set up in aws secrets manager
      }),
      autoBranchDeletion: true,
      buildSpec: BuildSpec.fromObject({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: ["npm ci"],
            },
            build: {
              commands: ["npm run build"],
            },
          },
          artifacts: {
            baseDirectory: ".next",
            files: ["**/*"],
          },
          cache: {
            paths: ["node_modules/**/*"],
          },
        },
      }),
      environmentVariables: {
        NODE_VERSION: "18.x",
      },
      customRules: [
        {
          source: "/<*>",
          target: "/index.html",
          status: RedirectStatus.NOT_FOUND_REWRITE,
        },
      ],
    });

    // Add production branch
    amplifyApp.addBranch("main", {
      stage: "PRODUCTION",
    });

    // Output the App URL
    new cdk.CfnOutput(this, "AmplifyURL", {
      value: `https://main.${amplifyApp.defaultDomain}`,
    });
  }
}
