
## 🛠️ **Project Setup Guide**

Follow these steps to get the project running on your local machine:

### **1. Clone the Repository**  
First, copy the project to your computer using this command:  
```bash
git clone https://github.com/vinitk09/Uzence.git
```  
<img width="1718" height="877" alt="image" src="https://github.com/user-attachments/assets/697fccab-e90e-4b36-b4fd-878f927faf87" />


### **2. Navigate to the Project Folder**  
Move into the project directory:  
```bash
cd Uzence
```  


### **3. Install Dependencies**  
Install all required packages (React, TypeScript, TailwindCSS, etc.):  
```bash
npm install
```  
*(This may take a minute—it’s downloading all the project’s dependencies.)*

---

### **📖 Setting Up Storybook**  

#### **4. Initialize Storybook**  
Run this command to set up Storybook (if not already installed):  
```bash
npx storybook@latest init
```  
*(This configures Storybook for React and TypeScript automatically.)*

#### **5. Start Storybook**  
Launch the Storybook development server:  
```bash
npm run storybook
```  
This will open Storybook in your browser at:  
🔗 **[http://localhost:6006](http://localhost:6006)**  

*(You’ll see all components documented here with interactive examples!)*

---

### **🌐 View Live Demo **  
A hosted version of Storybook is available here:  
👉 **https://uzence-one.vercel.app/**  

*(This link shows the components without needing local setup.)*

---

### **📸 Screenshots of Components**  
Here’s what you’ll see once everything is running:  

# **InputField Component**  
<img width="1477" height="838" alt="image" src="https://github.com/user-attachments/assets/83d1761b-0507-4b6c-bfe3-8dbdd5cc68a5" />
<img width="1467" height="825" alt="image" src="https://github.com/user-attachments/assets/2b391c75-aa84-4468-8bdf-ee6622e48c22" />
<img width="1600" height="797" alt="image" src="https://github.com/user-attachments/assets/3c508ec4-e3c9-47d8-bb97-40a848ee8886" />




# **DataTable Component**  
<img width="1600" height="747" alt="image" src="https://github.com/user-attachments/assets/8848cc80-d06c-4b6f-ba14-b0a3b1ae6790" />
<img width="1600" height="826" alt="image" src="https://github.com/user-attachments/assets/0e39eef0-1f95-497c-ae2d-b5151292fdb1" />
<img width="1600" height="763" alt="image" src="https://github.com/user-attachments/assets/74b6f58c-e166-4fc1-b15b-cd75f0c15998" />



---

### **💡 Troubleshooting Tips**  
- If `npm install` fails, try deleting `node_modules` and running it again.  
- If Storybook doesn’t start, ensure no other app is using port `6006`.  
- For TypeScript errors, check that all dependencies are up-to-date (`npm update`).  

---


Here’s a simple, human-friendly explanation of my approach that anyone can understand:

---

## 🛠️ How I Built This Project

### My Goal
I wanted to create two components that:
1. **Work well together** but can also be used separately
2. **Look good** on all devices (phones, tablets, computers)
3. **Are easy to use** for other developers

### For the Input Field
- Made it **flexible**: You can choose different styles (filled, outline, ghost) and sizes (small, medium, large)
- Added **helpful features**:
  - Shows errors when something's wrong
  - Works when disabled
  - Can toggle password visibility
- Made sure it's **accessible**:
  - Works with screen readers
  - Can be used with just a keyboard

### For the Data Table
- Designed it to **handle real data**:
  - Sorts columns when you click headers
  - Lets you select rows (one or many)
  - Shows loading animations
  - Displays a friendly message when empty
- Made it **mobile-friendly**:
  - Scrolls sideways on small screens
  - Shows important columns first on phones

### Why I Chose These Tools
- **TypeScript**: Catches mistakes before they happen
- **TailwindCSS**: Makes styling faster and consistent
- **Storybook**: Lets me test components in isolation

### What Makes This Special
- **Clear code**: Easy to understand and modify
- **Thoughtful details**: Loading states, error handling, etc.
- **Ready for real projects**: Not just demo code

### If I Had More Time...
I'd add:
- More customization options
- Better keyboard shortcuts
- Light/dark mode toggle

---

This version sounds natural and explains the thinking behind your work without technical jargon. You can add it right before the screenshots section in your README.
