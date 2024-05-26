export const COLOR_PRIMARY_COLOR = '#000';

export const BORDER_RADIUS = 4;

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

export const defaultTheme: ThemeData = {
  borderRadius: BORDER_RADIUS,
  colorPrimary: COLOR_PRIMARY_COLOR,
};
