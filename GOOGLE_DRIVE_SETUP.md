# Using Google Drive Links for Profile Photo and Resume

## How to Get Google Drive Links

### Step 1: Upload Your Files to Google Drive

1. **Go to Google Drive**: https://drive.google.com
2. **Upload your profile photo** (JPG/PNG format)
3. **Upload your resume** (PDF format)

### Step 2: Get Shareable Links

#### For Profile Photo:
1. **Right-click** on your profile photo in Google Drive
2. **Select "Share"**
3. **Click "Copy link"**
4. **The link will look like**: `https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing`

#### For Resume:
1. **Right-click** on your resume in Google Drive
2. **Select "Share"**
3. **Click "Copy link"**
4. **The link will look like**: `https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing`

### Step 3: Convert to Direct Download Links

**Important**: Google Drive sharing links don't work directly for images. You need to convert them to direct download links.

#### Method 1: Manual Conversion
Replace the sharing link format:
- **From**: `https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing`
- **To**: `https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`

#### Method 2: Use Online Converter
1. Go to: https://sites.google.com/site/gdocs2direct/
2. Paste your Google Drive link
3. Click "Create Direct Link"
4. Copy the generated direct link

### Step 4: Update Your Portfolio

1. **Open**: `src/data/personalInfo.ts`
2. **Replace the placeholders**:

```typescript
export const personalInfo = {
  // ... other properties
  profilePhoto: "https://drive.google.com/uc?export=view&id=YOUR_IMAGE_FILE_ID",
  resume: "https://drive.google.com/uc?export=download&id=YOUR_RESUME_FILE_ID",
  // ... other properties
};
```

## Example

If your Google Drive links are:
- **Profile Photo**: `https://drive.google.com/file/d/1ABC123DEF456/view?usp=sharing`
- **Resume**: `https://drive.google.com/file/d/7XYZ789GHI012/view?usp=sharing`

Then update to:
```typescript
export const personalInfo = {
  // ... other properties
  profilePhoto: "https://drive.google.com/uc?export=view&id=1ABC123DEF456",
  resume: "https://drive.google.com/uc?export=download&id=7XYZ789GHI012",
  // ... other properties
};
```

## File ID Extraction

The **File ID** is the long string between `/d/` and `/view` in your Google Drive link:
- Link: `https://drive.google.com/file/d/1ABC123DEF456/view?usp=sharing`
- File ID: `1ABC123DEF456`

## Troubleshooting

### If Image Doesn't Load:
1. Make sure you're using the direct download format
2. Check that the file is publicly accessible
3. Try the online converter mentioned above

### If Resume Download Doesn't Work:
1. Use `export=download` instead of `export=view`
2. Make sure the file is publicly accessible
3. Test the link in a new browser tab

### Alternative: Use Imgur for Images
If Google Drive doesn't work well for images, you can:
1. Upload your photo to Imgur: https://imgur.com
2. Right-click the image and "Copy image address"
3. Use that direct link instead

## Security Note
- Make sure your Google Drive files are set to "Anyone with the link can view"
- Don't use private files as they won't be accessible 