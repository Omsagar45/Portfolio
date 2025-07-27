# Adding Your Assets

## Profile Photo
1. **Add your profile photo** to the `src/assets/images/` directory
2. **Rename it** to `profile-photo.jpg` (or update the path in `src/data/personalInfo.ts`)
3. **Recommended format**: JPG or PNG
4. **Recommended size**: At least 400x400 pixels (square aspect ratio works best)
5. **File path**: `src/assets/images/profile-photo.jpg`

## Resume
1. **Add your resume** to the `src/assets/documents/` directory
2. **Rename it** to `om-sagar-resume.pdf` (or update the path in `src/data/personalInfo.ts`)
3. **Recommended format**: PDF
4. **File path**: `src/assets/documents/om-sagar-resume.pdf`

## Steps to Add Files:

### Option 1: Using File Explorer
1. Navigate to your portfolio folder: `C:\Users\91738\Desktop\Web Dev Projects\Portfolio Website\portfolio\`
2. Go to `src/assets/images/` and add your profile photo
3. Go to `src/assets/documents/` and add your resume

### Option 2: Using Command Line
```bash
# Copy your profile photo (replace with your actual file path)
copy "C:\path\to\your\photo.jpg" "src\assets\images\profile-photo.jpg"

# Copy your resume (replace with your actual file path)
copy "C:\path\to\your\resume.pdf" "src\assets\documents\om-sagar-resume.pdf"
```

## Customizing File Names
If you want to use different file names, update the paths in `src/data/personalInfo.ts`:

```typescript
export const personalInfo = {
  // ... other properties
  profilePhoto: "/src/assets/images/your-photo-name.jpg",
  resume: "/src/assets/documents/your-resume-name.pdf",
  // ... other properties
};
```

## After Adding Files
1. Save the files in the correct directories
2. The website will automatically use your files
3. If the profile photo fails to load, it will show a placeholder
4. The "Download Resume" button will work once your resume is added

## File Requirements
- **Profile Photo**: JPG, PNG, or WebP format
- **Resume**: PDF format (recommended for professional appearance)
- Make sure files are not too large (under 5MB each for better performance) 