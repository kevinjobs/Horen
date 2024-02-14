import React from 'react';
import styled from 'styled-components';
import {
  closeMainwindow,
  minimizeMainwindow,
  maximizeMainwindow,
} from '../api';

const TITLE = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
`;

const TitleArea = styled.div`
  flex-grow: 1;
`;

const CloseArea = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  user-select: none;
`;

const Minimize = styled.div`
  font-size: 24px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    position: relative;
    bottom: 11px;
  }
  &:hover {
    background-color: #9e9e9e34;
  }
`;

const Maximize = styled.div`
  font-size: 24px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    position: relative;
    bottom: 3px;
  }
  &:hover {
    background-color: #9e9e9e34;
  }
`;
const Close = styled.div`
  font-size: 24px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    position: relative;
    bottom: 2px;
  }
  &:hover {
    background-color: #ec1515;
  }
`;

export type TitleBarProps = {
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
};

export default function TitleBar(props: TitleBarProps) {
  const { title, onClose, onMinimize, onMaximize } = props;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    closeMainwindow().then();
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    }
    minimizeMainwindow().then();
  };

  const handleMaximize = () => {
    if (onMaximize) {
      onMaximize();
    }
    maximizeMainwindow().then();
  };

  return (
    <TITLE className="electron-drag">
      <TitleArea>
        <span>{title}</span>
      </TitleArea>
      <CloseArea className="electron-no-drag">
        <Minimize onClick={handleMinimize}>
          <span>_</span>
        </Minimize>
        <Maximize onClick={handleMaximize}>
          <span>□</span>
        </Maximize>
        <Close onClick={handleClose}>
          <span>×</span>
        </Close>
      </CloseArea>
    </TITLE>
  );
}
