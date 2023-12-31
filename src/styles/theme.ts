import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Definição de tipos para os modos e para as cores
type Mode = 'light' | 'dark';

type ColorTokens = {
  grey: {
    [index: number]: string;
  },
  primary: {
    [index: number]: string;
  },
  purpleAccent: {
    [index: number]: string;
  },
  redAccent: {
    [index: number]: string;
  },
  blueAccent: {
    [index: number]: string;
  }
};

// Define um conjunto de tokens de cor para os modos claro e escuro
export const tokens = (mode: Mode): ColorTokens => ({
  ...(mode === "dark"
    ? {
        // Cores para o modo escuro
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        purpleAccent: {
          100: "#e4ccff",
          200: "#c999ff",
          300: "#af66ff",
          400: "#9433ff",
          500: "#7900ff",
          600: "#6100cc",
          700: "#490099",
          800: "#300066",
          900: "#180033",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        // Cores para o modo claro
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        purpleAccent: {
          100: "#e4ccff",
          200: "#c999ff",
          300: "#af66ff",
          400: "#9433ff",
          500: "#7900ff",
          600: "#6100cc",
          700: "#490099",
          800: "#300066",
          900: "#180033",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

export const themeSettings = (mode: Mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.purpleAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // Configurações da paleta para o modo claro
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.purpleAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Nunito Sans", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Nunito Sanso", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// Criação do contexto para alternância do modo de cor
type ColorModeContextType = {
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {}, // Função vazia padrão para alternância do modo
});

// Hook personalizado para usar e gerenciar o modo de cor
export const useMode = () => {
  const [mode, setMode] = useState<Mode>("light"); // Estado inicial para o modo de cor

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
  }), []);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Retorna o tema e o objeto para alternância do modo como um objeto nomeado
  return { theme, colorMode };
};