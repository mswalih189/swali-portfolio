#!/bin/bash

# AWS Deployment Script for Portfolio Website
# This script deploys the portfolio to AWS S3

set -e

# Configuration
BUCKET_NAME="mohammed-swalih-portfolio"
REGION="ap-south-1"

echo "==================================="
echo "Portfolio Website Deployment Script"
echo "==================================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html"
    exit 1
fi

echo "✅ AWS CLI found"

# Check if user is logged in
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ Not logged in to AWS. Please run: aws configure"
    exit 1
fi

echo "✅ AWS credentials valid"
echo ""

# Create bucket if it doesn't exist
echo "📦 Creating S3 bucket (if not exists)..."
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "✅ Bucket already exists"
else
    aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
    echo "✅ Bucket created"
fi

# Remove public access block
echo "🔓 Configuring public access..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
    BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

echo "✅ Public access configured"

# Set bucket policy
echo "📝 Setting bucket policy..."
aws s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy "{
        \"Version\": \"2012-10-17\",
        \"Statement\": [
            {
                \"Sid\": \"PublicReadGetObject\",
                \"Effect\": \"Allow\",
                \"Principal\": \"*\",
                \"Action\": \"s3:GetObject\",
                \"Resource\": \"arn:aws:s3:::$BUCKET_NAME/*\"
            }
        ]
    }"

echo "✅ Bucket policy set"

# Enable website hosting
echo "🌐 Enabling static website hosting..."
aws s3api put-bucket-website \
    --bucket "$BUCKET_NAME" \
    --website-configuration '{
        "IndexDocument": {"Suffix": "index.html"},
        "ErrorDocument": {"Key": "index.html"}
    }'

echo "✅ Static website hosting enabled"

# Upload files
echo ""
echo "📤 Uploading files to S3..."
aws s3 sync . "s3://$BUCKET_NAME/" \
    --exclude "terraform/*" \
    --exclude "*.md" \
    --exclude "deploy.sh" \
    --delete

echo "✅ Files uploaded successfully"

# Get website URL
echo ""
echo "==================================="
echo "🎉 Deployment Complete!"
echo "==================================="
echo ""
echo "Your portfolio is live at:"
echo "http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo ""
echo "📋 Next Steps:"
echo "   1. Open the URL above in your browser"
echo "   2. Verify all content is loading correctly"
echo "   3. Consider setting up CloudFront for better performance"
echo ""
echo "📖 For custom domain and CloudFront setup, see DEPLOYMENT_GUIDE.md"
echo ""
