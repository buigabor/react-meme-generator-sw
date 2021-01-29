import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 500px;
	width: 500px;
`;

const Image = styled.img`
	max-width: 100%;
	max-height: 100%;
	object-fit: cover;
`;

const PlaceholderDiv = styled.div`
	height: 500px;
	width: 500px;
	background-color: transparent;
	border: 5px solid rgba(0, 0, 0, 0.75);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const H1 = styled.h1`
	padding: 2.5rem;
	font-size: 2.4em;
`;

export default function GenerateMeme({ memeUrl }) {
	if (!memeUrl) {
		return (
			<PlaceholderDiv>
				<H1>Please select a meme to display it here!</H1>
			</PlaceholderDiv>
		);
	}
	return (
		<>
			<Wrapper>
				<Image
					style={{ visibility: memeUrl ? 'visible' : 'hidden' }}
					src={memeUrl ? memeUrl : ''}
					alt='Custom Meme'
					className='imageOne'
				/>
			</Wrapper>
		</>
	);
}
