import { extendTheme } from "@chakra-ui/react";
import Button from "../themes/components/button";
import Text from "../themes/components/text";

const theme = extendTheme({
  components: {
    Button,
    Text,
  },
});

export default theme;
