import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTextColor',
  pure: true, // Ensures it updates only when needed
})
export class GetTextColorPipe implements PipeTransform {
  transform(bgColor: string): string {
    if (!bgColor) return '#000'; // Default to black if no color provided

    // Ensure color is in hex format
    if (bgColor.startsWith('rgb')) {
      // Convert RGB to Hex if needed
      const rgbMatch = bgColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch.map(Number);
        bgColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
          .toString(16)
          .slice(1)}`;
      }
    }

    // Convert hex color to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance (YIQ formula)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Return white text for dark backgrounds, black for light
    return yiq >= 128 ? '#000' : '#fff';
  }
}
