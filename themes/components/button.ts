const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: '12px',
      padding: '16px',
      rounded: '2xl'
    },
    md: {
      fontSize: '16px',
      padding: '24px',
      rounded: '2xl'
    }
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      color: 'blue.500',
      border: '2px solid',
      borderColor: 'blue.500'
    },
    solid: {
      bg: 'blue.500',
      color: 'white',
      _hover: {
        bg: 'blue.400'
      }
    },
    none: {
      bg: 'none',
      color: 'none'
    }
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
};

export default Button;
