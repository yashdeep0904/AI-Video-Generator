🎬 AI Video Studio (Generative Video Prototype)

Welcome to the AI Video Studio, a modern, responsive frontend prototype for a generative text-to-video platform. This application simulates the workflow of a high-end AI video generator (like Runway Gen-2, Sora, or Luma Dream Machine) with a sleek UI, state machine progress indicators, and custom HTML5 video playback.

Currently, it uses the Pixabay Video API to intelligently fetch real stock videos based on your text prompts, acting as a functional placeholder for a true AI diffusion backend.

✨ Features

Dynamic Prompt Engine: Text area with character limits and a magic "Enhance Prompt" button to automatically add cinematic keywords.

Visual Style Presets: Quick-select cards for styles like Cinematic, Anime, Cyberpunk, Realistic, and 3D Render.

Generation Parameters: Interactive sliders and toggles for Aspect Ratio (16:9, 9:16, 1:1), Duration, and Motion Strength.

State Machine Workflow: Beautiful, multi-step progress indicator simulating the AI rendering pipeline (Submitting -> Parsing Latents -> Rendering -> Encoding).

Custom HTML5 Video Player: A custom-built player overlay featuring play/pause, volume controls, scrubbable timeline, playback speed (0.5x - 2.0x), and fullscreen mode.

Keyword-Matched Video Fetching: Automatically extracts keywords from your prompt and fetches a matching royalty-free video using the Pixabay API.

History Gallery: Keeps track of your recently generated videos during the session, allowing you to click and reload past clips into the main player.

Export Controls: UI for selecting download resolution and format (MP4, WebM, GIF).

🛠️ Tech Stack

Framework: React.js

Styling: Tailwind CSS

Icons: Lucide React

Video Data: Pixabay Video API

🚀 Getting Started

Prerequisites

You will need Node.js installed on your machine and a free API key from Pixabay.

Go to the Pixabay API Documentation.

Log in or create a free account.

Scroll down to the Parameters section to find your green highlighted API key. Copy this string.

Installation

Clone the repository (or create a new Vite React app):

npm create vite@latest ai-video-studio -- --template react
cd ai-video-studio


Install Dependencies:
You will need Tailwind CSS and Lucide React.

npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


(Ensure your tailwind.config.js is set up to scan your src folder).

Add the Components:
Place the provided component files (Navbar.jsx, PromptPanel.jsx, VideoPlayer.jsx, etc.) inside src/components/ and update src/App.jsx.

Configure the API Key:
Open src/App.jsx. Locate the finishGeneration function and replace the placeholder with your actual Pixabay key:

const PIXABAY_API_KEY = 'PASTE_YOUR_PIXABAY_KEY_HERE'; 


Run the Development Server:

npm run dev


Open http://localhost:5173 in your browser.

📂 Project Structure

src/
├── components/
│   ├── ExportBar.jsx         # Format and resolution download UI
│   ├── HistoryGallery.jsx    # Bottom drawer showing previous generations
│   ├── Navbar.jsx            # Top navigation and token counter
│   ├── ProgressIndicator.jsx # State machine loading screens
│   ├── PromptPanel.jsx       # Left sidebar (Prompt, Presets, Sliders)
│   └── VideoPlayer.jsx       # Custom HTML5 `<video>` player engine
├── App.jsx                   # Main layout, state management, and API logic
├── index.css                 # Tailwind imports
└── main.jsx                  # React entry point


🔮 Future Improvements (Real AI Integration)

This frontend is designed to be easily hooked up to a real AI video backend. To upgrade from Pixabay stock videos to true generative AI:

Set up a Node.js/Express or Next.js backend.

Integrate an API like Replicate, Fal.ai, or Runway.

In App.jsx, change the fetch request in finishGeneration to point to your new backend endpoint, passing the prompt, preset, and aspectRatio as a JSON payload.

Return the generated .mp4 URL from your server to the React frontend.

📄 License

This project is open-source and available under the MIT License.