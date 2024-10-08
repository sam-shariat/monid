"use client";
import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
  useColorMode,
  Highlight,
  useColorModeValue,
  Progress,
  IconButton,
  Flex,
  LightMode,
  DarkMode,
  Link,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { Avatar, Links, Socials } from "components/Profile";
import Wallets from "components/Profile/Wallets";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import NextLink from "next/link";
import {
  bgColorAtom,
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
  walletButtonsAtom,
} from "core/atoms";
import { useAtom, useSetAtom } from "jotai";
import {
  LINK_VARIATIONS,
  SOCIALS_VARIATIONS,
  VARIATIONS,
  VARIATIONS_VIDS,
  WALLETS_VARIATIONS,
} from "core/utils/constants";
import { getIconColor, getRandomNumber, sleep } from "core/utils";
import { RiArrowRightCircleFill, RiLinksLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import {
  motion,
  motionValue,
  useAnimation,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useMotionTemplate,
  useTransform,
  useVelocity,
} from "framer-motion";
import TextCard from "components/claiming/TextCard";
import { LinkIcon, LogoIcon } from "components/logos";
import DomainName from "components/features/DomainName";
import AccountAddress from "components/features/AccountAddress";
import { wrap } from "@motionone/utils";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getRandomBytes32 } from "core/utils/stringUtils";

export default function IntroSection() {
  let changeTimer: any;
  let progressTimer: any;
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 580px)");
  const { colorMode } = useColorMode();
  const [buttonBg, setButtonBg] = useAtom(buttonBgColorAtom);
  const [variant, setVariant] = useAtom(variantAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const [font, setFont] = useAtom(fontAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [walletButtons, setWalletButtons] = useState(true);
  const [socialButtons, setSocialButtons] = useState(true);
  const [current, setCurrent] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [timer, setTimer] = useState(0);
  const [top, setTop] = useState(0);
  const [avatar, setAvatar] = useState(VARIATIONS[0].avatar);
  const [avatarShape, setAvatarShape] = useState(VARIATIONS[0].avatarShape);
  const [title, setTitle] = useState(VARIATIONS[0].title);
  const [subtitle, setSubtitle] = useState(VARIATIONS[0].subtitle);
  const [vid, setVid] = useState(VARIATIONS[0].vid);
  const [links, setLinks] = useState(LINK_VARIATIONS[0]);
  const [socials, setSocials] = useState(SOCIALS_VARIATIONS[0]);
  const [wallets, setWallets] = useState(WALLETS_VARIATIONS[0]);
  const [_open, _setOpen] = useAtom(openModalAtom);

  const change = async () => {
    let cur;
    setOpacity(0);
    if (current < VARIATIONS.length - 1) {
      cur = current + 1;
    } else {
      cur = 0;
    }
    await sleep(300);
    setBgColor(VARIATIONS[cur].bg);
    setLightMode(VARIATIONS[cur].lightMode);
    setWalletButtons(VARIATIONS[cur].WalletButtons);
    setSocialButtons(VARIATIONS[cur].socialButtons ?? true);
    setButtonBg(VARIATIONS[cur].buttonBg);
    setVariant(VARIATIONS[cur].variant);
    setRound(VARIATIONS[cur].round);
    setFont(VARIATIONS[cur].font);
    setAvatar(VARIATIONS[cur].avatar);
    setTitle(VARIATIONS[cur].title);
    setSubtitle(VARIATIONS[cur].subtitle);
    setVid(VARIATIONS[cur].vid);
    setAvatarShape(VARIATIONS[cur].avatarShape);
    setLinks(LINK_VARIATIONS[cur]);
    setSocials(SOCIALS_VARIATIONS[cur]);
    setWallets(WALLETS_VARIATIONS[cur]);
    setOpacity(1);
    setCurrent(cur);
  };

  // const changeProgress = () => {
  //   if (timer === 8000) {
  //     change();
  //     setTimer(0);
  //     clearInterval(progressTimer); // clear the interval when timer is 8000
  //   } else {
  //     if (window.scrollY > 700 && window.scrollY < 2000 && !_open) {
  //       setTimer(timer + 80);
  //     }
  //     window.addEventListener('scroll', () => setTop(top + 1));
  //   }
  // };

  // const controls = useAnimation();

  // useEffect(() => {
  //   controls.start("full");
  // }, []);

  useEffect(() => {
    // progressTimer = setInterval(changeProgress, 80); // use setInterval instead of setTimeout
    // return () => {
    //   clearInterval(progressTimer); // clear the interval when the component unmounts
    // };
  }, [timer, top, _open]);

  interface ParallaxProps {
    children: JSX.Element;
    baseVelocity: number;
  }

  function Parallax({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 7], {
      clamp: false,
    });
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((_t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });
    return (
      <div className="parallax">
        <motion.div className="scroller" style={{ x }}>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </motion.div>
      </div>
    );
  }

  const TiltCard = () => {
    return (
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareBorderRadius="16px"
        glarePosition="all"
        scale={1.05}
      >
        <Center
          rounded={"2xl"}
          w={"100%"}
          borderBottomRadius={0}
          px={4}
          py={2}
          gap={4}
          transition={'"all 1s ease"'}
          bgColor={useColorModeValue("light.600", "dark.600")}
        >
          <Button variant={"outline"} gap={2} display={"flex"} rounded={"full"}>
            <LinkIcon type="RiExternalLinkLine" size={20} /> monid.xyz/{vid}
          </Button>
          <HStack gap={2}>
            <Button variant={'ghost'} onClick={change} p={0}>
            <CountdownCircleTimer
              isPlaying
              duration={10}
              size={34}
              strokeWidth={6}
              colors={["#c1aaff", "#946eff", "#7951e9", "#6343bb"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => {
                change();
                return { shouldRepeat: true, delay: 1 };
              }}
            >
              {({ remainingTime }) => <LinkIcon type="RiArrowRightSLine" size={'18px'}/>}
            </CountdownCircleTimer></Button>
            {/* <FaCircle /> */}
          </HStack>
        </Center>
        {/* <Progress
                sx={{
                  '& > div:first-of-type': {
                    transitionProperty: 'width',
                    background: 'linear-gradient(to right, #007bff 10%, #5CABFF 90%)',
                  },
                }}
                size={'xs'}
                min={0}
                max={8000}
                width={'100%'}
                value={timer}
                isAnimated
              /> */}

        <Center
          display="flex"
          gap={2}
          flexDirection="column"
          bg={bgColor}
          width={"100%"}
          rounded={"2xl"}
          borderTopRadius={0}
          height={"620px"}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
          bgPosition={"center"}
          transition={"all .5s ease"}
          p={4}
        >
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: 12,
            }}
            key={`monadid-templates-${title}-${current}-${avatar}`}
            transition={{ duration: 0.5, ease: "linear" }}
            initial={{ y: 20, scale: 0.9, opacity: 0.5, filter: "blur(20px)" }}
            animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{
              y: -20,
              scale: 0.9,
              opacity: 0.5,
              filter: "blur(20px)",
              transition: { ease: "backOut", duration: 0.2 },
            }}
          >
            <Flex
              as={lightMode ? LightMode : DarkMode}
              w={"100%"}
              flexDir={"column"}
            >
              <HStack gap={4}>
                <Box
                  maxW={notMobile ? "160px" : "100px"}
                  className="inner-element-parent"
                >
                  <Avatar
                    className="inner-element"
                    url={avatar}
                    alt={"Monad ID avatar image"}
                    shape={avatarShape}
                    shadow="none"
                  />
                </Box>

                <Stack gap={0}>
                  <Text
                    fontFamily={font}
                    fontWeight="bold"
                    fontSize="2xl"
                    color={getIconColor(lightMode)}
                  >
                    {title}
                  </Text>
                  <Text
                    fontWeight="normal"
                    fontSize="lg"
                    fontFamily={font}
                    color={getIconColor(lightMode)}
                  >
                    {subtitle}
                  </Text>
                  <Text
                    fontFamily={font}
                    fontWeight="bold"
                    fontSize="xl"
                    color={getIconColor(lightMode)}
                  >
                    {vid}
                  </Text>
                </Stack>
              </HStack>
              {socialButtons && (
                <Socials
                  key={`socials-${current}-${colorMode}`}
                  onlyIcons
                  json={{
                    lightMode: lightMode,
                    socials: socials,
                    lineIcons: lightMode,
                  }}
                />
              )}
              {walletButtons && (
                <Wallets
                  key={`wallets-${title}-${current}-${avatar}`}
                  json={{
                    wallets: wallets,
                  }}
                />
              )}
              <Links
                key={`links-${title}-${current}-${avatar}`}
                json={{
                  links: links,
                }}
              />
            </Flex>
          </motion.div>
        </Center>
      </Tilt>
    );
  };

  return (
    <motion.div key={"whatnwhy"}>
      <Container
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        id="what"
        minH="100vh"
      >
        <SimpleGrid columns={[1, 1, 1]} gap={10} py={16}>
          <GridItem>
            <Stack px={[4, 4, 6, 10]} gap={12}>
              <Heading
                as={"h3"}
                fontWeight="bold"
                fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                textAlign={["center", "center", "center"]}
              >
                {t("wat")}
              </Heading>
            </Stack>
          </GridItem>
          <GridItem
            display={"flex"}
            justifyContent={"center"}
            bg={colorMode === "light" ? "whiteAlpha.600" : "whiteAlpha.200"}
            rounded={"2xl"}
            border={"1px solid #77777750"}
          >
            <Flex
              gap={[6, 6, 6]}
              flexDirection={[!small ? "column" : "row"]}
              justify={"center"}
              align={"center"}
              p={6}
            >
              <DomainName
                name={"sam.mon"}
                avatar={
                  "https://ipfs.io/ipfs/QmcPjQqieVvNmKxQmWPkJ7HfJvY2GkrvtGEvzEzAuohMrD/sam.mon.svg"
                }
                size={["md", "lg"]}
                fontSize={['md','lg','xl']}
              />
              <LinkIcon
                type={!small ? "RiArrowUpDownLine" : "RiArrowLeftRightLine"}
                size={!small ? 30 : 64}
              />
              <AccountAddress
                address="0xD2D12 .... 001CE"
                chain="monad"
                size={["md", "lg"]}
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Text
              fontWeight="normal"
              fontSize={["xl", "xl", "2xl", "2xl"]}
              textAlign={["center", "center", "center"]}
            >
              {t("watis")}
            </Text>
          </GridItem>
        </SimpleGrid>
      </Container>
      <Container
        maxW="100%"
        bgColor={colorMode === 'light' ? "blackAlpha.200" : "whiteAlpha.200"}
        px={0}
        id="earlyadopters"
        display="grid"
        placeContent="center"
        gap={12}
        h={"100vh"}
        placeItems="center"
        py={36}
      >
        <Heading textAlign={"center"} px={4}>
          Early Adopters Program
        </Heading>
        <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"} px={4}>
          First 5000 Users who Register .MON are guaranteed to mint a 1:1 NFT on
          Monad Blockchain
        </Text>
        <Flex
          minW={"100%"}
          width={"100%"}
          flexDirection={"column"}
          gap={[8, 12, 16]}
          opacity={0.7}
        >
          <Parallax baseVelocity={-0.25}>
            <Flex gap={[4, 6, 8]}>
              {VARIATIONS_VIDS.map((vid) => (
                <DomainName
                  address={vid.address}
                  name={vid.vid}
                  avatar={vid.avatar}
                  size={["md", "lg", "xl"]}
                  key={`monadid-${vid.vid}`}
                />
              ))}
            </Flex>
          </Parallax>
          {/* <Parallax baseVelocity={+2}>
           
          <Flex gap={[4,6,8]}>
            {VARIATIONS_VIDS.map((vid)=> <DomainName name={vid.vid} avatar={vid.avatar} size={['md','lg','xl']} key={`monadid-${vid.vid}`}/>)}
          </Flex>

          
        </Parallax> */}
        </Flex>
        <NextLink href={"/community"} passHref>
          <Button
            style={{ textDecoration: "none" }}
            py={4}
            w={["xs", "sm", "md"]}
            justifyContent={"center"}
            gap={2}
            color={"white"}
            rounded={"full"}
            colorScheme={colorMode === "light" ? "venom" : "venom"}
            variant={"border"}
            height={["56px", "64px"]}
            size={"lg"}
          >
            <LinkIcon type="RiUserStarLine" />
            <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
              Early Adopter Program
            </Text>
          </Button>
        </NextLink>
      </Container>
      <Container
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
        py={16}
      >
        <Grid
          templateColumns={[
            `repeat(1, 1fr)`,
            `repeat(1, 1fr)`,
            `repeat(1, 1fr)`,
            `repeat(6, 1fr)`,
          ]}
          gap={10}
          my={10}
          alignItems={"center"}
        >
          <GridItem colSpan={[3, 3, 2, 3]}>
            <Stack
              px={[4, 4, 6, 10]}
              gap={12}
            >
              <Heading
                as={"h3"}
                fontWeight="bold"
                fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                textAlign={["center", "center", "center", "left"]}
              >
                {t("wat2")}
              </Heading>
              <Text
                fontWeight="normal"
                fontSize={["xl", "xl", "2xl", "2xl"]}
                textAlign={["center", "center", "center", "left"]}
              >
                {t("watis2")}
              </Text>
              <Stack gap={6}>
                <NextLink href={"litepaper"} passHref>
                  <Button
                    style={{ textDecoration: "none" }}
                    width={"100%"}
                    py={4}
                    justifyContent={"center"}
                    colorScheme={colorMode === "light" ? "light" : "light"}
                    gap={2}
                    rounded={"full"}
                    variant={"border"}
                    height={["56px", "64px"]}
                    size={"lg"}
                  >
                    <LinkIcon
                      type="RiFileList3Line"
                      size={notMobile ? "32" : "24"}
                    />
                    <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
                      Litepaper (Beta)
                    </Text>
                  </Button>
                </NextLink>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem colSpan={3} display={"flex"} justifyContent={"center"}>
            <Flex w={["100%", "100%", "container.sm"]} flexDir={"column"}>
              <TiltCard />
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </motion.div>
  );
}
