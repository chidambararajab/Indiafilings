import React from 'react';
import FastImage from 'react-native-fast-image';

const FImage = props => {
  const {style, source, resizeMode, priority} = props;
  return (
    <FastImage
      style={style}
      source={
        source?.uri
          ? {
              uri: source?.uri,
              priority: priority ? priority : FastImage.priority.normal,
            }
          : source
      }
      resizeMode={
        resizeMode === 'center'
          ? FastImage.resizeMode.center
          : resizeMode === 'stretch'
          ? FastImage.resizeMode.stretch
          : resizeMode === 'cover'
          ? FastImage.resizeMode.cover
          : FastImage.resizeMode.contain
      }
    />
  );
};

export default FImage;
