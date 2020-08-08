import React from 'react';

const Artist = ({ artist }) => {
  if (!artist) return null;
  const { images, name, followers, genres } = artist;

  return (
    <div>
      <div className='artist-detail'>
        <h3>{name}</h3>
        <p style={{ marginBottom: 5 }}>{followers.total} followers</p>
        <p style={{ zIndex: 1, marginBottom: 0 }}>
          <i>{genres.join(',')}</i>
        </p>
      </div>
      <div className='artist-image'>
        <img
          src={images[0] && images[0].url}
          alt='Artist Profile'
          style={{
            maxWidth: 200,
            height: 200,
            borderRadius: 100,
            objectFit: 'cover',
          }}
        ></img>
      </div>
    </div>
  );
};
export default Artist;
