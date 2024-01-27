import React, { useEffect, useState } from 'react';
import Page, { PageProps } from './_page';
import styled from 'styled-components';
import { Track, readDBStore, readCoverSource, fetchCoverFromApi } from '../api';
import { IoMdRefresh } from 'react-icons/io';

const ALBUM = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  padding-bottom: 88px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;

export type AlbumListPageProps = {} & PageProps;

export type Album = {
  index: string;
  title: string;
  artist: string;
  tracks: Track[];
};

export type OriginAlbum = {
  index: string;
  title: string;
  artist: string;
  tracks: string;
};

export function AlbumListPage({ visible }: AlbumListPageProps) {
  const [albumList, setAlbumList] = useState<Album[]>([]);
  const [trackList, setTrackList] = useState<Track[]>([]);

  useEffect(() => {
    (async () => {
      const tracks = await readDBStore('tracks');
      const albums: OriginAlbum[] = await readDBStore('albums');
      const finals = albums.map((album) => {
        return {
          index: album.index,
          title: album.title,
          artist: album.artist,
          tracks: album.tracks
            .split(',')
            .map((trackIndex) => tracks[Number(trackIndex)]),
        };
      });
      setAlbumList(finals);
    })();
  }, []);

  return (
    <Page visible={visible}>
      <ALBUM>
        {albumList?.map((album) => {
          return (
            <AlbumItem
              key={album.index + album.title}
              albumName={album.title}
              artistName={album.artist}
            />
          );
        })}
      </ALBUM>
    </Page>
  );
}

const Item = styled.li`
  height: 188px;
  margin: 8px;
  list-style: none;
  img {
    width: 100%;
    height: 132px;
    margin-bottom: 4px;
    object-fit: cover;
  }
  .albumName {
    padding: 0 4px;
    font-size: 0.9rem;
    color: #f1f1f1;
    width: 100%;
    height: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .artistName {
    padding: 0 4px;
    margin-top: 4px;
    height: 18px;
    overflow: hidden;
    font-size: 0.8rem;
    font-weight: 300;
    color: #969696;
  }
  .cover {
    position: relative;
    &:hover {
      .refresh {
        visibility: visible;
      }
    }
  }
  .refresh {
    position: absolute;
    left: 4px;
    bottom: 8px;
    color: #8b8b8b;
    visibility: hidden;
  }
`;

export type AlbumItemProps = {
  albumName: string;
  artistName: string;
  onPlay?: (track: Track) => void;
  onAdd?: (track: Track) => void;
  isAdd?: (track: Track) => boolean;
};

function AlbumItem({
  albumName,
  artistName,
  onPlay,
  onAdd,
  isAdd,
}: AlbumItemProps) {
  const [cover, setCover] = useState('');

  const handlePlay = () => {};

  const handleAdd = () => {};

  const handleFresh = async () => {
    if (window.confirm('从网络获取专辑封面?')) {
      await fetchCoverFromApi(albumName, artistName);
      readCoverSource(albumName, artistName).then(setCover);
    }
  };

  useEffect(() => {
    readCoverSource(albumName, artistName).then((source) => {
      setCover(source);
    });
  }, [albumName]);

  return (
    <Item key={albumName}>
      <div className="cover">
        <img src={cover} alt={albumName} />
        <span onClick={handleFresh} className="refresh">
          <IoMdRefresh />
        </span>
      </div>
      <div className="albumName single-line">{albumName}</div>
      <div className="artistName">{artistName}</div>
    </Item>
  );
}
