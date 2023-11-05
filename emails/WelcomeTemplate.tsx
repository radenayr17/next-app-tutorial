import React, { CSSProperties } from 'react';
import { Html, Body, Container, Text, Link, Preview, Tailwind } from '@react-email/components';

interface Prop {
  name: string;
}

const WelcomeTemplate = ({ name }: Prop) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="font-bold text-3xl">Hello {name}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
