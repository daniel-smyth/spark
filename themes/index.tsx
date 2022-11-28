import { extendTheme } from '@chakra-ui/react';
import Button from './components/button';
import Text from './components/text';

const theme = extendTheme({
  components: {
    Button,
    Text
  }
});

export default theme;
