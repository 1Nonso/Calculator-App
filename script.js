document.addEventListener('DOMContentLoaded', () => {
    const themeSlider = document.getElementById('myRange');

    console.log('hello world')
    
    const savedTheme = localStorage.getItem('calculatorTheme') || '0';
    document.body.className = `theme-${savedTheme}`;
    themeSlider.value = savedTheme;
    
    themeSlider.addEventListener('input', function() {
        const theme = this.value;
      document.body.className = `theme-${theme}`;
      localStorage.setItem('calculatorTheme', theme);
    });
  });
      
  
  
  // Handle theme changes
  
  
  // Load saved theme or default to theme-0
  
  
  // Theme switching functionality