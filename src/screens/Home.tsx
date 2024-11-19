import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { Center, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

type TankProps = {
  heightFuel: number;
  diameter: number;
  length: number;
}

const tankTypes = [
  {label: "254 cm x 600 cm",  value: "600"},
  {label: "254 cm x 201 cm", value: "201"}
]

function calculateTankVolume({heightFuel, diameter, length}: TankProps){
  const ray = diameter / 2;

  // validate fuel height
  if(heightFuel < 0 || heightFuel > 2 * ray) {
    throw new Error("Altura do combustível deve estar entre 0 e o diâmetro do tanque.");
  }

  // calculate the teta in radians
  const theta = 2 * Math.acos((ray - heightFuel) / ray);

  // Calculates the area of ​​the partially filled circular section
  const areaSection = (ray * ray / 2) * (theta - Math.sin(theta));

  // Calculate the volume 
  const volume = areaSection * length;

  return volume * 0.001;
}

function calculateHeightPerVolume(volume: number, diameter: number, height: number): number {
  let estimateHeight = 0;
  let calcVolume = 0;

  // Increments the height of the find the volume correspondent to desired
  for(let h = 0; h <= diameter; h += 0.1) {
    calcVolume = calculateTankVolume({heightFuel: h, diameter, length: height})
    if(calcVolume >= volume) {
      estimateHeight = h;
      break;
    }
  }

  return estimateHeight;
}

export function Home() {
  const [tankType, setTankType] = useState<keyof typeof tanks>('254x600');
  const [actualHeight, setActualHeight] = useState('');
  const [quantitySupplied, setQuantitySupplied] = useState('');
  const [finalHeight, setFinalHeight] = useState(0);
  const [finalQuantity, setFinalQuantity] = useState(0);

  const tanks = {
    '254x600': {diameter: 254, height: 600},
    '254x201': {diameter: 254, height: 201}
  }

  function handleCalculate() {
    if (parseFloat(actualHeight)) {
      handleUpdateActualHeight(''); // limpando a caixa de texto
    }
    const actualHeightCm = parseFloat(actualHeight);
    const quantityL = parseFloat(quantitySupplied)
    const {diameter, height} = tanks[tankType]

    const actualVolume = calculateTankVolume({heightFuel: actualHeightCm, diameter, length: height});
    const finalVolume = actualVolume + quantityL;
    
    const estimatedHeight = calculateHeightPerVolume(finalVolume, diameter, height);

    setFinalQuantity(parseFloat(finalVolume.toFixed(2)))
    setFinalHeight(parseFloat(estimatedHeight.toFixed(2)))
  }

  function handleUpdateActualHeight(value: string) {
    setActualHeight(value.trim());
  }

  function handleUpdateQuantitySupplied(value: string) {
    setQuantitySupplied(value.trim());
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <Center w="$full" mt="$8" px="$4">
        <Heading color="$gray200"> Abastecimento de Tanque </Heading>

        <Select
          placeholder="Selecione o tanque"
          items={tankTypes}
        />

        <VStack w="$full" m="$4"  gap="$2">
          <Input 
            placeholder="Altura inicial em centímetros"
            onChangeText={handleUpdateActualHeight}
          />

          <Input 
            placeholder="Quantidade a ser abastecido em litros"
            onChangeText={handleUpdateQuantitySupplied}
          />
        </VStack>

        <Button title="Calcular" onPress={handleCalculate}/>

        <HStack w="$full" gap="$2" px="$4" mt="$8" >
          <VStack alignItems="center">
            <Text color="$gray100">Altura final estimada</Text>
            <Heading color="$green700">{finalHeight} cm</Heading>
          </VStack>

          <VStack alignItems="center">
            <Text color="$gray100">Qantidade final estimada</Text>
            <Heading color="$green700">{finalQuantity} L</Heading>
          </VStack>
        </HStack>
      </Center>
    </VStack>
  )
}