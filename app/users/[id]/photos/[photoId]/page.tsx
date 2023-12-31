import React from 'react';

interface Props {
  params: {
    id: number;
    photoId: number;
  };
}

const UserPhotoPage = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      UserPhotoPage {id} / Photo {photoId}
    </div>
  );
};

export default UserPhotoPage;
