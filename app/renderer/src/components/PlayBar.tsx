import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaVolumeLow } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosPause, IoIosPlay } from 'react-icons/io';
import { MdMenuOpen, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { TfiLoop } from 'react-icons/tfi';
import styled from 'styled-components';

import { HorenContext } from '../App';
import { Slider } from './Slider';

const PLAYBAR = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Cover = styled.div`
  height: 52px;
  width: 52px;
  margin-right: 16px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .arrow {
    color: #d6d6d6;
    cursor: pointer;
  }
`;

const Title = styled.div`
  width: 144px;
  height: 20px;
  font-size: 14px;
  color: #e6e6e6;
  overflow: hidden;
`;

const Singer = styled.div`
  height: 14px;
  margin-top: 2px;
  font-size: 10px;
  color: #bebebe;
`;

const AlbumTitle = styled.div`
  height: 14px;
  margin-top: 2px;
  font-size: 10px;
  color: #adadad;
`;

const Seeker = styled.div`
  width: 100%;
  height: 8px;
  margin-bottom: 5px;
`;

const Mode = styled.div`
  height: 32px;
  width: 32px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Prev = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 8px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pause = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 8px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Next = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 8px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Volume = styled.div`
  height: 32px;
  width: 64px;
  margin-left: 12px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const More = styled.div`
  width: 108px;
  height: 32px;
  padding-right: 12px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: end;
`;

export type PlayBarProps = {
  onExpand?: () => void;
  visible?: boolean;
};

function PlayBar(props: PlayBarProps) {
  const { onExpand, visible = true } = props;
  const { current, playOrPause, seek, duration } = useContext(HorenContext);

  const handleClick = () => {
    if (onExpand) onExpand();
  };

  const handlePlay = () => {
    if (current) playOrPause(current.uid);
  };

  const hanleChangeSeek = (per: number) => {};

  return (
    <PLAYBAR className="play-bar">
      <Cover onClick={handleClick} className="electron-no-drag">
        {visible ? (
          <img src={'horen:///' + current?.cover} alt={current?.title} />
        ) : (
          <span className="arrow">
            <IoIosArrowDown size={28} />
          </span>
        )}
      </Cover>
      {visible && (
        <div>
          <Title>{current?.title}</Title>
          <Singer>{current?.artist}</Singer>
          <AlbumTitle>{current?.album}</AlbumTitle>
        </div>
      )}
      {visible && (
        <div style={{ flexGrow: 1, margin: '0 16px' }}>
          <Seeker>
            <Slider value={seek / duration} onChangeEnd={hanleChangeSeek} />
          </Seeker>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Mode>
              <TfiLoop size={20} />
            </Mode>
            <Prev>
              <MdSkipPrevious size={28} />
            </Prev>
            <Pause onClick={handlePlay}>
              {current?.howl?.playing() ? (
                <IoIosPause size={28} />
              ) : (
                <IoIosPlay size={28} />
              )}
            </Pause>
            <Next>
              <MdSkipNext size={28} />
            </Next>
            <Volume>
              <FaVolumeLow size={19} />
            </Volume>
          </div>
        </div>
      )}
      {visible && (
        <div>
          <More>
            <MdMenuOpen size={28} />
          </More>
        </div>
      )}
    </PLAYBAR>
  );
}

const Final = React.memo(PlayBar);

export default Final;
