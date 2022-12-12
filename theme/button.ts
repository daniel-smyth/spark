const Button = {
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
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
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
};

export default Button;
