declare module 'react-native-color' {
    import React from 'react';
    import { ViewStyle } from 'react-native';
  
    export interface ColorPickerProps {
      color: string;
      onColorChange?: (color: string) => void;
      style?: ViewStyle;
    }
  
    export const ColorPicker: React.FC<ColorPickerProps>;
  }