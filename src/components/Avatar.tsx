import { Image, IImageProps } from 'native-base'

type Props = IImageProps & {
    size: number
}

export function Avatar({ size, ...rest }: Props) {
    return (
        <Image
            h={size}
            w={size}
            rounded="full"
            borderWidth={2}
            borderColor="gray.400"
            alt="Imagem do usuário"
            {...rest}
        />
    )
}