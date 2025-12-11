const LIGHT_COLORS = {
  LIGHT_BLUE: '#3b82f6',
  BLUE: '#2563eb',

  WHITE: '#fff',
  BLACK: '#000',

  GRAY_1: '#f3f4f6',
  GRAY_2: '#e5e7eb',
  GRAY_3: '#6b7280',
  GRAY_4: '#111827',

  GREEN: '#10b981',
  RED: '#ef4444',
  LIGHT_YELLOW: '#fbbf24',
  YELLOW: '#f59e0b'
} as const;

const DARK_COLORS = {
  LIGHT_BLUE: '#60a5fa',
  BLUE: '#3b82f6',

  WHITE: '#fff',
  BLACK: '#000',

  GRAY_1: '#111827',
  GRAY_2: '#6b7280',
  GRAY_3: '#e5e7eb',
  GRAY_4: '#f3f4f6',

  GREEN: '#34d399',
  RED: '#f87171',
  LIGHT_YELLOW: '#fbbf24',
  YELLOW: '#f59e0b'
} as const;

export const lightTheme = {
  colors: {
    primary: LIGHT_COLORS.LIGHT_BLUE,
    primaryDark: LIGHT_COLORS.BLUE,

    background: LIGHT_COLORS.WHITE,
    backgroundGray: LIGHT_COLORS.GRAY_1,

    text: LIGHT_COLORS.GRAY_4,
    textSecondary: LIGHT_COLORS.GRAY_3,

    border: LIGHT_COLORS.GRAY_2,

    success: LIGHT_COLORS.GREEN,
    error: LIGHT_COLORS.RED,
    warning: LIGHT_COLORS.YELLOW,

    white: LIGHT_COLORS.WHITE,
    star: LIGHT_COLORS.LIGHT_YELLOW
  }
};

export const darkTheme = {
  colors: {
    primary: DARK_COLORS.LIGHT_BLUE,
    primaryDark: DARK_COLORS.BLUE,

    background: DARK_COLORS.BLACK,
    backgroundGray: DARK_COLORS.GRAY_1,

    text: DARK_COLORS.WHITE,
    textSecondary: DARK_COLORS.GRAY_3,

    border: DARK_COLORS.GRAY_2,

    success: DARK_COLORS.GREEN,
    error: DARK_COLORS.RED,
    warning: DARK_COLORS.YELLOW,

    white: DARK_COLORS.WHITE,
    star: DARK_COLORS.LIGHT_YELLOW
  }
};

export type Theme = typeof lightTheme;
