set -e

# remove "--delete" if you're using lazy loading to avoid breaking clients running old version
aws s3 sync --delete ./build s3://c18demo-frontend
aws cloudfront create-invalidation --distribution-id E3KBZBMTDDLR5O --paths '/*'
