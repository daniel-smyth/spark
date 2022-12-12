import React, { useRouter } from 'next/router';
import { BiMailSend } from 'react-icons/bi';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import {
  Box,
  chakra,
  Container,
  IconButton,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden
} from '@chakra-ui/react';
import Spark3Black from './icon/spark3black';

interface SocialButtonProps {
  href: string;
  label: string;
  children: any;
}

function SocialButton({ href, label, children }: SocialButtonProps) {
  return (
    <chakra.button
      bg="blackAlpha.100"
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: 'blackAlpha.200'
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}

export default function Footer() {
  const router = useRouter();

  return (
    <Box bg="gray.50" color="gray.700" mt={20}>
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid
          spacing={8}
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
        >
          <Stack spacing={6}>
            <Box>
              <Spark3Black
                cursor="pointer"
                width={60}
                style={{ paddingBottom: '3px' }}
                onClick={() => router.push('/')}
              />
            </Box>

            <Text fontSize="sm">© 2022 Spark3. All rights reserved</Text>

            <Stack direction="row" spacing={6}>
              <SocialButton label="Twitter" href="#">
                <FaTwitter />
              </SocialButton>
              <SocialButton label="YouTube" href="#">
                <FaYoutube />
              </SocialButton>
              <SocialButton label="Instagram" href="#">
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>

          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              Company
            </Text>

            <Link href="/#">About us</Link>

            <Link href="/#">Contact us</Link>

            <Link href="/#">Pricing</Link>

            <Link href="/#">Testimonials</Link>
          </Stack>
          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              Support
            </Text>

            <Link href="/#">Terms of Service</Link>

            <Link href="/#">Legal</Link>

            <Link href="/#">Privacy Policy</Link>

            <Link href="/#">Satus</Link>
          </Stack>
          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              Stay up to date
            </Text>

            <Stack direction="row">
              <Input
                placeholder="Your email address"
                bg="blackAlpha.100"
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300'
                }}
              />
              <IconButton
                rounded="lg"
                variant="solid"
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
