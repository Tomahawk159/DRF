import { Box, Container, Flex, Image, useColorMode } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Logo from '../images/logo.svg';
import { Link } from "react-router-dom";
import React from "react";

export const Header = (props) => {
    const { colorMode } = useColorMode()
    return (
        <Box as="header" py={2} bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}>
            <Container maxW="container.xl">
                <Flex justifyContent="space-between" alignItems="center">
                    <a href='/'>
                        <Image
                            src={Logo}
                            alt="Logo"
                            boxSize="50px"
                            objectFit="cover"
                        /></a>
                    <Link to="/">Users</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/tasks">Tasks</Link>
                    <button onClick={() => obj.logout()}>Logout</button> :
                    {
                        props.isAuthenticated() ?
                            <button onClick={() => props.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>
                    }
                    < div id="username">{props.getUsername()}</div>
                    <ColorModeSwitcher />
                </Flex>
            </Container>
        </Box >
    )

}