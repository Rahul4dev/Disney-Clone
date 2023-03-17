/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import styled from 'styled-components';
import ImgSlider from './ImageSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Trending from './Trending';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisney = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    // https://stackoverflow.com/questions/68960910/typeerror-firebase-webpack-imported-module-2-default-collection-is-not-a-fu
    const q = query(collection(db, 'movies'));
    // eslint-disable-next-line no-unused-vars
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // eslint-disable-next-line array-callback-return
      querySnapshot.docs.map((doc) => {
        switch (doc.data().type) {
          case 'recommend':
            // eslint-disable-next-line react-hooks/exhaustive-deps
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case 'new':
            newDisney = [...newDisney, { id: doc.id, ...doc.data() }];
            break;

          case 'original':
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case 'trending':
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisney,
          original: originals,
          trending: trending,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh -250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url('/images/home-background.png') center center cover no-repeat
      fixed;

    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
