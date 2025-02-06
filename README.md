# AWS Amplify Next.js CDK Template

This repository contains Infrastructure as Code (IaC) using AWS CDK to deploy a Next.js application to AWS Amplify.

## Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- GitHub account with repository access

## Quick Start

### 1. Clone this repository

```bash
git clone https://github.com/[your-username]/aws-amplify-nextjs-cdk-template.git
cd aws-amplify-nextjs-cdk-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up GitHub Token

**Important**: This is the most crucial step. Your GitHub token must have these specific permissions:

#### For Classic Personal Access Token:

- `repo` (all repository permissions)
- `admin:repo_hook` (for webhook creation)

#### For Fine-grained Personal Access Token:

- Repository access:
  - Read access to code and metadata
  - Read and Write access to repository hooks
  - Read and Write access to pull requests
  - Read and Write access to deployments
  - Read and Write access to workflows

#### To create the token:

1. Go to GitHub -> Settings -> Developer Settings -> Personal Access Tokens
2. Create a new token with the required permissions
3. Store the token in AWS Secrets Manager

### 4. Update Configuration

Edit `lib/amplify-nextjs-cdk-stack.ts` and update:

- GitHub owner name
- Repository name
- GitHub secret
- Any environment variables needed

### 5. Deploy

```bash
cdk deploy
```

## Common Issues and Solutions

### 1. "Unable to assume specified IAM Role"

- This usually means your GitHub token doesn't have sufficient permissions
- Double-check token permissions listed above
- Verify token is correctly stored in Secrets Manager

### 2. Build Failures

- Verify Next.js version compatibility
- Check Node.js version in environment variables
- Ensure all necessary files are included in artifacts
