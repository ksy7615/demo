import { Input } from '@chakra-ui/input';
import { Heading } from '@chakra-ui/layout';
import { Button, Icon, IconButton, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Box, HStack } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { MdOndemandVideo } from "react-icons/md";
import { AiFillMoon, AiFillSun } from 'react-icons/ai';

const RecommendVideoList = () => {
    // useEffect가 어떻게 동작하는 지 State로 확인
    // useState 는 화면 랜더링에 반영됨 >> 그렇다고 이것만 쓰면 리랜더링의 장점 X
    // 그럴거면 뭐하러 리액트를 쓰냐함
    const [RecommendVideoList, setRecommendVideoList] = useState([]);
    // 디폴트 값을 useState로 설정해주는거임
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('데이식스 영케이');

    // useRef 는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);

    // Chakra UI 에서 제공하는 훅
    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue('red.500', 'white');
    const buttonScheme = useColorModeValue('blackAlpha', 'whiteAlpha');

    const fetchBooks = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?&query=${search}&page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
                },
            }
        );
        const data = await response.json();

        pageCount.current = data.meta.pageable_count % 10 > 0
            ? data.meta.pageable_count / 10 + 1
            : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = 15 ? 15 : pageCount.current;
        console.log(pageCount.current);

        setRecommendVideoList(data.documents);
    }
    // 페이지 바꿈으로 인해 current가 바뀌었고
    // useEffect 써서 그 이후로는 바뀌지가 않고 있다?

    // 연쇄적인 동작을 하며 fetch가 같이 호출
    useEffect(() => {
        fetchBooks();
    }, [page, search])
    // ↑ 변화하고 있는 fetch(page, search)에 대한 종속성 부여


    return (
        <>
            <Box>
                <Heading color={color}>
                    <Icon as={MdOndemandVideo} boxSize={"1.5em"} />추천 동영상
                </Heading>

                {
                    colorMode === "light" ?
                        <IconButton icon={<AiFillMoon />} onClick={toggleColorMode} /> :
                        <IconButton icon={<AiFillSun />} onClick={toggleColorMode} />
                }

            </Box>
            <TableContainer>
                <Table varient={"striped"} colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>썸네일</Th>
                            <Th>Title</Th>
                            <Th>Author</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {RecommendVideoList.map((video, index) => (
                            <>
                                <Tr>
                                    <Td> {(page - 1) * 10 + index + 1} </Td>
                                    <Box>
                                        <a href={video.url}>
                                            <Image
                                                boxSize='100px'
                                                src={video.thumbnail}
                                            />
                                        </a>
                                    </Box>
                                    <Td>
                                        <a href={video.url}>{video.title}</a>
                                    </Td>
                                    <Td>{video.author}</Td>
                                </Tr>
                            </>
                        ))}
                    </Tbody>
                    <Tfoot></Tfoot>
                </Table>
            </TableContainer>
            <HStack>
                {Array.from({ length: pageCount.current }, (_, index) => (
                    <>
                        <Button colorScheme={page === index + 1 ? "cyan" : buttonScheme}
                            onClick={e => { setPage(index + 1) }}>{index + 1}
                        </Button>
                    </>
                ))}
            </HStack>
        </>
    );
};

export default RecommendVideoList;