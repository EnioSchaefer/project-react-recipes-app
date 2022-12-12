import React from 'react';
import Header from '../components/Header';
import ProfileInfo from '../components/ProfileInfo';

export default function Profile() {
  return (
    <div>
      <Header title="Profile" showSearch={ false } />
      <ProfileInfo />
    </div>
  );
}
