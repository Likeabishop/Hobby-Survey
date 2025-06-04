# Hobby-Survey Frontend

This is the frontend for Hobby-Survey, built with **React**, **TypeScript**, and **Vite**. It provides a modern, responsive UI for survey submission and analytics dashboard.

## 🛠 Technologies Used

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS** (with custom theme)
- **Radix UI** components
- **Lucide Icons**
- **date-fns** for date handling

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   cd front-end
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Lint the code:**
   ```bash
   npm run lint
   ```

## 📡 API Integration

The frontend expects the backend API to be running at `http://localhost:5000/api/survey`.

### Survey Submission (POST)

**Request:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "contactNumber": "+2771234567",
  "age": 25,
  "dateOfBirth": "1999-01-01",
  "favoriteFoods": ["Pizza", "Pap and Wors"],
  "ratingWatchMovies": 4,
  "ratingListenToRadio": 5,
  "ratingEatOut": 3,
  "ratingWatchTv": 4
}
```

### Survey Analytics (GET)

**Endpoint:** `/api/survey/analytics`

**Response:**
```json
{
  "totalSurveys": 5,
  "averageAge": 32.5,
  "youngestAge": 20,
  "oldestAge": 55,
  "pizzaLoversPercentage": 60.0,
  "pastaLoversPercentage": 40.0,
  "papAndWorsLoversPercentage": 20.0,
  "averageWatchMoviesRating": 3.8,
  "averageListenToRadioRating": 4.2,
  "averageEatOutRating": 3.5,
  "averageWatchTvRating": 2.9
}
```

## 📝 Notes

- Make sure the backend is running before submitting surveys or viewing analytics.
- For more details on API endpoints, see [Backend README](/back-end/README.md).

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
