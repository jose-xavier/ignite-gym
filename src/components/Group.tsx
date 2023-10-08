import { Pressable, Text, IPressableProps } from 'native-base'

type Props = IPressableProps & {
    name: string
    isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
    return (
        <Pressable
            bg="gray.600"
            h={10}
            w={24}
            mr={3}
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            rounded="md"

            isPressed={isActive}
            _pressed={{
                borderWidth: 1,
                borderColor: "green.500"
            }}
            {...rest}
        >

            <Text
                color={isActive === true ? 'green.500' : 'gray.200'}
                textTransform="uppercase"
            >
                {name}
            </Text>
        </Pressable>
    )
}