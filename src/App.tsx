import { Grouping, Location } from './types';
import data from './data.json';
import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

function App() {
  const locations: Location[] = JSON.parse(JSON.stringify(data));

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const groupings: Grouping[] = alphabet.map((letter) => {
    return {
      letter,
      locations: locations.filter(
        (l) => l.name.charAt(0).toLowerCase() === letter.toLowerCase()
      ),
    };
  });

  console.log(groupings);

  return (
    <Flex wrap="wrap" justify="flex-start">
      {groupings
        .filter((g) => g.locations.length > 0)
        .map((g, i) => (
          <LetterList key={i} grouping={g} />
        ))}
    </Flex>
  );
}

interface LetterListProps {
  grouping: Grouping;
}
function LetterList({ grouping }: LetterListProps) {
  return (
    <VStack align="center" spacing="0" m="2">
      <Heading size="lg" borderBottom="2px" mb="1">
        {grouping.letter}
      </Heading>
      <VStack align="flex-start" spacing="0.5">
        {grouping.locations
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((loc) => (
            <Text>
              {loc.name} - {loc.coordinates}
            </Text>
          ))}
      </VStack>
    </VStack>
  );
}

interface LocationCardProps {
  location: Location;
}
function LocationCard({ location }: LocationCardProps) {
  return (
    <VStack m="1" p="2" border="1px" borderRadius="md">
      <Heading size="sm">
        {location.name} - {location.coordinates}
      </Heading>
      <Text>Type: {location.type}</Text>
      <Text>Region: {location.region}</Text>
    </VStack>
  );
}

export default App;
