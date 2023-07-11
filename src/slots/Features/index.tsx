import React, { type FC, type PropsWithChildren } from 'react';

import {
  Card,
  CardBody,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text
} from '@chakra-ui/react';
import { Link } from 'dumi';
import useFeatures from '../../hooks/useFeatures';

import { isOutLink } from '../../factory/tools';

import { MAXW } from '../../constant/config';

const Title: FC<PropsWithChildren<{ link?: string }>> = ({
  link,
  children
}) => {
  if (link) {
    return isOutLink(link) ? (
      <a href={link} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <Link to={link}>{children}</Link>
    );
  }

  return <>{children}</>;
};

const Features: FC = () => {
  const features = useFeatures();

  // const cardBackground = useColorModeValue('blackAlpha.50', 'gray.700');
  // const cardIconBackground = useColorModeValue('blackAlpha.50', 'gray.500');

  if (!features?.length) return null;

  return (
    <Container maxW={MAXW} paddingInline={{ base: 0, md: 8 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} h="max-content">
        {features.map(({ title, description, emoji, icon, link, tag }) => (
          <Card
            key={title}
            m="3%"
            shadow={'none'}
            bg={'none'}
            // bg={cardBackground}
            // backdropFilter="saturate(50%) blur(8px)"
          >
            <CardBody
              display="flex"
              flexDirection={'column'}
              alignItems={'center'}
            >
              {(emoji || icon) && (
                <Stack
                  w={12}
                  h={12}
                  justify="center"
                  align="center"
                  mb={5}
                  // borderRadius="md"
                  // bg={cardIconBackground}
                >
                  {emoji && <Text fontSize={24}>{emoji}</Text>}
                  {icon && (
                    <Image
                      ml={emoji ? 1.5 : 0}
                      boxSize={6}
                      src={icon}
                      alt={description}
                    />
                  )}
                </Stack>
              )}
              {title && (
                <Heading
                  as="h2"
                  fontSize="md"
                  lineHeight={6}
                  display="flex"
                  alignItems="center"
                >
                  <Title link={link}>{title}</Title>
                  {tag && (
                    <Tag
                      // bg={cardIconBackground}
                      opacity={0.7}
                      ml={2}
                      colorScheme="brand"
                      size="sm"
                    >
                      {tag}
                    </Tag>
                  )}
                </Heading>
              )}
              {description && (
                <Text
                  opacity={0.7}
                  dangerouslySetInnerHTML={{ __html: description }}
                  pt={2}
                ></Text>
              )}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
