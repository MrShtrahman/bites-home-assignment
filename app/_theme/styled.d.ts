import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      background: string;
      backgroundGray: string;
      text: string;
      textSecondary: string;
      border: string;
      success: string;
      error: string;
      warning: string;
      white: string;
      star: string;
    };
  }
}
