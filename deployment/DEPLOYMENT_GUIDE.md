# AWS Deployment Guide for Portfolio Website

## Overview
This guide will help you deploy your portfolio website on AWS using S3 for static hosting and CloudFront for CDN.

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- Terraform installed (optional but recommended)

---

## Method 1: Manual Deployment (Quick & Easy)

### Step 1: Create S3 Bucket
1. Log in to AWS Console → Go to S3
2. Click "Create bucket"
3. Bucket name: `mohammed-swalih-portfolio` (must be unique globally)
4. Region: `Asia Pacific (Mumbai) ap-south-1`
5. Uncheck "Block all public access" (we need public access for website)
6. Click "Create bucket"

### Step 2: Enable Static Website Hosting
1. Click on your bucket
2. Go to "Properties" tab
3. Scroll down to "Static website hosting"
4. Click "Edit"
5. Select "Enable"
6. Index document: `index.html`
7. Error document: `index.html`
8. Click "Save changes"

### Step 3: Set Bucket Policy
1. Go to "Permissions" tab
2. Scroll to "Bucket policy"
3. Click "Edit"
4. Paste this policy (replace `YOUR_BUCKET_NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

5. Click "Save changes"

### Step 4: Upload Website Files
1. Go to "Objects" tab
2. Click "Upload"
3. Add all files from the `deployment` folder:
   - index.html
   - All images (hero-profile.jpg, project-1.jpg, etc.)
   - assets folder (CSS and JS files)
4. Click "Upload"

### Step 5: Access Your Website
1. Go to "Properties" tab
2. Scroll to "Static website hosting"
3. Copy the "Bucket website endpoint" URL
4. Open in browser!

---

## Method 2: Terraform Deployment (Recommended)

### Step 1: Install Prerequisites
```bash
# Install Terraform
# Windows: choco install terraform
# Mac: brew install terraform
# Linux: sudo apt-get install terraform

# Configure AWS CLI
aws configure
# Enter your AWS Access Key ID, Secret Access Key, region (ap-south-1)
```

### Step 2: Navigate to Terraform Directory
```bash
cd terraform
```

### Step 3: Initialize Terraform
```bash
terraform init
```

### Step 4: Review the Plan
```bash
terraform plan
```

### Step 5: Apply the Configuration
```bash
terraform apply
```

Type `yes` when prompted.

### Step 6: Upload Files to S3
After Terraform creates the infrastructure:

```bash
# Using AWS CLI
aws s3 sync ../ s3://mohammed-swalih-portfolio/ --exclude "terraform/*" --exclude "*.md"
```

Or manually upload via AWS Console.

### Step 7: Get Your Website URL
Terraform will output:
- `cloudfront_url` - Your CDN URL (faster, recommended)
- `s3_website_url` - Direct S3 URL

---

## Method 3: AWS CLI Only

### Create and Configure Bucket
```bash
# Create bucket
aws s3 mb s3://mohammed-swalih-portfolio --region ap-south-1

# Remove public access block
aws s3api put-public-access-block \
  --bucket mohammed-swalih-portfolio \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

# Set bucket policy
aws s3api put-bucket-policy \
  --bucket mohammed-swalih-portfolio \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::mohammed-swalih-portfolio/*"
      }
    ]
  }'

# Enable website hosting
aws s3api put-bucket-website \
  --bucket mohammed-swalih-portfolio \
  --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "index.html"}
  }'

# Upload files
aws s3 sync . s3://mohammed-swalih-portfolio/ --exclude "terraform/*" --exclude "*.md"
```

---

## Custom Domain (Optional)

### Using Route 53
1. Register domain in Route 53 or transfer existing domain
2. Create a hosted zone
3. Add A record pointing to CloudFront distribution
4. Request SSL certificate from AWS Certificate Manager
5. Update CloudFront distribution with custom domain and SSL

### Using External Domain
1. Get your CloudFront distribution domain name
2. Create CNAME record in your DNS provider:
   - Name: `www` or `@`
   - Value: `YOUR_CLOUDFRONT_ID.cloudfront.net`

---

## Cost Estimation (Monthly)

| Service | Estimated Cost |
|---------|---------------|
| S3 Storage (~500KB) | ~$0.01 |
| S3 Data Transfer | ~$0.10-1.00 |
| CloudFront | ~$0.10-1.00 |
| **Total** | **~$0.20-2.00/month** |

Very affordable for a portfolio site!

---

## Troubleshooting

### Website shows 403 Forbidden
- Check bucket policy is correct
- Verify public access is enabled
- Ensure files are uploaded

### Website shows 404 Not Found
- Check index.html exists in bucket
- Verify static website hosting is enabled
- Check error document is set to index.html

### Changes not reflecting
- CloudFront caches content for 24 hours
- Create invalidation: AWS Console → CloudFront → Distribution → Invalidations → Create invalidation → `/*`

---

## File Structure to Upload

```
s3://mohammed-swalih-portfolio/
├── index.html
├── hero-profile.jpg
├── project-1.jpg
├── project-2.jpg
├── project-3.jpg
├── project-4.jpg
├── project-5.jpg
├── project-6.jpg
└── assets/
    ├── index-XXXXXX.css
    └── index-XXXXXX.js
```

---

## Need Help?

- AWS S3 Documentation: https://docs.aws.amazon.com/s3/
- CloudFront Documentation: https://docs.aws.amazon.com/cloudfront/
- Terraform AWS Provider: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
