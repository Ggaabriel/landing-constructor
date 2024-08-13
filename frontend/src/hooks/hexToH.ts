function hexToH(color: string): number {
    const hex = color.slice(1);
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
  
    if (max === min) {
      h = 0; 
    } else if (max === r) {
      h = ((g - b) / (max - min) + 6) % 6;
    } else if (max === g) {
      h = (b - r) / (max - min) + 2;
    } else if (max === b) {
      h = (r - g) / (max - min) + 4;
    }
  
    return Math.round(h * 60);
  }
export default hexToH  