import { Center, Heading } from 'native-base';

type Props = {
    title: string
}

export function ScreensHeader({ title }: Props) {
    return (
        <Center pt={16} pb={6} bg="gray.600">
            <Heading color="gray.100" fontSize="xl" fontFamily="heading">
                {title}
            </Heading>
        </Center>
    )
}