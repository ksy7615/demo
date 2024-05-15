import { HStack, Heading, Icon } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    return (
        <>
            <HStack justifyContent={"center"}>
                <Heading textAlign={"center"} size={"xl"} m={"20px"} color={"red.500"}>
                    <Link to={"/"}>
                        <Icon as={FaSearch} />
                        검색 서비스
                    </Link>
                </Heading>
            </HStack>
            <HStack justifyContent={"center"}>
                <HStack>
                    <Button>
                        <Link to={"/"}>Home</Link>
                    </Button>
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton isActive={isOpen} as={Button}>
                                    Video
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        <Link to={"/video/list"}>추천 영상</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={"/video/search"}>영상 검색</Link>
                                    </MenuItem>
                                </MenuList>
                            </>
                        )}
                    </Menu>
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton isActive={isOpen} as={Button}>
                                    Book
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        <Link to={"/book/list"}>추천 도서</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={"/book/search"}>도서 검색</Link>
                                    </MenuItem>
                                </MenuList>
                            </>
                        )}
                    </Menu>
                </HStack>
            </HStack>
        </>
    );
};

export default Header;