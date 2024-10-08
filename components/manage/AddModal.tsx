import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiAddFill, RiAddLine, RiFileCopy2Line } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import {
  addLinkTypeAtom,
  openAddAtom,
  openAddLinkAtom,
  openAddNftAtom,
  openAddSocialAtom,
  openAddWalletAtom,
  socialsArrayAtom,
  useLineIconsAtom,
} from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { LinkIcon } from 'components/logos';
import AddWalletButton from './AddWalletButton';
import AddLinkButton from './AddLinkButton';
import AddSocialButton from './AddSocialButton';

export default function AddModal({ type = 'square' }: { type: 'square' | 'full' }) {
  const { colorMode } = useColorMode();
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [_openAddSocial, _setOpenAddSocial] = useAtom(openAddSocialAtom);
  const [_openAddLink, _setOpenAddLink] = useAtom(openAddLinkAtom);
  const [_openAddNft, _setOpenAddNft] = useAtom(openAddNftAtom);
  const [_openAddWallet, _setOpenAddWallet] = useAtom(openAddWalletAtom);
  const [_type, _setType] = useAtom(addLinkTypeAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openAddAtom);

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {type === 'square' ? (
        <Button
          colorScheme={colorMode === 'light' ? "blackAlpha" : 'gray'}
          bgGradient={
            colorMode === 'light'
              ? 'linear(to-r, var(--darkAlpha), var(--dark2))'
              : 'linear(to-r, var(--whiteAlpha), var(--dark2))'
          }
          gap={2}
          w={'100%'}
          borderRadius={12}
          onClick={onOpen}
          className="add"
          flexDirection={'column'}
          height="72px">
          <RiAddLine size={'28px'} />
          Add
        </Button>
      ) : (
        <Button variant={'border'} rounded={'xl'} gap={2} onClick={onOpen} className="add" w={'100%'} size={'lg'}>
          <RiAddLine size={'28px'} />
          Add To Profile
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>Add New</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              <AddWalletButton />
              <AddLinkButton />
              <AddSocialButton />
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent={'center'} fontSize={'xs'}>
            Updating Regularly
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
