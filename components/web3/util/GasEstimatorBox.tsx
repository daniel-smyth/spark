import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ContractType } from "@thirdweb-dev/sdk";
import {
  CONTRACT_TYPE_NAME_MAP,
  GasEstimatorMap,
  GasPrice,
} from "../../../constants/mappings";
import { ethers } from "ethers";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface PriceLineProps {
  title: string;
  label: string;
  gasPrice?: number;
}

const PriceLine: React.FC<PriceLineProps> = ({
  title,
  label,
  gasPrice,
  children,
}) => {
  return (
    <>
      {gasPrice ? (
        <Flex justifyContent="space-between">
          <Tooltip label={label}>
            <Flex justifyContent="center" alignItems="center">
              <Text mr={1}>{title}:</Text>
              <Icon as={AiOutlineInfoCircle} boxSize={4} />
            </Flex>
          </Tooltip>
          <Text>{children}</Text>
        </Flex>
      ) : null}
    </>
  );
};

interface GasEstimatorBoxProps extends BoxProps {
  contractType: ContractType;
  ethOrUsd: "eth" | "usd";
  data: { gasPrice: number; ethPrice: number };
}

export const GasEstimatorBox: React.FC<GasEstimatorBoxProps> = ({
  contractType,
  ethOrUsd,
  data,
  ...props
}) => {
  const { deployContract, mint }: GasPrice = GasEstimatorMap[contractType];

  const formatPrice = (price: number | undefined) => {
    if (price && ethOrUsd === "eth") {
      return `~${Number(
        ethers.utils.formatUnits(
          `${((data?.gasPrice as number) || 30) * price}`,
          "gwei"
        )
      ).toFixed(4)} ETH`;
    } else if (price && ethOrUsd === "usd") {
      return `~$${(
        Number(
          ethers.utils.formatUnits(
            `${((data?.gasPrice as number) || 30) * price}`,
            "gwei"
          )
        ) * (data?.ethPrice || 3400)
      ).toFixed(2)}`;
    }
  };

  return (
    <Box p={4} {...props}>
      <Heading size="title.sm" mb={1} mr={1} as={Flex} alignItems="center">
        {CONTRACT_TYPE_NAME_MAP[contractType]}
      </Heading>
      <PriceLine
        title="Contract creation"
        label="The price to deploy this smart contract"
        gasPrice={deployContract}
      >
        {formatPrice(deployContract)}
      </PriceLine>
      <PriceLine
        title="Mint"
        label="The price you pay to mint one NFT"
        gasPrice={mint}
      >
        {formatPrice(mint)}
      </PriceLine>
    </Box>
  );
};
