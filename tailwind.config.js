/** @type {import('tailwindcss').Config} */
export default {
  // In Tailwind v4, explicit content paths are needed
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // Add Kobalte support using dynamic import for ES module compatibility
  plugins: [
    // Load the Kobalte plugin (must be defined as a function for ES modules)
    async () => {
      const kobalte = await import('@kobalte/tailwindcss');
      return kobalte.default;
    }
  ],
};