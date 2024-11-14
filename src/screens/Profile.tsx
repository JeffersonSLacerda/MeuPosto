import {  Center, Heading, Text, VStack } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ padding: 36 }}>
        <Center mt="$6" px="$10"> 
          <UserPhoto 
            source={{ uri: "https://github.com/NetoLogi.png" }} 
            alt="Foto do usuário"
            size="xl"
          />
        

        <TouchableOpacity>
          <Text 
            fontFamily="$heading" 
            color="$green500" 
            fontSize="$md" 
            mt="$2"
            mb="$8"
          >
            Alterar foto
          </Text>
        </TouchableOpacity>

        </Center>

        <Center w="$full" gap="$4"> 
          <Input 
            placeholder="Nome"
            bg="$gray600"
          />
          <Input 
            value="netofool2@gmail.com"
            bg="$gray600"
            isReadOnly
          />

          <Heading 
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$1"
            > 
            ALterar Senha 
          </Heading>

          <Center
            w="$full"
            gap="$4"
          >
            <Input 
              placeholder="Senha antiga"
              bg="$gray600"
              secureTextEntry
            />

            <Input 
              placeholder="Nova senha"
              bg="$gray600"
              secureTextEntry
            />

            <Input 
              placeholder="Confirme a nova senha"
              bg="$gray600"
              secureTextEntry
            />

            <Button title="Atualizar"/>
            
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}