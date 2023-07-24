import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';
import { Box, HStack, Link } from '@chakra-ui/react';

const socials = [
  {
    icon: faEnvelope,
    url: 'mailto:gursimranbasra7@gmail.com',
  },
  {
    icon: faGithub,
    url: 'https://github.com/imgsingh',
  },
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/gursimran-singh-32986b144/',
  },
  {
    icon: faMedium,
    url: 'https://medium.com/@gursimranbasra7.gs',
  },
  {
    icon: faStackOverflow,
    url: 'https://stackoverflow.com/users/22227170/gursimran-singh',
  },
];

const Headers = () => {
  const headerRef = useRef(null)

  
  useEffect(() => {
    let prevScroll = window.scrollY

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const headerElement = headerRef.current
  
      if (!headerElement) return;

      if (prevScroll > currentScroll) {
        headerElement.style.transform = 'translateY(0)'
      } else {
        headerElement.style.transform = 'translateY(-200px)'
      }

      prevScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    console.log('click')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      zIndex={10}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="blackAlpha.800"
      borderBottom="1px"
      borderColor="blackAlpha.900"
    >
      <Box
        color="white"
        maxWidth="1280px"
        margin="0 auto"
      >
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={6}>
              {socials.map((social) => (
                <Link
                  key={social.url}
                  href={social.url}
                  isExternal
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={social.icon}
                  />
                </Link>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a href="#projects" onClick={handleClick("projects")}>Projects</a>
              <a href="#contact-me" onClick={handleClick("contactme")}>Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Headers;
