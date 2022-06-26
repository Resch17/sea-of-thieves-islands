import { Grouping, Location } from './types';
import data from './data.json';
import {
    Box,
    Flex,
    GridItem,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    useColorMode,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { GiLockedFortress, GiIsland } from 'react-icons/gi';
import { GoQuestion } from 'react-icons/go';
import { BiStore } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { BsPatchPlus, BsSignpostSplit } from 'react-icons/bs';
import './App.css';

const determineColor = (region: string): string => {
    switch (region) {
        case 'The Ancient Isles':
            return 'blue';
        case 'The Shores of Plenty':
            return 'yellow';
        case 'The Wilds':
            return 'green';
        case 'The Devil’s Roar':
            return 'red';
        default:
            return 'gray';
    }
};

const regions = [
    'The Shores of Plenty',
    'The Wilds',
    'The Ancient Isles',
    'The Devil’s Roar',
];

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
        <VStack fontFamily={'"JetBrains Mono", monospace'}>
            <HStack pt="1">
                <Heading size="sm">Regions: </Heading>
                <SimpleGrid columns={2} border="1px">
                    {regions.map((region) => (
                        <GridItem
                            w="200px"
                            textAlign="center"
                            key={region}
                            colSpan={1}
                            bgColor={`${determineColor(
                                region
                            )}.${useColorModeValue('100', '700')}`}
                        >
                            {region}
                        </GridItem>
                    ))}
                </SimpleGrid>
            </HStack>
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

    const { toggleColorMode } = useColorMode();

    return (
        <VStack align="center" spacing="0" m="2">
            <Heading
                size="lg"
                borderBottom="2px"
                mb="1"
                onClick={toggleColorMode}
            >
                {grouping.letter}
            </Heading>
            <Flex direction="column" align="flex-start">
                {sortedLocations.map((loc, i) => (
                    <LocationCard
                        key={i}
                        location={loc}
                        lastItem={i === sortedLocations.length - 1}
                    />
                ))}
            </Flex>
        </VStack>
    );
}

interface LocationCardProps {
    location: Location;
    lastItem: boolean;
}
function LocationCard({ location, lastItem }: LocationCardProps) {
    const determineIcon = (): IconType => {
        switch (location.type) {
            case 'Fortress':
                return GiLockedFortress;
            case 'Outpost':
                return BiStore;
            case 'Seapost':
                return BsSignpostSplit;
            case 'Small Island':
                return GiIsland;
            case 'Large Island':
                return BsPatchPlus;
            default:
                return GoQuestion;
        }
    };

    return (
        <HStack
            px="1"
            py="0.5"
            borderTop="1px"
            borderLeft="1px"
            borderRight="1px"
            borderBottom={lastItem ? '1px' : 'none'}
            w="full"
            justify="space-between"
            bgColor={`${determineColor(location.region)}.${useColorModeValue(
                '100',
                '700'
            )}`}
            onClick={() => console.log(location)}
        >
            <Icon fontSize="1.5em" as={determineIcon()} />
            <Text fontSize="0.85em" textAlign="left" flexGrow="1">
                {location.name}
            </Text>
            <Text textAlign="right" pl="1">
                {location.coordinates}
            </Text>
        </HStack>
    );
}

export default App;
