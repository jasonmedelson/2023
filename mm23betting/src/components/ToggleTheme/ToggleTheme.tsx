import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import './ToggleTheme.css';

export interface ToggleThemeProps {
  // prop?: string;
}

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()
  const renderButton = () => {
    if (colorMode === 'light') {
      return <SunIcon boxSize={6} />
    } else {
      return <MoonIcon boxSize={6} />
    }
  }
  return <div id="ToggleTheme">
    <div onClick={toggleColorMode}>{renderButton()}</div>
  </div>;
}
