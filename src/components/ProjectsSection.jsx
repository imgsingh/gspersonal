import React from 'react';
import FullScreenSection from './FullScreenSection';
import { Box, Heading, Image } from '@chakra-ui/react';
import Card from './Card';
import { Fragment } from 'react';

const projects = [
  {
    title: 'DogStore - Training project.',
    description: 'an eCommerce app using Java and Firebase to demonstrate my knowledge. '+
    'We used PayU SDK for processing payments, genrating email to client and local company and used a local company to add images of products for purchase.',
    getImageSrc: () => require('../assets/image/dogstore-screen.PNG'),
    showImage : true
  },
  {
    title: 'Image Gallery',
    description: 'This project is an image gallery which uses splash api for data. This uses react with redux and saga.',
    getImageSrc: () => require('../assets/image/image-gallery.png'),
    showImage : true,
    link : 'https://imgsingh.github.io/Image-Gallery'
  },
  {
    title: 'QuizMasters',
    description:
      'A quiz game with 4 options and based on correct answers user will win or lose. A vertical bar implemented for the number of questions correctly answered and money winned.',
    getImageSrc: () => require('../assets/image/quizmasters.png'),
    showImage : true
  }
];

const ProjectsSection = () => {
  return (
      <FullScreenSection
        backgroundColor="purple.400"
        isDarkBackground
        p={8}
        alignItems="center"
        spacing={8}
        id="project-section"
      >
        <Heading
          as="h1"
          id="projects-section"
        >
          Personal Projects
        </Heading>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2,minmax(0,1fr))"
          gridGap={8}
        >
          {projects.map(({title, description, getImageSrc, showImage, link}) => (
            <Fragment key={title}>
              <Card 
                title={title}
                description={description}
                getImageSrc={getImageSrc()}
                link={link}
              />
              {
                showImage ? <Image src={getImageSrc()} alt={title} borderRadius="lg" /> : ''
              }
              
            </Fragment>
          ))}
        </Box>
      </FullScreenSection>
  );
};

export default ProjectsSection;
