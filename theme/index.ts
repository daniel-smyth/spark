import { extendTheme } from '@chakra-ui/react';
import Button from './button';
import Text from './text';

const theme = extendTheme({ components: { Button, Text } });

export default theme;
