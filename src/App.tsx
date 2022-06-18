import { Grouping, Location } from './types';
import data from './data.json';
import logo from './logo.png';
import {
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Text,
    useColorMode,
    VStack,
} from '@chakra-ui/react';

function App() {
    const locations: Location[] = JSON.parse(JSON.stringify(data));

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const groupings: Grouping[] = alphabet.map((letter) => {
        return {
            letter,
            locations: locations.filter((l) => {
                if (!l.name.toLowerCase().startsWith('the ')) {
                    return (
                        l.name.charAt(0).toLowerCase() === letter.toLowerCase()
                    );
                } else {
                    return (
                        l.name.charAt(4).toLowerCase() === letter.toLowerCase()
                    );
                }
            }),
        };
    });

    return (
        <VStack>
            <Image src={logo} height="200px" />
            <Flex wrap="wrap" justify="flex-start">
                {groupings
                    .filter((g) => g.locations.length > 0)
                    .map((g, i) => (
                        <LetterList key={i} grouping={g} />
                    ))}
            </Flex>
        </VStack>
    );
}

interface LetterListProps {
    grouping: Grouping;
}
function LetterList({ grouping }: LetterListProps) {
    function removeArticles(str: string) {
        const words = str.split(' ');
        if (words.length <= 1) return str;
        if (words[0] === 'the') return words.splice(1).join(' ');
        return str;
    }

    const compare = (a: Location, b: Location) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();

        aName = removeArticles(aName);
        bName = removeArticles(bName);

        if (aName > bName) return 1;
        if (aName < bName) return -1;
        return 0;
    };

    const sortedLocations = grouping.locations.sort(compare);

    return (
        <VStack align="center" spacing="0" m="2">
            <Heading size="lg" borderBottom="2px" mb="1">
                {grouping.letter}
            </Heading>
            <VStack align="flex-start" spacing="0.5">
                {sortedLocations.map((loc) => (
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
