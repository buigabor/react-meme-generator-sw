import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
	height: 500px;
	width: 500px;
	object-fit: cover;
`;

export default function GenerateMeme({ memeUrl }) {
	return (
		<>
			<Image
				style={{ visibility: memeUrl ? 'visible' : 'hidden' }}
				src={memeUrl ? memeUrl : ''}
				alt='Custom Meme'
				className='imageOne'
			/>
		</>
	);
}
