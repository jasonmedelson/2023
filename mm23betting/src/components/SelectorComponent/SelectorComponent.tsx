import React, { useState } from 'react';
import { Checkbox, CheckboxGroup, HStack, Stack } from '@chakra-ui/react'
import './SelectorComponent.css';
import { useAtom } from 'jotai';
import { selectedBetsAtom } from '../../atoms/store';

export interface SelectorComponentProps {
  prop?: string;
}

export const SelectorComponent = ({ prop = 'default value' }: SelectorComponentProps) => {

  const [, setSelectedBets] = useAtom(selectedBetsAtom);
  return (
    <div id="SelectorComponent">
      <h1>SelectorComponent</h1>
      <CheckboxGroup colorScheme='green' defaultValue={[]} onChange={setSelectedBets}>
        <HStack width={"100%"} justifyContent={"space-evenly"}>
          <Checkbox value='over'>Over</Checkbox>
          <Checkbox value='under'>Under</Checkbox>
          <Checkbox value='mlFav'>ML Fav</Checkbox>
          <Checkbox value='mlDog'>ML Dog</Checkbox>
          <Checkbox value='spreadFav'>Spread Fav</Checkbox>
          <Checkbox value='spreadDog'>Spread Dog</Checkbox>
        </HStack>
      </CheckboxGroup>
    </div >
  );
}

